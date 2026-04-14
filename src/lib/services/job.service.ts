import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema/jobs";
import { eq, and, desc } from "drizzle-orm";
import type { JobCreateInput } from "@/lib/types/job.types";
import { job_embeddings } from "@/lib/db/schema/job_embeddings";
import { generateJobEmbedding } from "@/lib/ai/generateJobEmbedding";

export const jobService = {
  // -----------------------------------------------------
  // CREATE JOB
  // -----------------------------------------------------
  async createJob(userId: string | number, data: JobCreateInput) {
    const [job] = await db
      .insert(jobs)
      .values({
        employerId: Number(userId),
        title: data.title,
        description: data.description ?? null,
        location: data.location ?? null,
        salary: data.salary ?? null,
        isRemote: data.isRemote ?? false,
        type: data.type ?? null,
        companyId: data.companyId ?? null,
      })
      .returning();

    // Generate vector embedding
    const embedding = await generateJobEmbedding(
      `${job.title} ${job.description ?? ""}`
    );

    await db.insert(job_embeddings).values({
      jobId: job.id,
      embedding: JSON.stringify(embedding),
    });

    return job;
  },

  // -----------------------------------------------------
  // GET JOB BY ID
  // -----------------------------------------------------
  async getJob(jobId: number) {
    return await db.query.jobs.findFirst({
      where: eq(jobs.id, jobId),
    });
  },

  // -----------------------------------------------------
  // GET ALL PUBLIC JOBS
  // -----------------------------------------------------
  async getJobs() {
    return await db.query.jobs.findMany({
      orderBy: desc(jobs.createdAt),
    });
  },

  // -----------------------------------------------------
  // GET EMPLOYER JOBS
  // -----------------------------------------------------
  async getEmployerJobs(userId: string | number) {
    return await db.query.jobs.findMany({
      where: eq(jobs.employerId, Number(userId)),
      orderBy: desc(jobs.createdAt),
    });
  },

  // -----------------------------------------------------
  // UPDATE JOB
  // -----------------------------------------------------
  async updateJob(jobId: number, userId: number, data: Partial<JobCreateInput>) {
    const allowed = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, jobId), eq(jobs.employerId, userId)),
    });

    if (!allowed) throw new Error("FORBIDDEN");

    const [job] = await db
      .update(jobs)
      .set({
        title: data.title ?? allowed.title,
        description: data.description ?? allowed.description,
        location: data.location ?? allowed.location,
        salary: data.salary ?? allowed.salary,
        isRemote: data.isRemote ?? allowed.isRemote,
        type: data.type ?? allowed.type,
        companyId: data.companyId ?? allowed.companyId,
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, jobId))
      .returning();

    // regenerate embedding if text changed
    if (data.title || data.description) {
      const embedding = await generateJobEmbedding(
        `${job.title} ${job.description ?? ""}`
      );

      await db
        .update(job_embeddings)
        .set({
          embedding: JSON.stringify(embedding),
          updatedAt: new Date(),
        })
        .where(eq(job_embeddings.jobId, jobId));
    }

    return job;
  },

  // -----------------------------------------------------
  // DELETE JOB
  // -----------------------------------------------------
  async deleteJob(jobId: number, userId: number) {
    const allowed = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, jobId), eq(jobs.employerId, userId)),
    });

    if (!allowed) throw new Error("FORBIDDEN");

    await db.delete(jobs).where(eq(jobs.id, jobId));
  },
};
