import { initializeApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAuth, Auth } from 'firebase/auth';
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

export let app: FirebaseApp | null = null;
export let db: Firestore | null = null;
export let storage: FirebaseStorage | null = null;
export let functions: Functions | null = null;
export let auth: Auth | null = null;
export let isFirebaseReady = false;
export let firebaseError: Error | null = null;

try {
  app = initializeApp(firebaseConfig);

  db = (firebaseAppletConfig as any).firestoreDatabaseId
    ? initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any, (firebaseAppletConfig as any).firestoreDatabaseId)
    : initializeFirestore(app, { experimentalForceLongPolling: true, useFetchStreams: false } as any);

  storage = getStorage(app);
  functions = getFunctions(app, 'us-central1');
  auth = getAuth(app);
  isFirebaseReady = true;
} catch (err) {
  console.error('Firebase failed to initialize:', err);
  firebaseError = err instanceof Error ? err : new Error(String(err));
  app = null;
  db = null;
  storage = null;
  functions = null;
  auth = null;
  isFirebaseReady = false;
}

export const chatbotConfig = {
  model: "gemini-3.1-flash-lite-preview",
  agencyAuditTarget: "www.happyhunterdigital.com",
  focus: "Key Advantages for a Digital Agency Website"
};
