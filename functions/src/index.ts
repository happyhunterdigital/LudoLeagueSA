import * as functions from 'firebase-functions';
import { onCall, onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

const SYSTEM_PROMPT = `You are the Official Smart Assistant for The Ludo League South Africa (LLSA).
KEY ADVANTAGES:
1. SCREEN-FREE CLASSROOM LEARNING: Through Ludo4Schools, we combat screen addiction by inserting physical strategy play into classrooms to sharpen math skills.
2. 100% LOCAL TOWNSHIP MANUFACTURING: We create circular township cash-flow by manufacturing all MDF wood boards and acrylic game components inside local carpentry workshops.
3. STANDARDIZED TOURNAMENT FAIRNESS: Standard mechanical clocks, certified referees, no backyard exceptions (e.g. rolling three sixes invalidates the turn).
4. SPONSORSHIPS AND GRANTS: Sustained by subscriptions and corporate CSI grants.

NAVIGATION INDEX:
- Tournaments: https://ludoleague.co.za/#tournaments (R200 entry, standard clocks)
- Township Leagues: https://ludoleague.co.za/#leagues (Soweto, Mamelodi, Alexandra)
- Ludo 4 Schools: https://ludoleague.co.za/?page=ludo4schools
- Portal: https://ludoleague.co.za/?page=portal
- Donations & Crowdfunding: https://ludoleague.co.za/?page=donate (Nedbank: 1120230365, Min R20)
- FAQs: https://ludoleague.co.za/?page=faqs

Keep answers under 3 sentences, professional, and concise. Never use markdown asterisks or hashes.`;

const botDb = {
  findKeywordMatch: async (text: string) => {
    const clean = text.toLowerCase().trim();
    if (clean.includes("tournaments") || clean.includes("register") || clean.includes("entry") || clean.includes("fee")) {
      return { category: "tournaments", answer: "Register for Ludo League SA tournaments here: https://ludoleague.co.za/#tournaments. Entry fee is R200. Standard physical clocks are strictly enforced." };
    }
    if (clean.includes("donate") || clean.includes("fund") || clean.includes("crowd") || clean.includes("support")) {
      return { category: "donate", answer: "Help us fund screen-free school modules and township manufacturing! Support our Crowd Funding here: https://ludoleague.co.za/?page=donate." };
    }
    if (clean.includes("schools") || clean.includes("ludo4schools") || clean.includes("classroom")) {
      return { category: "ludo4schools", answer: "Our Ludo4Schools curriculum introduces mathematics and logic to classrooms. Learn more: https://ludoleague.co.za/?page=ludo4schools." };
    }
    return null;
  },
  saveLead: async (phone: string, intent: string, message: string) => {
    await db.collection("leads").add({ phone, intent, message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
  },
  getChatHistory: async (phone: string) => {
    const snapshot = await db.collection("whatsapp_history").doc(phone).get();
    return snapshot.exists ? snapshot.data()?.messages || [] : [];
  },
  saveChatHistory: async (phone: string, messages: any[]) => {
    await db.collection("whatsapp_history").doc(phone).set({ messages: messages.slice(-10) });
  }
};

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "";
const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER || "";
const META_GRAPH_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;
const AUTH_HEADER = { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } };

const sendWhatsAppText = async (to: string, text: string) => {
  return axios.post(META_GRAPH_URL, { messaging_product: "whatsapp", to, type: "text", text: { body: text } }, AUTH_HEADER);
};

const triggerAdminAlert = async (lead: { phone: string; intent: string; query: string }) => {
  const alertBody = `🚨 *NEW LLSA LEAD CAPTURED* 🚨\n\n*Phone:* ${lead.phone}\n*Category:* ${lead.intent.toUpperCase()}\n*Message:* "${lead.query}"`;
  return sendWhatsAppText(ADMIN_PHONE_NUMBER, alertBody);
};

const botApp = express();
botApp.use(express.json());

botApp.get("/webhook", (req: Request, res: Response) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || "LUDO_LEAGUE_SECURE_TOKEN_2026";
  if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === VERIFY_TOKEN) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    res.status(403).send("Verification Token Mismatch.");
  }
});

