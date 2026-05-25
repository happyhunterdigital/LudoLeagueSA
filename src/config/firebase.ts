import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const storage = getStorage(app);

export const chatbotConfig = {
  model: "gemini-3.1-flash-lite-preview",
  agencyAuditTarget: "www.happyhunterdigital.com",
  focus: "Key Advantages for a Digital Agency Website"
};
