import { JobRepository } from '../repositories/job.repository';
import { JobQuery, JobCreate, PaginatedResponse, JobListItem } from '../types/job.types';
import { jobQuerySchema, jobCreateSchema } from '../validators/job.validator';

export class JobService {
  private repository = new JobRepository();

  async getJobs(query: unknown): Promise<PaginatedResponse<JobListItem>> {
    const validated = jobQuerySchema.parse(query);
    const { jobs, total } = await this.repository.findWithFilters(validated);

    return {
      data: jobs,
      pagination: {
        page: validated.page,
        limit: validated.limit,
        total,
        totalPages: Math.ceil(total / validated.limit),
      },
    };
  }

  async getJobById(id: string) {
    const job = await this.repository.findById(id);
    if (!job) throw new Error('Job not found');
    return job;
  }

  async createJob(data: unknown) {
    const validated = jobCreateSchema.parse(data);
    return this.repository.create(validated);
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
