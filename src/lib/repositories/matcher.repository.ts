import { db } from "@/lib/db";
import { job_embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { JobEmbeddingRecord } from "@/app/api/ai/match/matcher.types";

export const matcherRepository = {
  async upsertEmbedding(
    jobId: number,
    embedding: number[]
  ): Promise<JobEmbeddingRecord> {
    const embeddingString = JSON.stringify(embedding);

    const existing = await db
      .select()
      .from(job_embeddings)
      .where(eq(job_embeddings.jobId, jobId))
      .limit(1);

    if (existing.length > 0) {
      const updated = await db
        .update(job_embeddings)
        .set({
          embedding: embeddingString,
          updatedAt: new Date(),
        })
        .where(eq(job_embeddings.jobId, jobId))
        .returning();

      return {
        ...updated[0],
        embedding: JSON.parse(updated[0].embedding),
      };
    }

    const inserted = await db
      .insert(job_embeddings)
      .values({
        jobId,
        embedding: embeddingString,
        updatedAt: new Date(),
      })
      .returning();

    return {
      ...inserted[0],
      embedding: JSON.parse(inserted[0].embedding),
    };
  },

  async getEmbeddingByJobId(
    jobId: number
  ): Promise<JobEmbeddingRecord | null> {
    const res = await db
      .select()
      .from(job_embeddings)
      .where(eq(job_embeddings.jobId, jobId))
      .limit(1);

    if (!res[0]) return null;

    return {
      ...res[0],
      embedding: JSON.parse(res[0].embedding),
    };
  },
};
