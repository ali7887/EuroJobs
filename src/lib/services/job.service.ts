// src/lib/services/job.service.ts
import { JobRepository } from '../repositories/job.repository';
import { PaginatedResponse, JobListItem } from '../types/job.types';
import { jobQuerySchema, jobCreateSchema } from '../validators/job.validator';

export class JobService {
  private repository = new JobRepository();

  async getJobs(query: unknown): Promise<PaginatedResponse<JobListItem>> {
    const validated = jobQuerySchema.parse(query);
    
    // ✅ findAll نه findById
    const result = await this.repository.findAll({
      search: validated.search,
      location: validated.location,
      jobType: validated.type,
      categoryId: validated.category,
      page: validated.page,
      limit: validated.limit,
    });

    // ✅ ساختار مستقیم بدون 'pagination'
    return {
      data: result.data as JobListItem[],
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getJobById(id: string) {
    const job = await this.repository.findById(id);
    if (!job) throw new Error('Job not found');
    return job;
  }

  async createJob(data: unknown) {
    const validated = jobCreateSchema.parse(data);
    
    return this.repository.create({
      ...validated,
      published: validated.published ?? false,
      isActive: validated.isActive ?? true,
      jobType: validated.jobType ?? validated.type,
      status: '',
      jobEmbeddings: ''
    });
  }

  async updateJob(id: string, data: unknown) {
    const validated = jobCreateSchema.partial().parse(data);
    const updated = await this.repository.update(id, validated);
    if (!updated) throw new Error('Job not found');
    return updated;
  }

  async deleteJob(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error('Job not found');
    return { success: true };
  }
}

export const jobService = new JobService();
