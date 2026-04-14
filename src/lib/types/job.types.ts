import type { InferModel } from "drizzle-orm";
import { jobs } from "../db/schema";;

export type Job = InferModel<typeof jobs>;

export type JobQuery = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  type?: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "REMOTE";
  category?: string;
  categoryId?: string;
  companyId?: string;
};

export type JobCreate = Omit<Job, "id" | "createdAt" | "updatedAt">;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type JobListItem = Job & {
  company?: { name: string; logo: string };
};

export type JobWithCompany = Job & {
  company: { id: string; name: string; logo: string };
};
