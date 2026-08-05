import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// ─────────────────────────────────────────────────────────
// verified_claims seed data — matched in PHASE 2 of the
// WhatsApp bot pipeline against the keywords array.
//
//  - category:    price | sales | guide | info
//  - isHighIntent:true → saved as a prospect + admin alert
//  - docName:     only used when category === "guide"
// ─────────────────────────────────────────────────────────

export interface VerifiedClaimDoc {
  keywords: string[];
  title: string;
  category: "price" | "sales" | "guide" | "info";
  response: string;
  isHighIntent: boolean;
  docName?: string | null;
}

export const VERIFIED_CLAIMS: VerifiedClaimDoc[] = [
  {
    keywords: [
      "tournament", "register", "entry", "fee", "qualifier",
      "compete", "play in a", "fixture", "clock", "rules",
    ],
    title: "Tournaments",
    category: "sales",
    response:
      "Tournament entry is R200 and all play follows strict standardized rules with certified referees and standard mechanical clocks (no backyard exceptions - rolling three sixes invalidates the turn).\n\n" +
      "Active regions: Alexandra, Soweto, Mamelodi.\n\n" +
      "Register here: https://ludoleague.co.za/#tournaments",
    isHighIntent: true,
  },
  {
    keywords: [
      "league", "soweto", "mamelodi", "alexandra", "township", "circuit",
    ],
    title: "Township Leagues",
    category: "sales",
    response:
      "LLSA runs structured township leagues in Soweto, Mamelodi, and Alexandra with certified referees and standard clocks.\n\n" +
      "League info: https://ludoleague.co.za/#leagues",
    isHighIntent: true,
  },
  {
    keywords: [
      "ludo4schools", "school", "classroom", "education", "kids",
      "children", "learning", "math", "curriculum", "students",
    ],
    title: "Ludo4Schools",
    category: "info",
    response:
      "Ludo4Schools inserts physical strategy play into classrooms to combat screen addiction and sharpen math, logic, and spatial reasoning skills.\n\n" +
      "Learn more: https://ludoleague.co.za/?page=ludo4schools",
    isHighIntent: false,
  },
  {
    keywords: [
      "manufactur", "mdf", "wood", "board", "made in", "carpentry",
      "township manufacturing", "acrylic", "local",
    ],
    title: "Local Manufacturing",
    category: "info",
    response:
      "All LLSA boards are built from high-density MDF and acrylic inside local township carpentry workshops - keeping economic value circular and creating jobs.\n\n" +
      "Shop a board: https://ludoleague.co.za/?page=shop",
    isHighIntent: false,
  },
  {
    keywords: [
      "donate", "donation", "fund", "crowdfund", "support", "contribute",
      "give", "backing", "sponsor a player",
    ],
    title: "Donations",
    category: "sales",
    response:
      "Help us build the future of competitive Ludo! Every contribution creates opportunities, starting from just R20.\n\n" +
      "EFT: Nedbank, account 1120230365, branch 198765. Reference: DON-<YourName>.\n" +
      "Supporter tiers: R50 (profile badge), R200 (exclusive avatar), R500 (complimentary Ludo gift).\n\n" +
      "Donate here: https://ludoleague.co.za/?page=donate",
    isHighIntent: true,
  },
  {
    keywords: [
      "invest", "franchise", "league shares", "share", "equity", "callback",
      "sponsorship", "sponsor", "brand", "csi", "corporate", "partnership",
    ],
    title: "Invest & Sponsor",
    category: "sales",
    response:
      "Corporate partners can INVEST in franchise club ownership and league shares, or SPONSOR tournament media visibility and CSI packages.\n\n" +
      "Leave your details via: https://ludoleague.co.za/?page=donate\n\n" +
      "Our executive committee will schedule an offline consultation.",
    isHighIntent: true,
  },
  {
    keywords: [
      "shop", "buy", "board", "price of the board", "token", "dice",
      "purchase", "order", "heritage", "cost",
    ],
    title: "Shop & Merch",
    category: "price",
    response:
      "Official Heritage Wooden Boards are R1,200 each (was R1,500) - available in Royal Purple, Classic Teal, Obsidian Black, Electric Blue, and Amber Orange. Professional Token & Dice Set: R200.\n\n" +
      "Shop: https://ludoleague.co.za/?page=shop",
    isHighIntent: true,
  },
  {
    keywords: [
      "guide", "catalog", "pdf", "document", "download", "resource",
      "rules guide", "faq", "handbook", "brochure",
    ],
    title: "Player Guide",
    category: "guide",
    response:
      "Here is the official LLSA Player & Tournament Guide - tournament rules, clock protocol, and circuit information. View it directly in WhatsApp.",
    isHighIntent: false,
    docName: "llsa-player-guide.pdf",
  },
  {
    keywords: [
      "contact", "email", "phone", "call", "reach", "number",
      "speak to", "human", "info@",
    ],
    title: "Contact",
    category: "info",
    response:
      "Reach the LLSA administrative committee at:\n\n" +
      "Email: info@ludoleague.co.za\n" +
      "Phone: 072 557 8097\n\n" +
      "We are happy to help.",
    isHighIntent: false,
  },
  {
    keywords: [
      "portal", "account", "dashboard", "profile", "login", "sign in",
      "my account", "player profile",
    ],
    title: "Player Portal",
    category: "info",
    response:
      "Your LLSA player portal is here: https://ludoleague.co.za/?page=portal\n\n" +
      "Sign in to manage your registrations and profile.",
    isHighIntent: false,
  },
  {
    keywords: [
      "who", "about", "what is", "what do you", "history", "story",
      "founder", "started", "organisation", "ngo",
    ],
    title: "About LLSA",
    category: "info",
    response:
      "Ludo League South Africa is the governing body professionalizing Ludo from a backyard hobby into a structured, nationally recognized competitive discipline - combining screen-free education, township manufacturing, standardized fair play, and community funding.\n\n" +
      "More: https://ludoleague.co.za/?page=about",
    isHighIntent: false,
  },
  {
    keywords: [
      "hi", "hello", "hey", "good morning", "good afternoon",
      "good evening", "how are you", "yo",
    ],
    title: "Greeting",
    category: "info",
    response:
      "Welcome to Ludo League South Africa!\n\n" +
      "Ask me about tournaments, leagues, Ludo4Schools, donations, sponsorships, or our shop - or explore https://ludoleague.co.za",
    isHighIntent: false,
  },
];