botApp.post("/webhook", async (req: Request, res: Response) => {
  try {
    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];
    if (message && message.type === "text") {
      const userRawText = message.text.body;
      const cleanInput = userRawText.toLowerCase().trim();
      const senderPhone = message.from;
      let responseText = "";

      const localKnowledgeMatch = await botDb.findKeywordMatch(cleanInput);
      if (localKnowledgeMatch) {
        responseText = localKnowledgeMatch.answer;
        if (localKnowledgeMatch.category === "tournaments" || localKnowledgeMatch.category === "donate") {
          await botDb.saveLead(senderPhone, localKnowledgeMatch.category, userRawText);
          await triggerAdminAlert({ phone: senderPhone, intent: localKnowledgeMatch.category, query: userRawText });
        }
      } else {
        const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
        if (DEEPSEEK_API_KEY) {
          try {
            const contextHistory = await botDb.getChatHistory(senderPhone);
            const promptContext = [
              { role: "system", content: SYSTEM_PROMPT },
              ...contextHistory.map((h: any) => ({ role: h.role === "bot" ? "assistant" : "user", content: h.text })),
              { role: "user", content: userRawText }
            ];
            const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_API_KEY}` },
              body: JSON.stringify({ model: 'deepseek-chat', messages: promptContext })
            });
            const resData: any = await response.json();
            responseText = (resData.choices?.[0]?.message?.content || "Please try again.").replace(/\*/g, "").trim();
            await botDb.saveChatHistory(senderPhone, [...contextHistory, { role: "user", text: userRawText }, { role: "bot", text: responseText }]);
          } catch {
            responseText = "Automated support is undergoing maintenance. Please try again shortly.";
          }
        } else {
          responseText = "System offline. Reach us at: info@ludoleague.co.za";
        }
      }
      await sendWhatsAppText(senderPhone, responseText);
    }
    res.status(200).send("EVENT_RECEIVED");
  } catch (error) {
    res.status(200).send("EVENT_RECEIVED");
  }
});

export const whatsappWebhook = onRequest({ region: 'us-central1', cors: true, maxInstances: 10 }, botApp);

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection('users').doc(user.uid).set({
    uid: user.uid, email: user.email, displayName: user.displayName || 'New Player', role: 'user', createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
});

export const ludoLeagueChatBot = onCall({ region: 'us-central1', maxInstances: 10 }, async (request) => {
  try {
    const { message, history } = request.data;
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || ''}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: message }] })
    });
    const resData: any = await response.json();
    return { reply: resData.choices?.[0]?.message?.content || 'Please try again.' };
  } catch {
    return { reply: 'Issue connecting to servers. Please try again shortly.' };
  }
});

// Automated Email Triggers using Trigger Email Collection Pattern

export const sendPlayerRegistrationEmail = functions.firestore
  .document('registrations/{registrationId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    if (!data?.email) return;
    await db.collection('mail').add({
      to: data.email,
      message: {
        subject: 'Player Registration Verified',
        html: `<p>Hello ${data.fullName || 'Player'},</p><p>We have successfully verified your registration to join the Ludo League SA circuit in the ${data.region} region. Standard clock procedures will be provided on-ground.</p>`
      }
    });
  });

export const sendEventRegistrationEmail = functions.firestore
  .document('event_registrations/{registrationId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    if (!data) return;

    // Detect type based on type field or eventName keyword matching
    let type = data.type;
    if (!type) {
      const eventName = data.eventName || '';
      if (eventName.includes('Donation') || eventName.includes('Crowdfunding') || eventName.includes('Narrative')) {
        type = 'donation';
      } else if (eventName.includes('Sponsor') || eventName.includes('Partnership')) {
        type = 'sponsorship';
      } else if (eventName.includes('Callback') || eventName.includes('Investment')) {
        type = 'investment';
      } else if (eventName.includes('Purchase') || eventName.includes('Shop')) {
        type = 'purchase';
      } else if (eventName.includes('Contact')) {
        type = 'contact';
      } else if (eventName.includes('Tournament') || eventName.includes('Registration')) {
        type = 'tournament';
      } else {
        type = 'subscription';
      }
    }

    const adminEmail = 'info@ludoleague.co.za';

    if (type === 'contact') {
      // 1. Send details immediately to admin
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[Contact Us] New message from ${data.fullName || 'User'}`,
          html: `<p>You received a new message from the contact form:</p>
                 <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Message:</strong></p>
                 <p>${data.message || 'No message provided'}</p>`
        }
      });

      // 2. Send receipt confirmation to user
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Message Received - Ludo League SA',
            html: `<p>Hello ${data.fullName || 'there'},</p>
                   <p>Thank you for getting in touch with Ludo League SA. We have received your message and will be in touch with you soon.</p>
                   <p>Best regards,<br>The Ludo League SA Team</p>`
          }
        });
      }
    } else if (type === 'investment') {
      // 1. Send details immediately to admin
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[Callback Request] New Investment Inquiry from ${data.fullName || 'User'}`,
          html: `<p>A new corporate investment callback request has been logged:</p>
                 <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Phone:</strong> ${data.phone || data.phoneNumber || 'N/A'}</p>
                 <p><strong>Inquiry Message:</strong></p>
                 <p>${data.message || 'No specific queries'}</p>`
        }
      });

      // 2. Send receipt confirmation to user
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Callback Request Logged - Ludo League SA',
            html: `<p>Hello ${data.fullName || 'there'},</p>
                   <p>Your corporate investment callback query has been logged. Our executive committee will contact you shortly on your provided phone number (${data.phone || data.phoneNumber || 'N/A'}).</p>
                   <p>Best regards,<br>The Ludo League SA Team</p>`
          }
        });
      }
    } else if (type === 'sponsorship') {
      // 1. Send details immediately to admin
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[Sponsorship Inquiry] New Inquiry from ${data.fullName || 'User'}`,
          html: `<p>A new corporate sponsorship inquiry has been logged:</p>
                 <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Phone:</strong> ${data.phone || data.phoneNumber || 'N/A'}</p>
                 <p><strong>Inquiry Message:</strong></p>
                 <p>${data.message || 'No specific queries'}</p>`
        }
      });

      // 2. Send receipt confirmation to user
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Corporate Partnership Verified',
            html: `<p>Hello ${data.fullName || 'there'},</p>
                   <p>Thank you for your commitment to sponsor our tournament circuit. An administrative representative will touch base shortly to coordinate media visibility parameters.</p>
                   <p>Best regards,<br>The Ludo League SA Team</p>`
          }
        });
      }
    } else if (type === 'donation') {
      // 1. Send receipt confirmation to user
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Crowd Funding Donation Acknowledged',
            html: `<p>Thank you for your generous donation of R${data.amount || '0'} to the Community Fund. Your support sustains screen-free learning clinics and township manufacturing jobs.</p>`
          }
        });
      }

      // 2. Notify the admin of the donation immediately
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[Donation] Contribution from ${data.fullName || 'User'}`,
          html: `<p>A new donation has been received:</p>
                 <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Amount:</strong> R${data.amount || '0'}</p>
                 <p><strong>Payment Method:</strong> ${data.paymentMethod || 'N/A'}</p>
                 <p><strong>Message:</strong> ${data.message || 'N/A'}</p>`
        }
      });
    } else if (type === 'purchase') {
      // 1. Send receipt confirmation to user
      if (data.email) {
        const containsBoard = data.items && data.items.some((item: any) => {
          const name = typeof item === 'string' ? item : item.name || '';
          return name.toLowerCase().includes('board') || name.toLowerCase().includes('mdf');
        });
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Order Processed - Ludo League SA',
            html: `<p>Thank you for your purchase.</p>${containsBoard ? '<p>Special Note: Your tournament MDF board is currently being hand-milled inside local township carpentry workshops. Thank you for supporting regional employment!</p>' : ''}`
          }
        });
      }

      // 2. Notify the admin of the order immediately
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[New Order] Purchase by ${data.fullName || 'User'}`,
          html: `<p>A new shop order has been placed:</p>
                 <p><strong>Customer Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Customer Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Delivery Address:</strong> ${data.deliveryAddress || 'N/A'}</p>
                 <p><strong>Courier:</strong> ${data.courierChoice || 'N/A'} (Cost: R${data.courierCost || 0})</p>
                 <p><strong>Total Paid:</strong> R${data.totalCost || 0}</p>
                 <p><strong>Items:</strong></p>
                 <ul>
                   ${data.items ? data.items.map((item: any) => {
                     const name = typeof item === 'string' ? item : item.name || 'Unknown item';
                     const quantity = typeof item === 'string' ? 1 : item.quantity || 1;
                     return `<li>${quantity}x ${name}</li>`;
                   }).join('') : 'N/A'}
                 </ul>`
        }
      });
    } else if (type === 'tournament') {
      // 1. Send confirmation to user
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Player Registration Verified',
            html: `<p>Hello ${data.fullName || 'Player'},</p><p>We have successfully verified your registration to join the Ludo League SA circuit in the ${data.region || 'N/A'} region. Standard clock procedures will be provided on-ground.</p>`
          }
        });
      }

      // 2. Notify the admin of the registration immediately
      await db.collection('mail').add({
        to: adminEmail,
        message: {
          subject: `[Tournament Signup] ${data.fullName || 'Player'} registered`,
          html: `<p>A new tournament registration has been received:</p>
                 <p><strong>Name:</strong> ${data.fullName || 'N/A'}</p>
                 <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                 <p><strong>Phone:</strong> ${data.phoneNumber || 'N/A'}</p>
                 <p><strong>Region:</strong> ${data.region || 'N/A'}</p>
                 <p><strong>Payment Method:</strong> ${data.paymentMethod || 'N/A'}</p>`
        }
      });
    } else {
      // Default subscription/fallback
      if (data.email) {
        await db.collection('mail').add({
          to: data.email,
          message: {
            subject: 'Welcome to the Intelligence Network',
            html: '<p>Thank you for subscribing to our official updates channel.</p>'
          }
        });
      }
    }
  });

