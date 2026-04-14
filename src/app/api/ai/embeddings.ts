import { getGapGPTClient } from "@/lib/ai/gapgpt.client";

export async function getEmbedding(text: string): Promise<number[]> {
  const client = getGapGPTClient();

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, " "),
  });

  return response.data[0].embedding;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
