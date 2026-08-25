#!/usr/bin/env node
/**
 * Seed Silverton Recreation Center Attendance (15 Aug 2026) to Firestore
 * Project: ludoleaguesa-33371
 *
 * Segmentation:
 * - All 57 with ✓ => qualificationStatus = 'qualified_pending_review' (eligible to be CONSIDERED for Ludo Agent licence R1,500)
 * - Writes to 3 locations for query flexibility:
 *   1. attendance_registers/silverton-2026-08-15 (event meta)
 *   2. attendance_registers/silverton-2026-08-15/attendees/{id} (57 subdocs)
 *   3. ludo_agents/{id} (57 top-level, segmented by region/gender/age for AdminDashboard)
 *   4. silverton_attendance/{id} (flat mirror for CSV/console import)
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node scripts/seedSilvertonAgents.mjs
 *   # OR using Firebase CLI auth:
 *   node scripts/seedSilvertonAgents.mjs --with-emulator
 *   # Dry run:
 *   node scripts/seedSilvertonAgents.mjs --dry-run
 *
 * Credentials: Download serviceAccount.json from Firebase Console > Project Settings > Service Accounts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes('--dry-run');
const USE_EMULATOR = process.argv.includes('--with-emulator');

const JSON_PATH = path.join(__dirname, '../public/data/silverton-2026-attendance.json');

if (!fs.existsSync(JSON_PATH)) {
  console.error(`[seed] Missing data file: ${JSON_PATH}`);
  console.error(`Run the generator or ensure public/data/silverton-2026-attendance.json exists`);
  process.exit(1);
}

const { event, attendees } = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
console.log(`[seed] Loaded ${attendees.length} attendees for event ${event.eventId} (qualified: ${event.qualifiedCount})`);

if (DRY_RUN) {
  console.log('[seed] DRY RUN — no writes will be performed');
  const byRegion = {};
  const byGender = {};
  const byAge = {};
  for (const a of attendees) {
    byRegion[a.regionCluster] = (byRegion[a.regionCluster] || 0) + 1;
    byGender[a.gender] = (byGender[a.gender] || 0) + 1;
    byAge[a.ageGroup] = (byAge[a.ageGroup] || 0) + 1;
  }
  console.log('[seed] Segmented by region:', byRegion);
  console.log('[seed] By gender:', byGender);
  console.log('[seed] By ageGroup:', byAge);
  console.log('[seed] Sample doc:', attendees[0]);
  process.exit(0);
}

// Lazy import firebase-admin so dry-run doesn't require it
let admin, db;
try {
  const { default: _admin } = await import('firebase-admin');
  admin = _admin;
  if (!admin.apps.length) {
    // Allow GOOGLE_APPLICATION_CREDENTIALS or default credentials
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'ludoleaguesa-33371',
    });
  }
  db = admin.firestore();
  if (USE_EMULATOR) {
    // Firestore emulator default host; override via FIRESTORE_EMULATOR_HOST if set
    console.log('[seed] Using Firestore emulator (if FIRESTORE_EMULATOR_HOST is set)');
  }
} catch (e) {
  console.error('[seed] firebase-admin not installed or init failed:', e.message);
  console.error('Install: npm install firebase-admin');
  console.error('And set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON');
  process.exit(1);
}

async function seed() {
  const batchSize = 400;
  let batch = db.batch();
  let ops = 0;

  const eventRef = db.collection('attendance_registers').doc(event.eventId);
  const eventPayload = {
    ...event,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    source: 'PDF Attendance Register - Silverton Recreation Center (images 1-6)',
    importMethod: 'scripts/seedSilvertonAgents.mjs',
  };

  batch.set(eventRef, eventPayload, { merge: true });
  ops++;

  for (const a of attendees) {
    const attendeeRef = eventRef.collection('attendees').doc(a.id);
    const ludoAgentRef = db.collection('ludo_agents').doc(a.id);
    const flatRef = db.collection('silverton_attendance').doc(a.id);

    const baseDoc = {
      ...a,
      // server timestamps for querying
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      importedAt: admin.firestore.FieldValue.serverTimestamp(),
      // denormalized segmentation flags for dashboard
      isQualifiedCandidate: a.signature === true,
      // future workflow fields
      reviewStatus: 'pending',
      licenceType: null, // to be set on approval: 'founding_agent' | 'individual'
      notes: 'Auto-imported from Silverton 2026 attendance; signature ✓ => qualifies for consideration',
    };

    batch.set(attendeeRef, baseDoc, { merge: true });
    batch.set(ludoAgentRef, baseDoc, { merge: true });
    batch.set(flatRef, baseDoc, { merge: true });
    ops += 3;

    if (ops >= batchSize) {
      await batch.commit();
      console.log(`[seed] Committed batch of ${ops} ops`);
      batch = db.batch();
      ops = 0;
    }
  }

  if (ops > 0) {
    await batch.commit();
    console.log(`[seed] Committed final batch of ${ops} ops`);
  }

  // Verify counts
  const countSnap = await db.collection('ludo_agents').where('eventId', '==', event.eventId).count().get();
  console.log(`[seed] DONE. ludo_agents count for ${event.eventId}: ${countSnap.data().count}`);
  console.log(`[seed] View in console: https://console.firebase.google.com/project/ludoleaguesa-33371/firestore/data/~2Fludo_agents`);
}

seed().catch((e) => {
  console.error('[seed] Failed:', e);
  process.exit(1);
});
