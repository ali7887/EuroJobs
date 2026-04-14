import { NextRequest } from "next/server";
import { getGapGPTClient } from "@/lib/ai/gapgpt.client";
import { CAREER_ASSISTANT_SYSTEM } from "@/app/api/ai/prompts";
import { z } from "zod";

const schema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().max(2000),
    })
  ).min(1).max(20),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  const client = getGapGPTClient();

  const response = await fetch(`${client.apiUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${client.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: client.model,
      messages: [
        { role: "system", content: CAREER_ASSISTANT_SYSTEM },
        ...parsed.data.messages,
      ],
    }),
  });

  const data = await response.json();

  return new Response(
    JSON.stringify({ reply: data.choices?.[0]?.message?.content }),
    { status: 200 }
  );
}
