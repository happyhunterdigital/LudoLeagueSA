import * as functions from 'firebase-functions';
import { onCall } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { ensureVerifiedClaimsSeeded } from './claimsSeed';
import { SYSTEM_PROMPT } from './prompt';

admin.initializeApp();
const db = admin.firestore();

// ─── WhatsApp Bot (5-phase pipeline) ─────────────────────
// PHASE 1: Webhook handshake + signature verification (GET/POST)
// PHASE 2: Intent check against Firestore verified_claims
// PHASE 3: Lead capture (prospects) + admin alert
// PHASE 4: DeepSeek AI conversation (whatsapp_sessions history)
// PHASE 5: Response transmission via Meta Graph API
export { whatsappWebhook } from './whatsappBot';
export { seedVerifiedClaims } from './claimsSeed';
export * from './triggers';

// Bootstraps 12 verified_claims on cold start if the collection is empty
// (no admin/auth required). Idempotent.
void ensureVerifiedClaimsSeeded();

// ─── Lead view for the admin dashboard ──────────────────
export const getLeads = onCall({ region: 'us-central1' }, async (request) => {
  const uid = request.auth?.uid;
  if (!uid) throw new Error('Unauthenticated.');
  const adminRef = await db.collection('admins').doc(uid).get();
  if (!adminRef.exists) throw new Error('Admin access required.');

  const snapshot = await db
    .collection('prospects')
    .orderBy('timestamp', 'desc')
    .limit(200)
    .get();
  return { leads: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) };
});

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
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...(history || []), { role: 'user', content: message }] })
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
// SMTP Setup: firebase functions:config:set smtp.host="smtp.gmail.com" smtp.port="587" smtp.user="info@ludoleague.co.za" smtp.pass="YOUR_APP_PASSWORD"
// Then deploy: firebase deploy --only functions
export const processMailQueue = functions.firestore
  .document('mail/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data || !data.to || !data.message) return;

    const smtpHost = functions.config().smtp?.host || process.env.SMTP_HOST || '';
    const smtpPort = Number(functions.config().smtp?.port || process.env.SMTP_PORT || 587);
    const smtpUser = functions.config().smtp?.user || process.env.SMTP_USER || '';
    const smtpPass = functions.config().smtp?.pass || process.env.SMTP_PASS || '';
    // Port 465 uses implicit SSL (secure: true); port 587 uses STARTTLS (secure: false)
    const smtpSecure = smtpPort === 465;

    if (!smtpHost) {
      console.error('SMTP_HOST is not configured. Nodemailer cannot connect — ECONNREFUSED will occur. Run: firebase functions:config:set smtp.host="your.smtp.host"');
      await snap.ref.update({ delivery: { state: 'ERROR', error: 'SMTP_HOST not configured' } });
      return;
    }
    if (!smtpUser || !smtpPass) {
      console.error('SMTP_USER or SMTP_PASS is not configured. A 535 authentication error will occur. Run: firebase functions:config:set smtp.user="your@email.com" smtp.pass="yourAppPassword"');
      await snap.ref.update({ delivery: { state: 'ERROR', error: 'SMTP credentials not configured' } });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Ludo League SA" <${smtpUser}>`,
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
      console.error('Error sending email:', error.message);
      // Update the document to record the error
      await snap.ref.update({
        delivery: {
          state: 'ERROR',
          error: error.message || 'Unknown error',
        }
      });
    }
  });
