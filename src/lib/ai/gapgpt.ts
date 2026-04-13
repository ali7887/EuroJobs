export async function gapgptChat(prompt: string) {
  const apiKey = process.env.GAPGPT_API_KEY;
  const baseUrl = process.env.GAPGPT_API_URL;
  const model = process.env.GAPGPT_MODEL || "gpt-5.2";

  if (!apiKey) throw new Error("Missing GAPGPT_API_KEY in environment variables.");
  if (!baseUrl) throw new Error("Missing GAPGPT_API_URL in environment variables.");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt }
        ]
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`GapGPT API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "No content.";
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("GapGPT request timed out (network or server issue).");
    }
    throw new Error(`GapGPT fetch failed: ${error.message}`);
  }
}
