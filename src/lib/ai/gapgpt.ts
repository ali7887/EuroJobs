// lib/ai/gapgpt.ts
import { env } from "@/lib/env";

const GAPGPT_BASE_URL = "https://api.gapgpt.app/v1";

export async function gapgptRequest({
  prompt,
  model = "gpt-5.2",
}: {
  prompt: string;
  model?: string;
}) {
  try {
    const response = await fetch(`${GAPGPT_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`GapGPT API Error: ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "";
  } catch (err) {
    console.error("GapGPT Request Error:", err);
    throw err;
  }
}
