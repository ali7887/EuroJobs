export interface JobSearchDTO {
  query?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
  mode?: "keyword" | "ai" | "hybrid";
}

export type JobSearchQuery = JobSearchDTO;
