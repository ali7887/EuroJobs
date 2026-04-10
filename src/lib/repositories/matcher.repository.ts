import { db } from '@/lib/db';
import { jobEmbeddings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { JobEmbeddingRecord } from '@/lib/db/schema';

export const matcherRepository = {
  async upsertEmbedding(jobId: number, embedding: number[]): Promise<JobEmbeddingRecord> {
    const existing = await db.select().from(jobEmbeddings).where(eq(jobEmbeddings.jobId, jobId)).limit(1);

    if (existing.length > 0) {
      const updated = await db.update(jobEmbeddings)
        .set({ embedding, updatedAt: new Date() })
        .where(eq(jobEmbeddings.jobId, jobId))
        .returning();
      return updated[0];
    }

    const inserted = await db.insert(jobEmbeddings)
      .values({ jobId, embedding, updatedAt: new Date() })
      .returning();
    return inserted[0];
  },

  async getEmbeddingByJobId(jobId: number): Promise<JobEmbeddingRecord | null> {
    const res = await db.select().from(jobEmbeddings).where(eq(jobEmbeddings.jobId, jobId)).limit(1);
    return res[0] ?? null;
  }
};
