import * as functions from 'firebase-functions';
import { onCall, onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express, { Request, Response } from 'express';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

// -------------------------------------------------------------
// WHATSAPP BOT ENGINE DATABASE CONTROLLER
// -------------------------------------------------------------
const botDb = {
  findKeywordMatch: async (text: string) => {
    const clean = text.toLowerCase().trim();
    if (clean.includes("tournaments") || clean.includes("register") || clean.includes("compete") || clean.includes("entry") || clean.includes("fee")) {
      return { 
        category: "tournaments", 
        answer: "Register for Ludo League SA tournaments on our dedicated page: https://ludoleague.co.za/#tournaments. Entry fee is R200 per player. Standard physical clocks are strictly enforced." 
      };
    }
    if (clean.includes("leagues") || clean.includes("mamelodi") || clean.includes("soweto") || clean.includes("alexandra") || clean.includes("circuits")) {
      return { 
        category: "leagues", 
        answer: "Explore our active township leagues and circuits here: https://ludoleague.co.za/#leagues. Matches are hosted weekly across Mamelodi, Soweto, and Alexandra." 
      };
    }
    if (clean.includes("donate") || clean.includes("fund") || clean.includes("community") || clean.includes("support")) {
      return { 
        category: "donate", 
        answer: "Help us fund screen-free school modules and township manufacturing! Support our Community Fund here: https://ludoleague.co.za/?page=donate." 
      };
    }
    if (clean.includes("schools") || clean.includes("ludo4schools") || clean.includes("classroom") || clean.includes("education")) {
      return { 
        category: "ludo4schools", 
        answer: "Our Ludo4Schools curriculum introduces math and cognitive logic to classrooms. Learn more or onboard your school: https://ludoleague.co.za/?page=ludo4schools." 
      };
    }
    if (clean.includes("portal") || clean.includes("sign in") || clean.includes("login") || clean.includes("auth") || clean.includes("player")) {
      return { 
        category: "portal", 
        answer: "Log into your secure Player Portal here to check matches, ratings, and past entries: https://ludoleague.co.za/?page=portal." 
      };
    }
    if (clean.includes("rules") || clean.includes("blockade") || clean.includes("sixes") || clean.includes("safe zone") || clean.includes("faqs") || clean.includes("disputes")) {
      return { 
        category: "faqs", 
        answer: "Review our standard FAQ repository, board geometry safe-zones, blockade rules, and on-ground dispute frameworks: https://ludoleague.co.za/?page=faqs." 
      };
    }
    if (clean.includes("contact") || clean.includes("reach out") || clean.includes("email")) {
      return { 
        category: "contact", 
        answer: "Get in touch with our administrative committee here: https://ludoleague.co.za/#contact. You can email us at info@ludoleague.co.za." 
      };
    }
    if (clean.includes("news") || clean.includes("updates") || clean.includes("affairs") || clean.includes("ticker")) {
      return { 
        category: "newsupdates", 
        answer: "Stay updated with real-time match reports and league updates on our News & Affairs hub: https://ludoleague.co.za/?page=newsupdates." 
      };
    }
    return null;
  },
  saveLead: async (phone: string, intent: string, message: string) => {
    await db.collection("leads").add({
      phone,
      intent,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
  },
  getChatHistory: async (phone: string) => {
    const docRef = db.collection("whatsapp_history").doc(phone);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      return snapshot.data()?.messages || [];
    }
    return [];
  },
  saveChatHistory: async (phone: string, messages: any[]) => {
    await db.collection("whatsapp_history").doc(phone).set({
      messages: messages.slice(-10) // Cache last 10 turns to protect context bounds
    });
  }
};

// -------------------------------------------------------------
// WHATSAPP OUTBOUND TRANSMISSION SERVICE
// -------------------------------------------------------------
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "";
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER || "";
const META_GRAPH_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;
const AUTH_HEADER = { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } };

const sendWhatsAppText = async (to: string, text: string) => {
  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text }
  };
  return axios.post(META_GRAPH_URL, payload, AUTH_HEADER);
};

const triggerAdminAlert = async (lead: { phone: string; intent: string; query: string }) => {
  const alertBody = `🚨 *NEW LLSA LEAD CAPTURED* 🚨\n\n` +
    `*Phone Number:* ${lead.phone}\n` +
    `*Intent Category:* ${lead.intent.toUpperCase()}\n` +
    `*Original Message:* "${lead.query}"\n\n` +
    `*Action Required:* Contact the prospect immediately via standard protocol.`;
  return sendWhatsAppText(ADMIN_PHONE_NUMBER, alertBody);
};

