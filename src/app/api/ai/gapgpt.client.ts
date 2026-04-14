export function getGapGPTClient() {
  const baseUrl = process.env.GAPGPT_API_URL;
  const apiKey = process.env.GAPGPT_API_KEY;

  return {
    chat: async (payload: any) => {
      const response = await fetch(`${baseUrl}/v1/chat/completions`, {
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
        const response = await fetch(`${baseUrl}/v1/embeddings`, {
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
