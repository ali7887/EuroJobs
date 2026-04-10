// src/app/api/ai/match/matcher.repository.ts
import { db } from '@/lib/db';            // drizzle client: src/lib/db/index.ts
import { jobEmbeddings } from '@/lib/db/schema';
import type { JobEmbeddingRecord } from './matcher.types';
import { eq } from 'drizzle-orm';

export class MatcherRepository {
  async saveEmbedding(record: Omit<JobEmbeddingRecord, 'id'>): Promise<void> {
    // چک کن که برای این jobId قبلاً رکورد هست یا نه
    const existing = await db
      .select()
      .from(jobEmbeddings)
      .where(eq(jobEmbeddings.jobId, record.jobId))
      .limit(1);

    if (existing.length > 0) {
      // update
      await db
        .update(jobEmbeddings)
        .set({
          embedding: record.embedding,
          updatedAt: record.updatedAt,
        })
        .where(eq(jobEmbeddings.jobId, record.jobId));
    } else {
      // insert
      await db.insert(jobEmbeddings).values({
        jobId: record.jobId,
        embedding: record.embedding,
        updatedAt: record.updatedAt,
      });
    }
  }

  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    const rows = await db.select().from(jobEmbeddings);

    // اگر schema.ts را طوری تعریف کرده باشی که type ها درست باشند،
    // همین rows خودشان JobEmbeddingRecord خواهند بود.
    // ولی برای اطمینان، map می‌کنیم:
    return rows.map((r) => ({
      id: r.id,
      jobId: r.jobId,
      embedding: r.embedding,
      updatedAt: r.updatedAt,
    }));
  }
}
