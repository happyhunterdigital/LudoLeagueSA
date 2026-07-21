// api/payment-ipn.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const paymentData = req.body;
    
    // Validate IPN data
    const { 
      payment_id, 
      payment_status, 
      amount_gross,
      first_name,
      last_name,
      email_address 
    } = paymentData;

    if (!payment_id || !payment_status) {
      return res.status(400).json({ error: 'Invalid IPN data' });
    }

    // Find the payment record
    const paymentRef = doc(db, 'payments', payment_id);
    const paymentSnap = await getDoc(paymentRef);

    if (!paymentSnap.exists()) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    const payment = paymentSnap.data();

    // Update payment status
    await updateDoc(paymentRef, {
      status: payment_status === 'COMPLETE' ? 'completed' : payment_status.toLowerCase(),
      transactionId: payment_id,
      amountPaid: parseFloat(amount_gross || 0),
      payerName: `${first_name || ''} ${last_name || ''}`.trim(),
      payerEmail: email_address,
      updatedAt: serverTimestamp(),
      completedAt: payment_status === 'COMPLETE' ? serverTimestamp() : null
    });

    // If payment is complete, update registration status
    if (payment_status === 'COMPLETE') {
      const registrationRef = doc(db, 'event_registrations', payment.registrationId);
      await updateDoc(registrationRef, {
        paymentStatus: 'completed',
        paymentCompletedAt: serverTimestamp(),
        status: 'confirmed'
      });

      // Create email notification document for the extension to process
      await addDoc(collection(db, 'mail'), {
        to: payment.participantEmail,
        message: {
          subject: 'Registration Confirmed - Ludo League',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2c3e50;">Registration Confirmed!</h2>
              <p>Dear ${payment.participantName},</p>
              <p>Thank you for registering with Ludo League SA. Your payment has been successfully processed.</p>
              <h3>Registration Details:</h3>
              <ul>
                <li><strong>Name:</strong> ${payment.participantName}</li>
                <li><strong>Email:</strong> ${payment.participantEmail}</li>
                <li><strong>Amount Paid:</strong> R${payment.amount}</li>
                <li><strong>Transaction ID:</strong> ${payment_id}</li>
                <li><strong>Date:</strong> ${new Date().toLocaleString('en-ZA')}</li>
              </ul>
              <p>We will contact you soon with further details about the event.</p>
              <p>Best regards,<br>Ludo League SA Team</p>
            </div>
          `
        },
        createdAt: serverTimestamp()
      });
    }

    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error processing IPN:', error);
    return res.status(500).send('ERROR');
  }
}