// -------------------------------------------------------------
// BOT CORE WEBHOOK EXPRESS ROUTER
// -------------------------------------------------------------
const botApp = express();
botApp.use(express.json());

// 1. Webhook Handshake Verification (GET)
botApp.get("/webhook", (req: Request, res: Response) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "LUDO_LEAGUE_SECURE_TOKEN_2026";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Meta Webhook Handshake verified securely.");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Verification Token Mismatch.");
  }
});

// 2. Inbound Message Processing Core (POST)
botApp.post("/webhook", async (req: Request, res: Response) => {
  try {
    const { body } = req;
    if (body.object !== "whatsapp_business_account") {
      res.status(404).send();
      return;
    }

    const value = body.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    if (message && message.type === "text") {
      const userRawText = message.text.body;
      const cleanInput = userRawText.toLowerCase().trim();
      const senderPhone = message.from;
      let responseText = "";

      // Route A: Database Guided Keyword Matching
      const localKnowledgeMatch = await botDb.findKeywordMatch(cleanInput);
      if (localKnowledgeMatch) {
        responseText = localKnowledgeMatch.answer;
        // If high intent matches occur, save as lead and alert management
        if (localKnowledgeMatch.category === "tournaments" || localKnowledgeMatch.category === "donate") {
          await botDb.saveLead(senderPhone, localKnowledgeMatch.category, userRawText);
          await triggerAdminAlert({ phone: senderPhone, intent: localKnowledgeMatch.category, query: userRawText });
        }
      } 
      // Route B: Conversational LLM Fallback Execution
      else {
        const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
        if (DEEPSEEK_API_KEY) {
          try {
            const contextHistory = await botDb.getChatHistory(senderPhone);
            const SYSTEM_PROMPT = `You are the Official WhatsApp Assistant for The Ludo League South Africa (LLSA). 
You must answer questions strictly based on the LLSA platform metrics, navbar indexes, active FAQs, and core advantages.

RESOURCES & DIRECT WEB NAVIGATION INDEX:
- Home Base: https://ludoleague.co.za/#home
- Tournaments Circuit: https://ludoleague.co.za/#tournaments (R200 entry fee, standard clocks)
- Township Leagues: https://ludoleague.co.za/#leagues (Weekly circuits in Soweto, Mamelodi, Alexandra)
- Hall of Fame (History): https://ludoleague.co.za/#history (AFCON champions, Kea Mdawe, Thabo Nkosi)
- Action Gallery: https://ludoleague.co.za/#gallery (Match visuals)
- Ludo 4 Schools: https://ludoleague.co.za/?page=ludo4schools (Math summation, classroom logic clinics)
- Identity & Vision (About): https://ludoleague.co.za/#about (Pretoria headquarters, team coordinates)
- Player Portal: https://ludoleague.co.za/?page=portal (Login to track matches and verification metrics)
- Get In Touch (Contact): https://ludoleague.co.za/#contact (info@ludoleague.co.za)
- News & Affairs: https://ludoleague.co.za/?page=newsupdates (Bento-grid match report, ticker states)
- FAQ Repository: https://ludoleague.co.za/?page=faqs (Blockade rules, safe zones, rolling consecutive sixes)

CROWDFUNDING 2026 & DONATIONS PORTAL (https://ludoleague.co.za/?page=donate):
- Goal: R1,000,000 for National Expansion, Recruitment, League Production, and Ludo4Schools.
- Minimum Contribution: R20.00
- Support Tiers: R50 (Profile Badge), R200 (Exclusive Avatar), R500+ (Complimentary Ludo League Gift).
- Payment Methods: Payfast Online (Visa, Mastercard, Maestro, Instant EFT, Capitec Pay, SnapScan, Zapper) or Manual EFT (Nedbank Account: 1120230365).
- Corporate Investment: Companies can request a callback for Franchise ownership (RTP modeling) or corporate CSI sponsorships.

Do NOT use markdown bold text, asterisks, or hash symbols. Always keep answers brief, professional, helpful, and under 3 sentences. Provide the exact page link (https://ludoleague.co.za/...) for more details where relevant.`;

            const promptContext = [
              { role: "system", content: SYSTEM_PROMPT },
              ...contextHistory.map((h: any) => ({ role: h.role === "bot" ? "assistant" : "user", content: h.text })),
              { role: "user", content: userRawText }
            ];

            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
              },
              body: JSON.stringify({
                model: 'deepseek-chat',
                messages: promptContext
              })
            });

            const resData: any = await response.json();
            const aiResponse = resData.choices?.[0]?.message?.content || "Connection timed out. Please try again.";
            responseText = aiResponse.replace(/\*/g, "").trim();

            const updatedHistory = [...contextHistory, { role: "user", text: userRawText }, { role: "bot", text: responseText }];
            await botDb.saveChatHistory(senderPhone, updatedHistory);
          } catch (aiErr) {
            console.error("AI Generation Failure:", aiErr);
            responseText = "The automated support platform is undergoing routine maintenance. Please try again shortly.";
          }
        } else {
          responseText = "System connection offline. Please reach out to us directly through our official website: https://ludoleague.co.za.";
        }
      }

      await sendWhatsAppText(senderPhone, responseText);
    }

    res.status(200).send("EVENT_RECEIVED");
  } catch (error) {
    console.error("Webhook processing crash event:", error);
    res.status(200).send("EVENT_RECEIVED"); // Standard practice to prevent Meta retries
  }
});

