import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {
  verifyMetaSignature,
  callDeepSeek,
  sendWhatsAppText,
  sendWhatsAppInteractiveDoc,
  triggerAdminAlert,
  stripPII,
  ChatMessage,
  SYSTEM_PROMPT,
} from "./whatsappService";
import { VERIFIED_CLAIMS } from "./claimsSeed";
import {
  WHATSAPP_VERIFY_TOKEN,
  META_APP_SECRET,
  PHONE_NUMBER_ID,
  WHATSAPP_TOKEN,
  ADMIN_PHONE_NUMBER,
  HISTORY_WINDOW_SIZE,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MINUTES,
} from "./config";

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

console.log(
  "[whatsappBot] init:",
  "PHONE_NUMBER_ID:",
  !!PHONE_NUMBER_ID,
  "WHATSAPP_TOKEN:",
  !!WHATSAPP_TOKEN,
  "META_APP_SECRET:",
  !!META_APP_SECRET,
  "ADMIN_PHONE_NUMBER:",
  !!ADMIN_PHONE_NUMBER
);

interface RateLimitData {
  count: number;
  windowStart: admin.firestore.Timestamp;
}

const sanitizeDocId = (id: string): string =>
  id.replace(/[./:#\[\]]/g, "_").substring(0, 1500);

const checkRateLimit = async (
  uid: string | undefined,
  ip: string
): Promise<boolean> => {
  const ref = db.collection("rate_limits").doc(sanitizeDocId(uid || ip));
  const now = admin.firestore.Timestamp.now();
  const doc = await ref.get();

  if (!doc.exists) {
    await ref.set({ count: 1, windowStart: now });
    return true;
  }

  const data = doc.data() as RateLimitData;
  const diffMinutes =
    (now.toDate().getTime() - data.windowStart.toDate().getTime()) / 60000;

  if (diffMinutes > RATE_LIMIT_WINDOW_MINUTES) {
    await ref.set({ count: 1, windowStart: now });
    return true;
  }
  if (data.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  await ref.update({ count: admin.firestore.FieldValue.increment(1) });
  return true;
};

// ─── PHASE 2: Intent Check (in-code verified_claims) ────

interface ClaimDoc {
  keywords?: string[];
  title?: string;
  category?: string;
  response?: string;
  isHighIntent?: boolean;
  docName?: string | null;
}

const findMatchingClaim = (userMessage: string): ClaimDoc | null => {
  const clean = userMessage.toLowerCase().trim();
  console.log("[findMatchingClaim] Input:", clean);

  for (const data of VERIFIED_CLAIMS) {
    const keywords: string[] = data.keywords || [];
    const matched = keywords.some((k) => clean.includes(k.toLowerCase().trim()));
    if (keywords.length > 0 && matched) {
      console.log("[findMatchingClaim] Matched claim:", data.title, "| Keywords:", keywords.join(", "));
      return data;
    }
  }
  console.log("[findMatchingClaim] No claim matched. Falling through to AI.");
  return null;
};

// ─── PHASE 3: Lead Capture + Admin Alert ────────────────
const captureLead = async (
  phone: string,
  name: string | undefined,
  claim: ClaimDoc,
  query: string
): Promise<void> => {
  const intent = claim.category || claim.title || "general_inquiry";

  await db.collection("prospects").add({
    phone,
    name: name || "Client",
    interest: claim.title || query,
    intent,
    query: stripPII(query),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  await triggerAdminAlert({ phone, name, intent, query });
};

// ─── PHASE 4: AI Conversation ───────────────────────────
const runAIConversation = async (
  phone: string,
  userMessage: string
): Promise<string> => {
  const sessionRef = db
    .collection("whatsapp_sessions")
    .doc(phone)
    .collection("messages");

  const historySnap = await sessionRef
    .orderBy("timestamp", "desc")
    .limit(HISTORY_WINDOW_SIZE)
    .get();

  const history = historySnap.docs
    .map((d) => d.data() as { role: string; content: string })
    .reverse();

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((h) => ({
      role: h.role === "bot" ? "assistant" : "user",
      content: h.content,
    })),
    { role: "user", content: userMessage },
  ];

  const replyText = (await callDeepSeek(messages)).replace(/\*/g, "").trim();

  const ts = admin.firestore.FieldValue.serverTimestamp();
  await sessionRef.add({ role: "user", content: userMessage, timestamp: ts });
  await sessionRef.add({ role: "bot", content: replyText, timestamp: ts });

  return replyText;
};

// ─── CORE ENGINE: whatsappWebhook ───────────────────────
/**
 * Single Firebase endpoint handling both Meta operations:
 * GET  → webhook verification handshake.
 * POST → inbound message processing (5-phase pipeline).
 */
export const whatsappWebhook = onRequest(
  { region: "us-central1", cors: true, maxInstances: 10, rawBody: true } as any,
  async (request, response) => {
    const ip = request.ip || "unknown";

    // PHASE 1: Handshake (GET)
    if (request.method === "GET") {
      const mode = request.query["hub.mode"];
      const token = request.query["hub.verify_token"];
      const challenge = request.query["hub.challenge"];
      if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
        console.log("LLSA WhatsApp webhook verified by Meta.");
        response.status(200).send(challenge);
        return;
      }
      console.warn("Webhook verification failed for IP:", ip);
      response.status(403).end();
      return;
    }

    if (request.method !== "POST") {
      response.status(405).end();
      return;
    }

    // Rate limit gate
    if (!(await checkRateLimit(undefined, ip))) {
      response.status(429).end();
      return;
    }

    // PHASE 1 (cont.): Signature verification (POST)
    const signature = request.get("X-Hub-Signature-256");
    const rawBody = (request as any).rawBody?.toString?.("utf8") || "";

    if (!signature) {
      console.warn("[whatsappWebhook] No X-Hub-Signature-256 header. Rejecting.");
      response.status(403).end();
      return;
    }
    if (!META_APP_SECRET) {
      console.error("[whatsappWebhook] META_APP_SECRET is not configured.");
      response.status(500).end();
      return;
    }
    if (!verifyMetaSignature(rawBody, signature, META_APP_SECRET)) {
      console.warn("[whatsappWebhook] Signature mismatch. Rejecting request.");
      response.status(403).end();
      return;
    }

    console.log("[whatsappWebhook] POST received from:", ip);
    const value = request.body.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    const contact = value?.contacts?.[0];

    if (!message || message.type !== "text") {
      console.log("[whatsappWebhook] No text message payload. Responding 200.");
      response.status(200).end();
      return;
    }

    const fromNumber = message.from as string;
    const userMessage = (message.text?.body || "").trim();
    const senderName = contact?.profile?.name;
    console.log("[whatsappWebhook] Text message from:", fromNumber, "=>", userMessage);

    if (!userMessage) {
      response.status(200).end();
      return;
    }

    try {
      // PHASE 2: Intent check
      const matchedClaim = findMatchingClaim(userMessage);
      let reply = "";

      if (matchedClaim) {
        // PHASE 3: lead capture for high-intent intents
        if (
          matchedClaim.isHighIntent ||
          matchedClaim.category === "price" ||
          matchedClaim.category === "sales"
        ) {
          await captureLead(fromNumber, senderName, matchedClaim, userMessage);
        }

        // Interactive document delivery
        if (matchedClaim.category === "guide" && matchedClaim.docName) {
          await sendWhatsAppInteractiveDoc(
            fromNumber,
            matchedClaim.title || "Resource",
            matchedClaim.response || "Access your requested resource below.",
            matchedClaim.docName
          );
          response.status(200).end();
          return;
        }

        reply = matchedClaim.response || "";
        console.log("[whatsappBot] Claim response (first 100 chars):", reply.substring(0, 100));
      } else {
        // PHASE 4: AI conversation
        reply = await runAIConversation(fromNumber, userMessage);
      }

      // PHASE 5: response transmission
      await sendWhatsAppText(fromNumber, reply);
      response.status(200).end();
    } catch (error) {
      console.error("WhatsApp webhook processing error:", error);
      try {
        await sendWhatsAppText(
          fromNumber,
          "This automated support is briefly unavailable. Please try again or email info@ludoleague.co.za."
        );
      } catch (sendErr) {
        console.error("Failed fallback message:", sendErr);
      }
      response.status(200).end();
    }
  }
);

export { checkRateLimit, sanitizeDocId };