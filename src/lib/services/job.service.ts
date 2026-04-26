import { jobRepository } from "@/lib/repositories/job.repository";

export const jobService = {

  async create(data: any) {
    return jobRepository.create(data);
  },

  async list(limit = 10, offset = 0) {
    return jobRepository.findAll(limit, offset);
  },

  async getById(id: string) {
    return jobRepository.getById(id);
  },

  async update(id: string, data: any) {
    const job = await jobRepository.getById(id);
    if (!job) throw new Error("Job not found");
    return jobRepository.updateById(id, data);
  },

  async remove(id: string) {
    return jobRepository.delete(id);
  },

  async getJob(id: string) {
    return jobRepository.getById(id);
  },

  async updateJob(id: string, userId: string, data: any) {
    const job = await jobRepository.getById(id);
    if (!job) throw new Error("Job not found");

    if (job.employerId !== userId) throw new Error("Forbidden");

    return jobRepository.updateById(id, data);
  },

  async deleteJob(id: string, userId: string) {
    const job = await jobRepository.getById(id);
    if (!job) throw new Error("Job not found");

    if (job.employerId !== userId) throw new Error("Forbidden");

    return jobRepository.delete(id);
  },

  async getEmployerJobs(userId: string) {
    const jobs = await jobRepository.findAll(100, 0);

    return jobs.filter(
      (job: any) => job.employerId === userId
    );
  },

  async search(query: string, limit = 10, offset = 0) {
    return jobRepository.search({ query }, limit, offset);
  },
};