export const whatsappWebhook = onRequest({ region: 'us-central1', cors: true, maxInstances: 10 }, botApp);

// -------------------------------------------------------------
// ORIGINAL PROFILE TRIGGERS & AI COMPATIBILITY HANDLERS
// -------------------------------------------------------------
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    await admin.firestore().collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'New Player',
      role: 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
});

export const ludoLeagueChatBot = onCall({ region: 'us-central1', maxInstances: 10 }, async (request) => {
  const { message, history } = request.data;
  const SYSTEM_PROMPT = `You are the official smart digital assistant for The Ludo League South Africa (LLSA).
You must base all responses on our Key Advantages:
1. SCREEN-FREE CLASSROOM LEARNING: Through Ludo4Schools, we combat screen addiction by inserting physical strategy play into classrooms to sharpen logical geometry and math skills.
2. 100% LOCAL TOWNSHIP MANUFACTURING: We create direct circular township cash-flow by manufacturing all MDF wood boards and acrylic game components inside local carpentry and tailoring workshops.
3. STANDARDIZED TOURNAMENT FAIRNESS: We transition away from casual backyard rules using certified referees and strict rulesets.
4. SPONSORSHIPS AND GRANTS: Backed by nominal parents subscriptions and corporate CSI grants.

RESOURCES & DIRECT WEB NAVIGATION INDEX:
- Home Base: https://ludoleague.co.za/#home
- Tournaments Circuit: https://ludoleague.co.za/#tournaments (R200 entry fee, standard clocks)
- Township Leagues: https://ludoleague.co.za/#leagues (Weekly circuits in Soweto, Mamelodi, Alexandra)
- Hall of Fame (History): https://ludoleague.co.za/#history (AFCON champions, Kea Mdawe, Thabo Nkosi)
- Action Gallery: https://ludoleague.co.za/#gallery (Match visuals)
- Ludo 4 Schools: https://ludoleague.co.za/?page=ludo4schools (Math summation, classroom logic clinics)
- Identity & Vision (About): https://ludoleague.co.za/#about (Pretoria headquarters, team coordinates)
- Player Portal: https://ludoleague.co.za/?page=portal (Login to track matches and verification metrics)
- Get In Touch (Contact): https://ludoleague.co.za/#contact (info@ludoleague.co.za)
- News & Affairs: https://ludoleague.co.za/?page=newsupdates (Bento-grid match report, ticker states)
- FAQ Repository: https://ludoleague.co.za/?page=faqs (Blockade rules, safe zones, rolling consecutive sixes)

CROWDFUNDING 2026 & DONATIONS PORTAL (https://ludoleague.co.za/?page=donate):
- Goal: R1,000,000 for National Expansion, Recruitment, League Production, and Ludo4Schools.
- Minimum Contribution: R20.00
- Support Tiers: R50 (Profile Badge), R200 (Exclusive Avatar), R500+ (Complimentary Ludo League Gift).
- Payment Methods: Payfast Online (Visa, Mastercard, Maestro, Instant EFT, Capitec Pay, SnapScan, Zapper) or Manual EFT (Nedbank Account: 1120230365).
- Corporate Investment: Companies can request a callback for Franchise ownership (RTP modeling) or corporate CSI sponsorships.

Be highly professional, direct, and concise (keep answers to 2-3 sentences max). Never use markdown markers like asterisks or hash symbols.`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: message }
        ]
      })
    });

    const resData: any = await response.json();
    const reply = resData.choices?.[0]?.message?.content || 'Connection timed out. Please try again.';
    return { reply };
  } catch (error) {
    console.error('DeepSeek AI Error:', error);
    return { reply: 'I encountered an issue connecting to the servers. Please try again shortly.' };
  }
});
