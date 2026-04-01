// src/lib/db/schema.ts

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'jobseeker' | 'employer' | 'admin';
  phone?: string;
  portfolio?: string;
  experience?: number;
  location?: string;
  bio?: string;
  
  companyId?: string;
  
  createdAt: string;
  updatedAt?: string;
};

export type Company = {
  id: string;
  name: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  location?: string;
  
  createdBy: string;
  
  createdAt: string;
  updatedAt?: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  companyId: string;
  categoryId?: string;
  
  location?: string;
  jobType?: 'full-time' | 'part-time' | 'contract' | 'remote';
  
  salaryMin?: number;
  salaryMax?: number;
  
  experienceLevel?: 'junior' | 'mid' | 'senior';
  
  tags?: string[];
  
  isActive: boolean;
  
  createdAt: string;
  updatedAt?: string;
};

export type Application = {
  id: string;
  
  jobId: string;
  userId: string;
  
  coverLetter?: string;
  resumeUrl?: string;
  
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  
  notes?: string;
  interviewDate?: string;
  
  createdAt: string;
  updatedAt?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Database = {
  users: User[];
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  categories: Category[];
};
