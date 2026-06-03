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
- Core Mission: Centralized in Pretoria, LLSA elevates Ludo from a township pastime to a professional athletic sport. Combines competitive play on physical boards with modern digital scaling.
- Leadership: Founder and President Joe Setladi, Finance Executive Matebatso (Tibi) Matheta, Operations Executive Masego Baloyi, Head of Design Bernard Makama.
- Tournaments & Clinics: Create vibrant, positive spaces to learn, compete, and grow. Clinics introduce new players to fundamentals, while tournaments showcase talent. These events stimulate local township economies, creating opportunities for facilitators, judges/referees, and small businesses.
- Offline Footprint: Establishes a permanent, ambient presence directly in grassroots social hubs, including local parks and community halls.

2. STANDARDISED PLAY DISPUTES FRAMEWORK
Below are the official dispute categories recognized by the league:
- A. Dice Roll Disputes: Dice falling off the board, not shaken properly, rolling with two hands, or rolling before opponent finishes moving.
- B. Touch Disputes ("Touch is a Move"): Player touching a token and trying to move another, opponent touching the board/tokens during your turn, or touching the dice before the opponent finishes playing.
- C. Token Movement Disputes: Incorrect counting, illegal splitting of married tokens, moving out of order, or moving without an exact number.
- D. Capture Disputes: Disputing whether a capture was legal, token moved incorrectly before capture, or capture was missed/ignored.
- E. Time-Wasting Disputes: Intentionally delaying moves, repeatedly asking unnecessary questions, or refusing to roll.
- F. Coaching & Interference: Coaching during active play, spectator interference, or manager gestures/signals.
- G. Behavioural Misconduct: Inappropriate language, aggression, touching opponent's tokens, wearing unapproved brands, or substance use.
- H. Venue & Environmental: Poor lighting, unsafe environment, or noise interference.

3. LEAGUES & REGIONAL HUBS
- Soweto Ludo League (Est. 2022): Hosted in one of the largest and most iconic townships. Rich in history, Ludo has found a natural home among the people of Soweto.
- Mamelodi Ludo League (Est. Feb 2019): Pretoria region.
- Battle of the Kasis (BOTK): Soweto vs Alexandra vs Mamelodi Knockout. The ultimate township showdown—a high-stakes, winner-takes-all knockout tournament. Rivalries are ignited, champions are crowned, and legends are born.

4. HISTORY TIMELINE & CHAMPIONS
- 2013 Foundation: Started as a community tournament in Alexandra, Johannesburg.
- 2017 Regional Circuit: Expanded across Gauteng with professional rules.
- 2019 League Evolution: Developed into a professional Local League format.
- 2019 Champion: Kea Mdawe representing Mamelodi.
- 2024 Champion: Thabo 'The Dice' Nkosi (Alexandra Club, 9-1 record).

5. SHOP & DONATION PORTALS
- Official Boards: Premium wooden boards (Royal Purple, Classic Teal, Amber Orange, Obsidian Black, Electric Blue) constructed from heavy-duty 3mm/6mm MDF/Perspex, retailing at R1200.00 (reduced from R1500.00).
- Supporter Donations: Contributions start from as little as R20.00. Support is tracked dynamically. Supporter totals adding up to R500.00 or more are eligible to receive a special Gift.
- Corporate Sponsorship & Investments: Sponsors can back tournaments or the league. Corporate investors can request an offline phone consultation by submitting an Investment Callback Request with their contact details.

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
