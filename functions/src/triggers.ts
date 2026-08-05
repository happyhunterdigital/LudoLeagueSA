import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";
import { encryptDocumentFields } from "./crypto";

if (!admin.apps.length) admin.initializeApp();

const ENCRYPTED_FIELDS: Record<string, string[]> = {
  prospects: ["phone", "name", "query", "interest"],
  leads: ["phone", "message"],
};

export const encryptProspectOnCreate = onDocumentCreated(
  { document: "prospects/{docId}", region: "us-central1" },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    if (data.__encrypted) return;
    const encrypted = encryptDocumentFields(data, ENCRYPTED_FIELDS.prospects);
    await snap.ref.update(encrypted);
  }
);

export const encryptProspectOnUpdate = onDocumentUpdated(
  { document: "prospects/{docId}", region: "us-central1" },
  async (event) => {
    const after = event.data?.after;
    if (!after) return;
    const data = after.data();
    if (data.__encrypted) return;
    const encrypted = encryptDocumentFields(data, ENCRYPTED_FIELDS.prospects);
    await after.ref.update(encrypted);
  }
);