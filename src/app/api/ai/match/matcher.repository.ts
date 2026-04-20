//ok
import { db } from "@/lib/db";
import { job_embeddings } from "@/lib/db/schema";
import type { JobEmbeddingRecord } from "./matcher.types";
import { eq } from "drizzle-orm";

export class MatcherRepository {
  /**
   * ذخیره‌ی embedding یا به‌روزرسانی اگر قبلاً وجود داشته باشد
   * استفاده از UPSERT برای اتمیک بودن عملیات
   */
  async saveEmbedding(record: Omit<JobEmbeddingRecord, "id">): Promise<void> {
    const embeddingJson = JSON.stringify(record.embedding);

    await db
      .insert(job_embeddings)
      .values({
        jobId: record.jobId,
        embedding: embeddingJson,
        updatedAt: record.updatedAt ?? new Date(),
      })
      // 🟢 UPSERT برای جلوگیری از race-condition
      .onConflictDoUpdate({
        target: job_embeddings.jobId,
        set: {
          embedding: embeddingJson,
          updatedAt: record.updatedAt ?? new Date(),
        },
      });
  }

  /**
   * بازخوانی تمام Embeddingها
   */
  async getAllEmbeddings(): Promise<JobEmbeddingRecord[]> {
    const rows = await db.select().from(job_embeddings);

  return rows.map((r) => ({
  id: r.id,
  jobId: r.jobId,
  embedding: JSON.parse(r.embedding),
  updatedAt: r.updatedAt ? new Date(r.updatedAt) : null,
}));

  }
}
