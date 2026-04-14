import { getEmbedding } from "@/app/api/ai/embeddings";
import { db } from "@/lib/db/db";
import { jobs, job_embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const jobIndexer = {
  async indexJob(job: typeof jobs.$inferSelect) {
    const vector = await getEmbedding(job.description ?? "");

    const existing = await db
      .select()
      .from(job_embeddings)
      .where(eq(job_embeddings.jobId, job.id));

    if (existing.length > 0) {
      return db
        .update(job_embeddings)
        .set({
          embedding: JSON.stringify(vector),
          updatedAt: new Date(),
        })
        .where(eq(job_embeddings.jobId, job.id));
    }

    return db.insert(job_embeddings).values({
      jobId: job.id,
      embedding: JSON.stringify(vector),
    });
  },

  async indexAllJobs() {
    const all = await db.select().from(jobs);

    for (const job of all) {
      await jobIndexer.indexJob(job);
    }

    return all.length;
  },
};
