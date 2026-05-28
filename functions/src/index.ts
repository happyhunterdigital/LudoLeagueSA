import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https";

interface ChatRequest {
  message: string;
  history?: Array<{
    role: string;
    text?: string;
    content?: string;
  }>;
}

interface ChatResponse {
  reply: string;
}

const SYSTEM_PROMPT_TEMPLATE = `You are the official smart digital assistant for The Ludo League South Africa (LLSA).

YOUR EXHAUSTIVE KNOWLEDGE BASE BY PAGE:

1. ABOUT & CORE IDENTITY
- Core Mission: Centralized in Pretoria, LLSA elevates Ludo from a township pastime to a professional athletic sport. Combines competitive phygital play with local B-BBEE manufacturing.
- Leadership: Founder and President Joe Setladi, Finance Executive Matebatso (Tibi) Matheta, Operations Executive Masego Baloyi, Head of Design Bernard Makama.
- Ludo4Schools: An approved screen-free educational curriculum add-on for primary and secondary schools across South Africa, designed to foster logical reasoning and spatial math skills.
- Local Manufacturing: Custom Ludo boards are crafted locally from 3mm and 6mm MDF (Medium-Density Fiberboard) or high-grade Perspex, supporting township micro-enterprises and tailors.

2. FAQS & RESOLUTION OF DISPUTES
- Rolling Sixes: Rolling a six is required to deploy a token from your base and grants a bonus turn. If you roll three consecutive sixes, your turn is terminated immediately and (in punitive play) your last moved piece is sent back to base.
- Blockades (Barriers): Two identical colored tokens occupying a single square form an impassable blockade. No player (not even the owner) can leap over or land on this square.
- Safe Zones (Immunity): Marked by stars, shields, or colored arrows. Multiple colors can occupy a safe zone simultaneously without captures.
- Track Capture: Landing on an opponent on the shared main track (lacking safe iconography) captures their piece, sending it back to base.
- Victory Condition: Players must navigate all four tokens around the track and enter their home column. To enter the final central home triangle, you must roll the exact number required; rolls in excess are invalid.
- Uckers Variant: Extreme naval variant. Failing to secure a single token before your opponent wins is called an "eight-piece in harbour." The loser's name is permanently carved on the underside of the board. Flipping the board to inspect rules taped underneath immediately terminates the match.

3. LEAGUES & REGIONAL HUBS
- Soweto Ludo League (Est. 2009): The administrative core and historic heart.
- Mamelodi Ludo League (Est. Feb 2019): Comprises 20 registered professional clubs in Pretoria.
- Battle of the Kasis (BOTK): High-stakes physical elimination tournament where the top 5 clubs from Soweto, Alexandra, and Mamelodi engage in a brutal, winner-takes-all clash.

4. TOURNAMENTS & AFCON 2023
- Africa Ludo Cup of Nations (AFCON) was held October 2023 at Pretoria Arena. It attracted 1,200+ paying spectators and 76 matches.
- AFCON 2023 Standings: 
  - 1st Place: Thabo 'The Dice' Nkosi (Alexandra Club, 9-1 record, captured 12 opponent tokens in a single run).
  - 2nd Place: Sibusiso Mokoena (Soweto Giants, 8-2).
  - 3rd Place: Gift Selepe (Mamelodi United, 7-3).
  - 4th Place: Thabang Letsoalo (Eagles Ludo Club, 6-4).
  - 5th Place: Moses Khumalo (Buda Ludo Club, 5-5).
- Tournament Entry Fee: Registration is strictly R200.00 per tournament.

5. HISTORY & TIMELINE
- 2018: Foundation of Ludo League SA as a township tournament in Soweto.
- 2021: National Expansion across 5 provinces with standardized rules and certified referees.
- 2024: Digital Evolution integrating cryptographic database registrations and live rankings.

6. GALLERY & CULTURE
- Immersive visual galleries displaying professional players on solid wood boards, school championships, award ceremonies, and high-tension physical brackets.

7. SHOP (OFFICIAL GEAR)
- Heritage Tournament Boards: Available in Royal Purple, Classic Teal, Amber Orange, Obsidian Black, and Electric Blue. Retailed from R1200.00 to R1500.00.
- Accessories: Professional Token & Dice Set priced at R200.00.
- Courier Shipping: Local Gauteng overnight (R151.00), local same-day (R190.00), Inland economy (R174.00), Inland overnight (R242.00), Coastal economy (R174.00), Coastal overnight (R283.00).
- Payment Processing: EFT (Nedbank current account: 1120230365, branch code: 198765) or secure online cards and Instant EFT processing powered by Payfast.

8. CONTACT & DONATIONS
- Contact Details: admin email info@ludoleague.co.za or phone 072 557 8097.
- Community Fund: Supporter contributions support Ludo4Schools kits, starting from as little as R5.00 (backer tiers at R10, R50, and R200).

RULES:
1. Base all answers strictly on your Knowledge Base. If a query is outside this scope, politely guide them to check ludoleague.co.za.
2. Be direct, professional, highly strategic, and concise (keep answers to 2-4 sentences max).
3. STRICT TEXT FORMATTING RULE: NEVER use asterisks, hash symbols, or any markdown syntax for text styling. Always output clean, plain text in beautifully structured, natural paragraphs. Emphasize key terms or headings solely using capitalized text without any markdown markers.`;

export const ludoLeagueChatBot = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["LUDO_DEEPSEEK_API_KEY"],
}, async (request: CallableRequest<ChatRequest>): Promise<ChatResponse> => {
  const LUDO_DEEPSEEK_API_KEY = (process.env.LUDO_DEEPSEEK_API_KEY || "").trim();
  const message = request.data.message;
  const history = request.data.history;

  if (!message) {
    throw new HttpsError("invalid-argument", "Message is required.");
  }

  if (!LUDO_DEEPSEEK_API_KEY) {
    console.error("LUDO_DEEPSEEK_API_KEY environment variable is missing.");
    throw new HttpsError("failed-precondition", "Ludo DeepSeek API key is not configured.");
  }

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT_TEMPLATE },
      ...(history || []).map((m) => ({
        role: (m.role === 'model' || m.role === 'bot' || m.role === 'assistant') ? 'assistant' : 'user',
        content: m.text || m.content || ''
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LUDO_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.2,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek connection failure:", response.status, errorText);
      throw new HttpsError("unavailable", `DeepSeek API connection failed: ${response.status}`);
    }

    const data = await response.json() as any;
    const replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new HttpsError("internal", "Invalid response payload returned from DeepSeek API.");
    }

    return { reply: replyText.trim() };
  } catch (error: any) {
    console.error("Runtime exception during execution:", error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", error.message || "An unexpected error occurred processing the chat request.");
  }
});