const seedClaimsIntoDb = async (): Promise<number> => {
  if (!admin.apps.length) admin.initializeApp();
  const db = admin.firestore();
  const batch = db.batch();
  let count = 0;

  for (const claim of VERIFIED_CLAIMS) {
    const slug = claim.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    batch.set(
      db.collection("verified_claims").doc(slug),
      { ...claim, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
    count++;
  }

  await batch.commit();
  console.log(`[claimsSeed] Seeded ${count} verified_claims.`);
  return count;
};

/**
 * Self-healing bootstrap: seeds verified_claims on cold start if the
 * collection is empty. Invoked from index.ts so no admin is required.
 * Idempotent (merge:true) and safe under concurrent cold starts.
 */
export const ensureVerifiedClaimsSeeded = async (): Promise<void> => {
  try {
    if (!admin.apps.length) admin.initializeApp();
    const db = admin.firestore();
    const existing = await db.collection("verified_claims").limit(1).get();
    if (!existing.empty) return;
    await seedClaimsIntoDb();
    console.log("[claimsSeed] Auto-seeded verified_claims (collection was empty).");
  } catch (error) {
    console.error("[claimsSeed] Auto-seed check failed:", error);
  }
};

/**
 * Admin-only callable to seed verified_claims once after deployment.
 */
export const seedVerifiedClaims = onCall(
  { region: "us-central1", cors: true },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) throw new HttpsError("unauthenticated", "You must be signed in.");

    const user = await admin.auth().getUser(uid);
    const adminRef = await admin
      .firestore()
      .collection("admins")
      .doc(uid)
      .get();

    const isAdmin =
      adminRef.exists || (user.customClaims && user.customClaims.admin === true);

    if (!isAdmin) {
      throw new HttpsError("permission-denied", "Admin access required.");
    }

    const count = await seedClaimsIntoDb();
    return { success: true, seeded: count };
  }
);