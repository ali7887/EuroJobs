import { jobRepository } from "@/lib/repositories/job.repository";
import { JobSearchQuery } from "@/lib/types/job-search";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const jobService = {
  async getEmployerJobs(userId: number) {
    return db.select().from(jobs).where(eq(jobs.employerId, userId));
  },

  async createJob(data: any) {
    return jobRepository.create(data);
  },

  async getJobs(page = 1) {
    const limit = 20;
    const offset = (page - 1) * limit;

    return jobRepository.findAll(limit, offset);
  },

  async getJob(id: number) {
    return jobRepository.findById(id);
  },

  async deleteJob(id: number) {
    return jobRepository.delete(id);
  },

  async searchJobs(query: JobSearchQuery) {
    const limit = 20;
    const offset = ((query.page ?? 1) - 1) * limit;

    return jobRepository.search(query, limit, offset);
  },
};
