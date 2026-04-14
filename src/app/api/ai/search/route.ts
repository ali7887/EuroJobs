import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEmbedding, cosineSimilarity } from "@/app/api/ai/embeddings";
import { db } from "@/lib/db";
import { jobs, job_embeddings } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";

const schema = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(50).optional().default(10),
});

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { query, topK } = parsed.data;

  const queryEmbedding = await getEmbedding(query);
  const embeddings = await db.select().from(job_embeddings);

 const scored = embeddings
  .map((e) => ({
    jobId: e.jobId,
    similarity: cosineSimilarity(
      queryEmbedding,
      JSON.parse(e.embedding)
    ),
  }))


  const jobIds = scored.map((s) => s.jobId);

  if (jobIds.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const jobRows = await db
    .select()
    .from(jobs)
    .where(inArray(jobs.id, jobIds));

  const results = scored.map((s) => ({
    jobId: s.jobId,
    score: Math.round(s.similarity * 100),
    job: jobRows.find((j) => j.id === s.jobId) ?? null,
  }));

  return NextResponse.json({ data: results });
}
