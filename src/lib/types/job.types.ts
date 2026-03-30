import { Job, Company } from '../db/schema';

export type JobWithCompany = Job & {
  company: Company;
};

export type JobListItem = Pick<Job, 'id' | 'title' | 'location' | 'salary' | 'type' | 'createdAt'> & {
  company: Pick<Company, 'id' | 'name' | 'logo'>;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
