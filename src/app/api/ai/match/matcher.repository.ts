import { db } from "@/lib/db";
import { job_embeddings } from "@/lib/db/schema";
import type { JobEmbeddingRecord } from "./matcher.types";
import { eq } from "drizzle-orm";

export class MatcherRepository {
  async saveEmbedding(record: Omit<JobEmbeddingRecord, "id">): Promise<void> {
    const existing = await db
      .select()
      .from(job_embeddings)
      .where(eq(job_embeddings.jobId, record.jobId))
      .limit(1);

    const embeddingString = JSON.stringify(record.embedding);

    if (existing.length > 0) {
      await db
        .update(job_embeddings)
        .set({
          embedding: embeddingString,
          updatedAt: record.updatedAt ?? new Date(),
        })
        .where(eq(job_embeddings.jobId, record.jobId));
    } else {
      await db.insert(job_embeddings).values({
        jobId: record.jobId,
        embedding: embeddingString,
        updatedAt: record.updatedAt ?? new Date(),
      });
    }
  }

  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    const rows = await db.select().from(job_embeddings);

    return rows.map((r) => ({
      id: r.id,
      jobId: r.jobId,
      embedding: JSON.parse(r.embedding),
      updatedAt: r.updatedAt,
    }));
  }
}
