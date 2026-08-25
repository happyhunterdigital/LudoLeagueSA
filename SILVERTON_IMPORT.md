# Silverton 2026 — Certified Ludo Agent Attendance Import

**Event:** Certified Ludo Agent – Attendance Register  
**Venue:** Silverton Recreation Center  
**Date:** 15 August 2026  
**Source:** PDF Attendance Register (Pages 1-3, 57 rows, images 1-6)

All 57 attendees have a **signature tick (✓)** in the Signature column. Per your instruction, that means they **qualify to be CONSIDERED to become Ludo Agents** (requires vetting + Founding Agent Licence R1,500 then R1,000–R2,000 annual renewal).

## Segmentation Applied

Every record is normalized and segmented for Firestore queries and AdminDashboard filtering:

| Field | Values | Example |
|-------|--------|---------|
| `qualificationStatus` | `qualified_pending_review` (all 57) | `qualified_pending_review` |
| `signature` | `true` (✓) | `true` |
| `regionCluster` | `Mamelodi-Pretoria` (36), `Other-Gauteng` (6), `Bronkhorstspruit-Cullinan` (6), `Soweto` (5), `Silverton-Atteridgeville` (4) | `Mamelodi-Pretoria` |
| `townNormalized` | 29 distinct towns | `Mamelodi`, `Pretoria`, `Soweto`, `Bronkhorstspruit`, `Silverton`… |
| `gender` | M 21 / F 36 (PDF gender column verbatim; summary sheet reports 16M/40F — discrepancy noted, raw data retained) | `F` |
| `ageGroup` | `18-24` (11), `25-34` (36), `35-44` (7), `45+` (3) | `25-34` |
| `phoneE164` | `+27...` normalized | `+27712752300` |
| `eventId` | `silverton-2026-08-15` | — |

### Town Breakdown (normalized)

- Mamelodi: 11
- Mamelodi East: 5 + Mamelodi West 1 + Nellmapius/Mamelodi variants ~3
- Pretoria: 7
- Pretoria / Mamelodi: 2
- Bronkhorstspruit: 3
- Eastlynne: 2
- Silverton: 2
- Soweto: 4
- Cullinan/Refilwe variants: 2 + Cullinan 1
- Others: Cosmo City, Daveyton, Kwamhlanga, Hammanskraal, Soshanguve, Rosslyn, Atteridgeville, Johannesburg, Montana, Vosloorus, Hatfield, Goshamanube

## Files Added

```
src/data/silvertonAttendance.ts          # Typed TS source of truth (57 records + helpers)
public/data/silverton-2026-attendance.json # JSON for Firestore import / console
public/data/silverton-2026-attendance.csv  # CSV for Sheets / manual import
scripts/seedSilvertonAgents.mjs           # Idempotent Firestore seed script
firestore.rules                           # + attendance_registers, ludo_agents, silverton_attendance
firestore.indexes.json                    # Composite indexes for segmented queries
```

## Firestore Data Model

```
attendance_registers/silverton-2026-08-15          # event meta document
  └── attendees/{SVT-2026-001 … SVT-2026-057}      # 57 subcollection docs
ludo_agents/{SVT-2026-001 … SVT-2026-057}          # 57 top-level docs (denormalized for AdminDashboard)
silverton_attendance/{SVT-2026-001 …}               # flat mirror (for CSV console import)
```

Each document includes:
`fullName, age, ageGroup, gender, phoneRaw, phoneE164, townRaw, townNormalized, regionCluster, signature, qualificationStatus='qualified_pending_review', eventId, venue, sourcePage/sourceRow, createdAt, isQualifiedCandidate, reviewStatus='pending'`

## Import to Firebase (Firestore)

### Option A — Service Account (recommended, idempotent)

1. Firebase Console → Project Settings → Service Accounts → Generate new private key → save as `serviceAccount.json` (gitignored)
2. Run:
```bash
npm run seed:silverton:dry   # verify 57 segmented correctly
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json npm run seed:silverton
```
3. Verify: https://console.firebase.google.com/project/ludoleaguesa-33371/firestore/data/~2Fludo_agents

### Option B — Firebase Console Manual Import

- JSON is at `public/data/silverton-2026-attendance.json`
- Use extension `firestore-import` or manually import via Console → Firestore → Import (convert JSON to expected format)

### Option C — Emulator (local dev)

```bash
firebase emulators:start --only firestore
FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seedSilvertonAgents.mjs --with-emulator
```

## Security Rules

`ludo_agents`, `attendance_registers/**`, `silverton_attendance` are **admin-only writes**, **admin or authenticated reads** as appropriate. Public cannot write. See `firestore.rules:88-109`.

Endpoints need an account in `admins/{uid}` to read/write. Add admins via:
```bash
firebase firestore:set admins/<ADMIN_UID> '{"role":"admin"}'
```

## Usage in Code

```ts
import { SILVERTON_ATTENDEES, QUALIFIED_CANDIDATES, SEGMENTED_BY_REGION } from '@/data/silvertonAttendance';

// All qualified for consideration
QUALIFIED_CANDIDATES.length // 57

// Query Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
const q = query(collection(db, 'ludo_agents'), where('regionCluster','==','Mamelodi-Pretoria'), where('qualificationStatus','==','qualified_pending_review'));
```

## Notes & Caveats

- All 57 have ✓ — none are pending/unqualified in this batch. The `UNQUALIFIED` array will be 0; field retained for future registers where some lack ticks.
- Phone numbers normalized to E.164 (`+27`); some originals truncated in PDF (e.g., 067 030 861) — kept verbatim in `phoneRaw`.
- Gender: PDF column followed verbatim (e.g., Mashifane Agatha listed as M). If correction needed, update `src/data/silvertonAttendance.ts`.
- Firestore indexes must be deployed: `firebase deploy --only firestore:indexes,firestore:rules`

## Next Steps

- AdminDashboard extension to list `ludo_agents` with filters by regionCluster/gender/ageGroup and Approve/Reject actions
- On approval, set `licenceType: 'founding_agent'` and trigger payment link for R1,500
