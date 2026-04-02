export type Company = {
  id: string;
  name: string;
  logo: string;
  website?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  location?: string;
  salary?: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE';
  companyId: string;
  categoryId?: string;
  published: boolean;
  isActive: boolean;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'EMPLOYER' | 'ADMIN';
  passwordHash?: string;
  createdAt: string;
  updatedAt: string;
};

export type Application = {
  id: string;
  jobId: string;
  userId: string;
  coverLetter?: string;
  resumeUrl?: string;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
};

export type Database = {
  jobs: Job[];
  companies: Company[];
  categories: Category[];
  users: User[];
  applications: Application[];
};
