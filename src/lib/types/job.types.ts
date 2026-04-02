// src/lib/types/job.types.ts
import { Job } from '../db/schema';

export type JobQuery = {
  page?: number;       // ✅ اضافه شد
  limit?: number;      // ✅ اضافه شد
  search?: string;
  location?: string;
  type?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE';
  category?: string;
  categoryId?: string;
  companyId?: string;
};

export type JobCreate = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

// ✅ totalPages اضافه شد
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;  // ✅ این فیلد مفقود بود!
};

export type JobListItem = Job & {
  company?: { name: string; logo: string };
};

export type JobWithCompany = Job & {
  company: { id: string; name: string; logo: string };
};

