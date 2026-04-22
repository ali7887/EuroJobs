import { jobRepository } from "@/lib/repositories/job.repository";

export const jobService = {

  async create(data: any) {
    return jobRepository.create(data);
  },

  async list(limit = 10, offset = 0) {
    return jobRepository.findAll(limit, offset);
  },

  async getById(id: number) {
    return jobRepository.findById(id);
  },

  async update(id: number, data: any) {
    const job = await jobRepository.findById(id);
    if (!job) throw new Error("Job not found");
    return jobRepository.updateById(id, data);
  },

  async remove(id: number) {
    return jobRepository.delete(id);
  },

  async getJob(id: number) {
    return jobRepository.findById(id);
  },

  async updateJob(id: number, userId: number, data: any) {
    const job = await jobRepository.findById(id);
    if (!job) throw new Error("Job not found");
    if (Number(job.employerId) !== Number(userId)) throw new Error("Forbidden");
    return jobRepository.updateById(id, data);
  },

  async deleteJob(id: number, userId: number) {
    const job = await jobRepository.findById(id);
    if (!job) throw new Error("Job not found");
    if (Number(job.employerId) !== Number(userId)) throw new Error("Forbidden");
    return jobRepository.delete(id);
  },

  async getEmployerJobs(userId: number | string) {
    const jobs = await jobRepository.findAll(100, 0);
    return jobs.filter(
      (job: any) => Number(job.employerId) === Number(userId)
    );
  },

  async search(query: string, limit = 10, offset = 0) {
    return jobRepository.search({ query }, limit, offset);
  },
};
