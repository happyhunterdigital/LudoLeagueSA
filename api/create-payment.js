// api/create-payment.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
    const { 
      registrationId,
      amount,
      paymentMethod = 'payfast',
      participantData 
    } = req.body;

    // Validate required fields
    if (!registrationId || !amount || !participantData) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['registrationId', 'amount', 'participantData']
      });
    }

    // Create payment record
    const paymentData = {
      registrationId,
      amount: parseFloat(amount),
      paymentMethod,
      status: 'pending',
      currency: 'ZAR',
      participantEmail: participantData.email,
      participantName: participantData.fullName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      metadata: {
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent']
      }
    };

    const docRef = await addDoc(collection(db, 'payments'), paymentData);

    return res.status(201).json({
      success: true,
      paymentId: docRef.id,
      message: 'Payment record created successfully'
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
