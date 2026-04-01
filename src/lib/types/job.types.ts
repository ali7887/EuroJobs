// src/lib/types/job.types.ts
import { Job } from '../db/schema';

export type JobQuery = {
  categoryId?: string;
  companyId?: string;
  type?: string;
  location?: string;
  search?: string;
};

export type JobCreate = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type JobListItem = Job & {
  company?: { name: string; logo: string };
};

export type JobWithCompany = Job & {
  company: { id: string; name: string; logo: string };
};
