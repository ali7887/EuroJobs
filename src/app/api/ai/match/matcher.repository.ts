import { db } from "@/lib/db";
import { job_embeddings } from "@/lib/db/schema";
import type { JobEmbeddingRecord } from "./matcher.types";
import { eq } from "drizzle-orm";

export class MatcherRepository {
  /**
   * ذخیره یا آپدیت Embedding یک شغل
   */
  async saveEmbedding(record: Omit<JobEmbeddingRecord, "id">): Promise<void> {
    const embeddingJson = JSON.stringify(record.embedding);

    await db
      .insert(job_embeddings)
      .values({
        jobId: record.jobId, // UUID
        embedding: embeddingJson,
        updatedAt: record.updatedAt ?? new Date(),
      })
      .onConflictDoUpdate({
        target: job_embeddings.jobId,
        set: {
          embedding: embeddingJson,
          updatedAt: record.updatedAt ?? new Date(),
        },
      });
  }

  /**
   * واکشی همه‌ی embeddings
   */
  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    const rows = await db.select().from(job_embeddings);

    return rows.map((r) => ({
      id: r.id as string,
      jobId: r.jobId as string,
      embedding: JSON.parse(r.embedding) as number[],
      updatedAt: r.updatedAt ? new Date(r.updatedAt) : null,
    }));
  }
}