export const sendOrderEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    if (!data?.email) return;
    const containsBoard = data.items && data.items.some((item: string) => item.toLowerCase().includes('board') || item.toLowerCase().includes('mdf'));
    await db.collection('mail').add({
      to: data.email,
      message: {
        subject: 'Order Processed - Ludo League SA',
        html: `<p>Thank you for your purchase.</p>${containsBoard ? '<p>Special Note: Your tournament MDF board is currently being hand-milled inside local township carpentry workshops. Thank you for supporting regional employment!</p>' : ''}`
      }
    });
  });

// Cloud Function to act as a direct alternative to the Trigger Email Extension
export const processMailQueue = functions.firestore
  .document('mail/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data || !data.to || !data.message) return;

    // Use environment variables for secure SMTP configuration
    // To set: firebase functions:config:set smtp.host="smtp.example.com" smtp.port="465" smtp.user="your_email" smtp.pass="your_password"
    const transporter = nodemailer.createTransport({
      host: functions.config().smtp?.host || process.env.SMTP_HOST || '',
      port: Number(functions.config().smtp?.port || process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: functions.config().smtp?.user || process.env.SMTP_USER || '',
        pass: functions.config().smtp?.pass || process.env.SMTP_PASS || '',
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Ludo League SA" <${functions.config().smtp?.user || process.env.SMTP_USER || 'info@ludoleague.co.za'}>`,
        to: data.to,
        subject: data.message.subject,
        text: data.message.text || '',
        html: data.message.html || '',
      });

      // Update the document to indicate successful delivery
      await snap.ref.update({
        delivery: {
          state: 'SUCCESS',
          info: info.messageId,
          error: null,
        }
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      // Update the document to record the error
      await snap.ref.update({
        delivery: {
          state: 'ERROR',
          error: error.message || 'Unknown error',
        }
      });
    }
  });
