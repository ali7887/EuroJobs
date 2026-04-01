import { jobRepository, JobQuery, PaginatedJobs } from "@/lib/repositories/job.repository";
import { companyRepository } from "@/lib/repositories/company.repository";
import { Job } from "@/lib/db/schema";

export interface JobListItem extends Job {
  companyName: string;
  companyLogo?: string;
}

export interface PaginatedJobListItems {
  data: JobListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class JobService {
  async getJobs(query: JobQuery = {}): Promise<PaginatedJobListItems> {
    const result: PaginatedJobs = await jobRepository.findAll(query);
    const companies = await companyRepository.findAll();

    const data: JobListItem[] = result.data.map((job) => {
      const company = companies.find((c) => c.id === job.companyId);
      return {
        ...job,
        companyName: company?.name ?? "Unknown",
        companyLogo: company?.logoUrl,
      };
    });

    return { ...result, data };
  }

  async getJobById(id: string): Promise<JobListItem | null> {
    const job = await jobRepository.findById(id);
    if (!job) return null;
    const company = await companyRepository.findById(job.companyId);
    return { ...job, companyName: company?.name ?? "Unknown", companyLogo: company?.logoUrl };
  }

  async createJob(input: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
    return jobRepository.create(input);
  }

  async updateJob(id: string, input: Partial<Omit<Job, "id" | "createdAt">>): Promise<Job | null> {
    return jobRepository.update(id, input);
  }

  async deleteJob(id: string): Promise<boolean> {
    return jobRepository.delete(id);
  }
}

export const jobService = new JobService();
