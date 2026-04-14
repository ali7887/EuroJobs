export function getGapGPTClient() {
  const apiUrl = process.env.GAPGPT_API_URL!;
  const apiKey = process.env.GAPGPT_API_KEY!;
  const defaultModel = "gpt-4o-mini"; // یا مدل دلخواه

  return {
    apiUrl,
    apiKey,
    model: defaultModel,

    chat: async (payload: any) => {
      const response = await fetch(`${apiUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      return response.json();
    },

    embeddings: {
      create: async (payload: any) => {
        const response = await fetch(`${apiUrl}/v1/embeddings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });

        return response.json();
      },
    },
  };
}
