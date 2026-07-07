import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import firebaseAppletConfig from '../../firebase-applet-config.json';

const firebaseConfig = {
  authDomain: firebaseAppletConfig.authDomain,
  projectId: firebaseAppletConfig.projectId,
  storageBucket: firebaseAppletConfig.storageBucket,
  messagingSenderId: firebaseAppletConfig.messagingSenderId,
  appId: firebaseAppletConfig.appId,
  measurementId: firebaseAppletConfig.measurementId,
  apiKey: firebaseAppletConfig.apiKey
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = (firebaseAppletConfig as any).firestoreDatabaseId 
  ? initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any, (firebaseAppletConfig as any).firestoreDatabaseId)
  : initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any);

export const storage = getStorage(app);
export const functions = getFunctions(app, 'us-central1');
export const auth = getAuth(app);

export const chatbotConfig = {
  model: "gemini-3.1-flash-lite-preview",
  agencyAuditTarget: "www.happyhunterdigital.com",
  focus: "Key Advantages for a Digital Agency Website"
};
