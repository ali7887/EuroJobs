import { jobRepository } from '../repositories/job.repository';
import type { Job, NewJob } from '@/lib/db/schema';
import { mapJobType } from '@/lib/utils/job.utils';

export const jobService = {
  async getJob(id: number) {
    return jobRepository.findById(id);
  },

  async listJobs() {
    return jobRepository.findAll();
  },

  async createJob(data: NewJob, employerId: any, companyName: any) {
    // normalized values
    const normalized = {
      ...data,
      type: data.type ?? 'Full-time',
      location: data.location ?? 'Unknown',
    };
    return jobRepository.create(normalized);
  },

  async updateJob(id: number, data: Partial<Job>) {
    return jobRepository.update(id, data);
  },

  async deleteJob(id: number) {
    return jobRepository.delete(id);
  }
};
