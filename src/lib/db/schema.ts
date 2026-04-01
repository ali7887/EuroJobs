export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  location?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Job {
  status: string;
  salary: any;
  id: string;
  title: string;
  description: string;
  companyId: string;
  categoryId: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salaryMin?: number;
  salaryMax?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "employer" | "jobseeker";
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Database {
  jobs: Job[];
  companies: Company[];
  categories: Category[];
  users: User[];
  applications: Application[];
}
