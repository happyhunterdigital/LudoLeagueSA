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
      "tournament", "tournaments", "qualifier", "compete",
      "play in a tournament", "fixture", "clock", "rules",
    ],
    title: "Tournaments",
    category: "sales",
    response:
      "LLSA runs standardized, refereed tournaments across South Africa with certified referees and standard mechanical clocks. Rolling three sixes invalidates the turn - no backyard exceptions.\n\n" +
      "Active regions: Alexandra, Soweto, Mamelodi.\n\n" +
      "Register here: https://ludoleague.co.za/?page=tournaments",
    isHighIntent: true,
  },
  {
    keywords: [
      "king's table", "kings table", "king table", "prestigious", "elite",
    ],
    title: "King's Table",
    category: "sales",
    response:
      "The King's Table is the most prestigious Ludo competition in South Africa. Teams register with player details and city, then choose between PayFast online payment or Manual EFT.\n\n" +
      "Registration includes email confirmation and WhatsApp event details.\n\n" +
      "Register your team: https://ludoleague.co.za/?page=kingstable",
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
      "Ludo4Schools is an approved curriculum add-on that inserts physical strategy play into primary and secondary classrooms. It sharpens cognitive mathematics, spatial geometry, probability assessment, and strategic reasoning while promoting social cohesion.\n\n" +
      "Learn more: https://ludoleague.co.za/?page=ludo4schools",
    isHighIntent: false,
  },
  {
    keywords: [
      "academy", "training", "accreditation", "course", "certify",
      "licence", "license", "level 1", "level 2", "level 3",
    ],
    title: "Ludo Academy",
    category: "info",
    response:
      "The Ludo Academy of Excellence is the official training, educational, and accreditation arm of LLSA. We develop certified tournament players, official referees, and accredited talent agents through three levels of mastery.\n\n" +
      "Learn more: https://academy.ludoleague.co.za",
    isHighIntent: false,
  },
  {
    keywords: [
      "agent", "become an agent", "register as agent", "scout", "talent",
      "roster", "agency", "player agent", "founding agent", "licence", "license",
    ],
    title: "Ludo Agent",
    category: "sales",
    response:
      "Official Ludo Agents get exclusive rights to scout talent, build player rosters, and represent athletes in official leagues and national championships.\n\n" +
      "Your role: recruit and mentor players in township leagues, manage contracts and endorsements, and enforce the Official Code of Conduct.\n\n" +
      "Register on the Academy site in 3 steps: submit your details, choose PayFast or EFT, and get email confirmation. A special founding-agent rate is currently available for early applicants.\n\n" +
      "Start here: https://academy.ludoleague.co.za\n\n" +
      "Ask me if you'd like the current licensing fees.",
    isHighIntent: true,
  },
  {
    keywords: [
      "manufactur", "mdf", "wood", "board", "made in", "carpentry",
      "township manufacturing", "acrylic", "local",
    ],
    title: "Local Manufacturing",
    category: "info",
    response:
      "All LLSA boards are built from high-density MDF and acrylic inside local township carpentry workshops - keeping economic value circular and creating jobs in Alexandra, Soweto, and Mamelodi.\n\n" +
      "Shop a board: https://ludoleague.co.za/?page=shop",
    isHighIntent: false,
  },
  {
    keywords: [
      "donate", "donation", "fund", "crowdfund", "support", "contribute",
      "give", "backing", "sponsor a player", "community fund",
    ],
    title: "Donations",
    category: "sales",
    response:
      "Help us build the future of competitive Ludo! Our crowdfunding goal supports national expansion, recruitment, league production, and Ludo4Schools. Every contribution creates opportunities.\n\n" +
      "EFT: Nedbank, account 1120230365, branch 198765. Reference: DON-YourName.\n" +
      "Supporter tiers available with each contribution level.\n\n" +
      "Donate here: https://ludoleague.co.za/?page=donate",
    isHighIntent: true,
  },
  {
    keywords: [
      "invest", "franchise", "league shares", "share", "equity", "callback",
      "corporate", "partnership", "rtp",
    ],
    title: "Investment",
    category: "sales",
    response:
      "Corporate partners can invest in franchise club ownership (RTP modeling), corporate CSI sponsorships, and league shares. Our executive committee will schedule an offline phone consultation to discuss opportunities.\n\n" +
      "Request a callback: https://ludoleague.co.za/?page=donate",
    isHighIntent: true,
  },
  {
    keywords: [
      "sponsor", "sponsorship", "brand", "csi", "media visibility",
      "tournament sponsor", "brand integration",
    ],
    title: "Sponsorship",
    category: "sales",
    response:
      "Sponsors receive tournament media visibility, brand integration, and CSI sponsorship packages. An administrative representative will coordinate all parameters.\n\n" +
      "Request a callback: https://ludoleague.co.za/?page=donate",
    isHighIntent: true,
  },
  {
    keywords: [
      "shop", "buy", "board", "token", "dice",
      "purchase", "order", "heritage",
    ],
    title: "Shop & Merch",
    category: "price",
    response:
      "Official Heritage Wooden Boards are available in Royal Purple, Classic Teal, Obsidian Black, Electric Blue, and Amber Orange. Oversized professional design with premium lacquer. Professional Token and Dice Set also available.\n\n" +
      "All boards are 100% locally manufactured in township carpentry workshops.\n\n" +
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
      "Here is the official LLSA Player and Tournament Guide - tournament rules, clock protocol, and circuit information. View it directly in WhatsApp.",
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
      "Phone: +27 75 321 1350\n\n" +
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
      "founder", "started", "organisation", "ngo", "joe setladi",
    ],
    title: "About LLSA",
    category: "info",
    response:
      "Ludo League South Africa was founded in 2009 by President Joe Setladi. Headquartered in Pretoria, we are the governing body professionalizing Ludo from a backyard hobby into a structured, nationally recognized competitive discipline with active hubs in Soweto, Alexandra, and Mamelodi.\n\n" +
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
      "Ask me about tournaments, King's Table, leagues, Ludo4Schools, the Academy, donations, sponsorships, becoming an agent, or our shop - or explore https://ludoleague.co.za",
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

    // Always re-sync on cold start so claim updates reach Firestore even
    // when the collection already has data. batch.set(merge:true) overwrites
    // existing slugs and adds new ones, so this is idempotent and safe.
    await seedClaimsIntoDb();

    // Remove any stale claim docs whose slugs no longer exist in VERIFIED_CLAIMS
    // (e.g. the old "invest-sponsor" combined claim after it was split).
    const currentSlugs = new Set(
      VERIFIED_CLAIMS.map((c) =>
        c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      )
    );
    const snapshot = await db.collection("verified_claims").get();
    const staleDocs = snapshot.docs.filter((d) => !currentSlugs.has(d.id));
    for (const stale of staleDocs) {
      await stale.ref.delete();
    }
    if (staleDocs.length > 0) {
      console.log(`[claimsSeed] Removed ${staleDocs.length} stale verified_claims.`);
    }
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