import { getEmbedding, cosineSimilarity } from "@/app/api/ai/embeddings";
import { db } from "@/lib/db/db";
import { jobs, job_embeddings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const aiSearchService = {
  async search(query: string) {
    const queryEmbedding = await getEmbedding(query);

    const rows = await db
      .select({
        job: jobs,
        embedding: job_embeddings.embedding,
      })
      .from(jobs)
      .leftJoin(job_embeddings, eq(job_embeddings.jobId, jobs.id));

    // فیلتر فقط ردیف‌هایی که embedding دارند
    const valid = rows.filter((r) => r.embedding != null);

    const scored = valid.map((r) => {
      const vector = JSON.parse(r.embedding as string);

      return {
        ...r.job,
        score: cosineSimilarity(queryEmbedding, vector),
      };
    });

    return scored.sort((a, b) => b.score - a.score);
  },
};
