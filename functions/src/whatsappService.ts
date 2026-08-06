import * as crypto from "crypto";
import {
  WHATSAPP_TOKEN,
  PHONE_NUMBER_ID,
  META_GRAPH_URL,
  DEEPSEEK_API_KEY,
  DEEPSEEK_BASE_URL,
  DEEPSEEK_MODEL,
  LLM_MAX_TOKENS,
  LLM_TEMPERATURE,
  DOCUMENT_BASE_URL,
  BRAND_DOMAIN,
  ADMIN_PHONE_NUMBER,
} from "./config";
import { SYSTEM_PROMPT } from "./prompt";

export interface ChatMessage {
  role: string;
  content: string;
}

export interface VerifiedClaim {
  keywords?: string[];
  title?: string;
  category?: "price" | "sales" | "guide" | "info";
  response?: string;
  isHighIntent?: boolean;
  docName?: string | null;
}

export interface LeadDetails {
  phone: string;
  name?: string;
  intent: string;
  query: string;
}

// ─── SECURITY UTILITIES ─────────────────────────────────

const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

export const isValidPhone = (toNumber: string): boolean => {
  return PHONE_REGEX.test(toNumber);
};

/**
 * Strips PII before sending any text to an AI provider.
 */
export const stripPII = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]")
    .replace(/(\+27|0)[6-8][0-9]{8}/g, "[PHONE]")
    .replace(/\b\d{13}\b/g, "[ID_NUMBER]")
    .replace(/\b\d{10,11}\b/g, "[TAX_NUMBER]");
};

/**
 * Verifies Meta's X-Hub-Signature-256 header using the App Secret.
 */
export const verifyMetaSignature = (
  body: string,
  signature: string | undefined,
  appSecret: string
): boolean => {
  if (!signature || !appSecret) {
    console.warn(
      "[verifyMetaSignature] Missing signature or app secret. signature:",
      !!signature,
      "appSecret:",
      !!appSecret
    );
    return false;
  }
  const expected = crypto
    .createHmac("sha256", appSecret)
    .update(body, "utf8")
    .digest("hex");
  try {
    const sig = signature.replace("sha256=", "");
    const ok = crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(expected)
    );
    if (!ok) console.warn("[verifyMetaSignature] HMAC mismatch.");
    return ok;
  } catch (err) {
    console.warn("[verifyMetaSignature] Signature compare error:", err);
    return false;
  }
};

// ─── AI ENGINE ──────────────────────────────────────────

/**
 * Calls the DeepSeek API with a sanitized prompt context.
 */
export const callDeepSeek = async (messages: ChatMessage[]): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return "System offline. Reach us at info@ludoleague.co.za";
  }

  const sanitizedMessages = messages.map((m) => ({
    role: m.role,
    content: stripPII(m.content || ""),
  }));

  try {
    const response = await fetch(DEEPSEEK_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: sanitizedMessages,
        temperature: LLM_TEMPERATURE,
        max_tokens: LLM_MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      console.error("DeepSeek API error:", response.status);
      return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return data?.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("DeepSeek request error:", err);
    return "PROTOCOL INTERRUPTED: DeepSeek connection failed.";
  }
};

// ─── META GRAPH API TRANSMISSION LAYER ─────────────────

const authHeader = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${WHATSAPP_TOKEN}`,
  },
};

/**
 * Sends a standard text message to a WhatsApp number.
 */
export const sendWhatsAppText = async (
  to: string,
  text: string
): Promise<any> => {
  if (!isValidPhone(to)) {
    console.warn("Invalid phone number format, message not sent:", to);
    return;
  }
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error("Meta credentials missing. Cannot send message.");
    return;
  }

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { preview_url: false, body: text },
  };

  try {
    const res = await fetch(META_GRAPH_URL, {
      method: "POST",
      ...authHeader,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    console.log(
      "[WhatsApp] sendWhatsAppText response:",
      res.status,
      JSON.stringify(data)
    );

    if (!res.ok) {
      console.error(
        "[WhatsApp] Meta API error sending text:",
        res.status,
        JSON.stringify(data)
      );
    }

    return res;
  } catch (err) {
    console.error("Failed to send WhatsApp text:", err);
  }
};

/**
 * Sends an interactive CTA card that opens a secured document link
 * (e.g. tournament rules PDF) inside WhatsApp.
 */
export const sendWhatsAppInteractiveDoc = async (
  to: string,
  title: string,
  bodyText: string,
  fileName: string
): Promise<any> => {
  if (!isValidPhone(to)) {
    console.warn("Invalid phone number format, message not sent:", to);
    return;
  }
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error("Meta credentials missing. Cannot send message.");
    return;
  }

  const targetUrl = `${DOCUMENT_BASE_URL}/${fileName}`;
  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "interactive",
    interactive: {
      type: "cta_url",
      header: { type: "text", text: title },
      body: { text: bodyText },
      footer: { text: BRAND_DOMAIN.replace("https://", "") },
      action: {
        name: "cta_url",
        parameters: { display_text: "Access Document", url: targetUrl },
      },
    },
  };

  try {
    const res = await fetch(META_GRAPH_URL, {
      method: "POST",
      ...authHeader,
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);
    console.log(
      "[WhatsApp] sendWhatsAppInteractiveDoc response:",
      res.status,
      JSON.stringify(data)
    );

    if (!res.ok) {
      console.error(
        "[WhatsApp] Meta API error sending interactive doc:",
        res.status,
        JSON.stringify(data)
      );
    }

    return res;
  } catch (err) {
    console.error("Failed to send WhatsApp interactive doc:", err);
  }
};

/**
 * Dispatches a high-priority lead notification to the admin number.
 */
export const triggerAdminAlert = async (
  leadDetails: LeadDetails
): Promise<any> => {
  if (!ADMIN_PHONE_NUMBER) {
    console.warn("ADMIN_PHONE_NUMBER not configured. Alert not sent.");
    return;
  }

  const alertBody =
    `ALERT: New LLSA Lead Captured\n\n` +
    `Phone: ${leadDetails.phone}\n` +
    `${leadDetails.name ? `Name: ${leadDetails.name}\n` : ""}` +
    `Intent: ${leadDetails.intent.toUpperCase()}\n` +
    `Query: "${leadDetails.query}"\n\n` +
    `Action: Contact the prospect immediately.`;

  return sendWhatsAppText(ADMIN_PHONE_NUMBER, alertBody);
};

export { SYSTEM_PROMPT };
