// src/app/api/ai/gapgpt.client.ts
export function getGapGPTClient() {
  const apiKey = process.env.GAPGPT_API_KEY;
  const apiUrl = process.env.GAPGPT_API_URL;
  const model = process.env.GAPGPT_MODEL || "gpt-5.2";
  if (!apiKey) throw new Error("Missing GAPGPT_API_KEY.");
  return { apiUrl, apiKey, model };
}
