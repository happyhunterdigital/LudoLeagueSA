import * as crypto from "crypto";

const FIELD_ENCRYPTION_KEY = (process.env.FIELD_ENCRYPTION_KEY || "").trim();

if (!FIELD_ENCRYPTION_KEY && process.env.NODE_ENV !== "test") {
  console.warn("[crypto] FIELD_ENCRYPTION_KEY is not set. PII stored in plaintext.");
}

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

const getKey = (): Buffer =>
  crypto.createHash("sha256").update(FIELD_ENCRYPTION_KEY).digest();

export const encryptField = (plaintext: string): string => {
  if (!FIELD_ENCRYPTION_KEY || !plaintext) return plaintext;
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
};

export const decryptField = (ciphertext: string): string => {
  if (!FIELD_ENCRYPTION_KEY || !ciphertext) return ciphertext;
  try {
    const key = getKey();
    const data = Buffer.from(ciphertext, "base64");
    const iv = data.subarray(0, IV_LENGTH);
    const authTag = data.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = data.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return ciphertext;
  }
};

export const encryptDocumentFields = (
  doc: Record<string, unknown>,
  fields: string[]
): Record<string, unknown> => {
  if (!FIELD_ENCRYPTION_KEY) return doc;
  const result = { ...doc };
  const encrypted: string[] = [];
  for (const field of fields) {
    const value = result[field];
    if (typeof value === "string" && value.length > 0) {
      result[field] = encryptField(value);
      encrypted.push(field);
    }
  }
  if (encrypted.length > 0) {
    result.__encrypted = true;
    result.__encryptedFields = encrypted;
  }
  return result;
};

export const decryptDocumentFields = (
  doc: Record<string, unknown>,
  fields?: string[]
): Record<string, unknown> => {
  if (!FIELD_ENCRYPTION_KEY) return doc;
  const result = { ...doc };
  const toDecrypt =
    fields || (Array.isArray(doc.__encryptedFields) ? (doc.__encryptedFields as string[]) : []);
  for (const field of toDecrypt) {
    const value = result[field];
    if (typeof value === "string") result[field] = decryptField(value);
  }
  return result;
};