// ─── METADATA & BRAND SETTINGS ───────────────────────────
export const BRAND_NAME = "Ludo League South Africa";
export const BRAND_DOMAIN = "https://ludoleague.co.za";
export const ADMIN_EMAIL = "info@ludoleague.co.za";
// The WhatsApp number that receives high-intent lead alerts.
// International format, no "+" or spaces.
// Reads ADMIN_PHONE_NUMBER env var; if it's missing or equals the bot's own number,
// falls back to the designated admin number.
const BOT_PHONE_NUMBER = "27753211350";
const DESIGNATED_ADMIN = "27725578097";
export const ADMIN_PHONE_NUMBER = (() => {
  const raw = (process.env.ADMIN_PHONE_NUMBER || "").trim();
  const cleaned = raw.replace(/\D/g, "");
  if (!cleaned || cleaned === BOT_PHONE_NUMBER) return DESIGNATED_ADMIN;
  return cleaned;
})();

// ─── META WHATSAPP CREDENTIALS ──────────────────────────
export const WHATSAPP_TOKEN = (process.env.WHATSAPP_TOKEN || "").trim();
export const PHONE_NUMBER_ID = (process.env.PHONE_NUMBER_ID || "").trim();
// Passphrase YOU invent, pasted into Meta's webhook "Verify token" field.
export const WHATSAPP_VERIFY_TOKEN = (process.env.WHATSAPP_VERIFY_TOKEN || "ludo_webhook_secret_x9").trim();
// Your Meta App Secret — used to verify incoming webhook signatures.
export const META_APP_SECRET = (process.env.META_APP_SECRET || "").trim();

// ─── AI ENGINE SETTINGS ────────────────────────────────
export const DEEPSEEK_API_KEY = (process.env.DEEPSEEK_API_KEY || "").trim();
export const DEEPSEEK_MODEL = "deepseek-chat";
export const DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/chat/completions";
export const LLM_MAX_TOKENS = 450;
export const LLM_TEMPERATURE = 0.2;

// ─── META GRAPH API ────────────────────────────────────
export const META_GRAPH_VERSION = "v21.0";
export const META_GRAPH_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}/${PHONE_NUMBER_ID}/messages`;

// ─── DOCUMENT ASSETS ───────────────────────────────────
export const DOCUMENT_BASE_URL = `${BRAND_DOMAIN}/assets`;

// ─── CONVERSATION CONFIG ───────────────────────────────
export const HISTORY_WINDOW_SIZE = 10;
export const RATE_LIMIT_MAX_REQUESTS = 30;
export const RATE_LIMIT_WINDOW_MINUTES = 60;