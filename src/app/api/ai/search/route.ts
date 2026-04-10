// src/app/api/ai/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getEmbedding, cosineSimilarity } from '@/app/api/ai/embeddings';
import { db } from '@/lib/db';
import { jobs, jobEmbeddings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { inArray } from 'drizzle-orm';

const schema = z.object({
  query: z.string().min(1),
  topK: z.number().int().min(1).max(50).optional().default(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { query, topK } = parsed.data;
  const queryEmbedding = await getEmbedding(query);

  const embeddings = await db.select().from(jobEmbeddings);

  const scored = embeddings
    .map((e) => ({
      jobId: e.jobId,
      similarity: cosineSimilarity(queryEmbedding, e.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  const jobIds = scored.map((s) => s.jobId);
  if (jobIds.length === 0) {
    return NextResponse.json({ data: [] });
  }

const jobRows = await db
  .select()
  .from(jobs)
  .where(inArray(jobs.id, jobIds)); // بسته به نوع jobs.id شاید cast لازم باشد

  const results = scored.map((s) => ({
    jobId: s.jobId,
    score: Math.round(s.similarity * 100),
    job: jobRows.find((j) => j.id === s.jobId) ?? null,
  }));

  return NextResponse.json({ data: results });
}
