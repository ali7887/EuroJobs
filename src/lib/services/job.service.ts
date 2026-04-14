import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema/jobs";
import { job_embeddings } from "@/lib/db/schema/job_embeddings";
import { eq } from "drizzle-orm";
import type { JobCreateInput } from "@/lib/types/job.types";
import { generateJobEmbedding } from "@/lib/ai/generateJobEmbedding";

export const jobService = {
  async createJob(userId: string, data: JobCreateInput) {
    if (!userId) throw new Error("USER_ID_REQUIRED");

    const [job] = await db
      .insert(jobs)
      .values({
        employerId: Number(userId),
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary ?? null,
        createdAt: new Date(),
      })
      .returning();

    const embedding = await generateJobEmbedding(
      `${data.title} ${data.description}`
    );

    await db.insert(job_embeddings).values({
      jobId: job.id,
      embedding: JSON.stringify(embedding),
    });

    return job;
  },

  async getEmployerJobs(userId: string) {
    return await db.query.jobs.findMany({
      where: eq(jobs.employerId, Number(userId)),
    });
  },

  async getJobs() {
    return await db.query.jobs.findMany();
  },

  async getJob(id: number) {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, id));
    return job ?? null;
  },
};
