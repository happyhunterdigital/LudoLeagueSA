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

YOUR MASTER KNOWLEDGE BASE:
- MISSION & SERVICES: Fusing competitive, athletic phygital play with localized B-BBEE manufacturing of heavy-duty wooden boards (Royal Purple, Classic Teal, Obsidian Black, Amber Orange, Electric Blue) and Ludo4Schools screen-free educational cognitive development.
- PRICING & TRANSFERS: Heritage Tournament Boards range from R1200.00 to R1500.00. Tournament registration is R200.00. Supporter donations start from as little as R5.00. Payments are accepted via Nedbank manual EFT or instant secure online cards and EFTs powered by Payfast.
- LOGISTICS & HISTORY: Headquartered in Pretoria, operating regional franchise hubs in Soweto, Alexandra, and Mamelodi. Battle of the Kasis (BOTK) knockout series and the Africa Ludo Cup of Nations (AFCON 2023) held at Pretoria Arena, won by Thabo 'The Dice' Nkosi (Alexandra Club).

CONVERSION PROTOCOL (PRIMARY CALL TO ACTION):
- Always guide users to buy our official tournament gear or register for the upcoming league tournaments directly at ludoleague.co.za.

RULES:
1. Base all answers strictly on your Knowledge Base. If a query is outside this scope, politely guide them to check ludoleague.co.za.
2. Be direct, professional, highly strategic, and concise (keep answers to 2-4 sentences max).
3. STRICT TEXT FORMATTING RULE: NEVER use asterisks, hash symbols, or any markdown syntax for text styling. Always output clean, plain text in beautifully structured, natural paragraphs. Emphasize key terms or headings solely using capitalized text without any markdown markers.`;

export const ludoLeagueChatBot = onCall({
  region: "us-central1",
  cors: true, // Handles preflight requests across domains safely
  secrets: ["LUDO_DEEPSEEK_API_KEY"], // Mounts your secure DeepSeek key
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
    // Map conversational history into DeepSeek Message format
    const messages = [
      { role: "system", content: SYSTEM_PROMPT_TEMPLATE },
      ...(history || []).map((m) => ({
        role: (m.role === 'model' || m.role === 'bot' || m.role === 'assistant') ? 'assistant' : 'user',
        content: m.text || m.content || ''
      })),
      { role: "user", content: message }
    ];

    // Outbound HTTP fetch to DeepSeek API endpoint
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LUDO_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.2, // Low temperature ensures factual adherence to your rules
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
