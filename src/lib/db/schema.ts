// src/lib/db/schema.ts

// ─── Enums ───────────────────────────────────────────────────────────────────

export type JobType = 'full-time' | 'part-time' | 'remote' | 'contract';
export type UserRole = 'admin' | 'employer' | 'jobseeker';
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

// ─── Core Models ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;   // ISO 8601
  updatedAt: string;
}

/** User بدون فیلدهای حساس — برای ارسال به client */
export type SafeUser = Omit<User, 'passwordHash'>;

export interface Company {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  location?: string;
  ownerId: string;     // ref → User.id
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;     // display name (denormalized)
  companyId?: string;  // ref → Company.id
  employerId: string;  // ref → User.id
  type: JobType;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;  // e.g. 'USD', 'IRR'
  };
  skills: string[];
  isActive: boolean;
  published: boolean;
  aiScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;       // ref → Job.id
  userId: string;      // ref → User.id
  status: ApplicationStatus;
  resumePath?: string;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface JobEmbeddingRecord {
  id: string;          // ← ضروری برای LowDBCollectionOperations<T extends { id: string }>
  jobId: string;
  embedding: number[];
  updatedAt: string;
}

export interface StoredRefreshToken {
  isRevoked: any;
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  revokedAt?: string;
  replacedByTokenId?: string;
}

// ─── Database Root ────────────────────────────────────────────────────────────

export interface Database {
  users: User[];
  jobs: Job[];
  companies: Company[];
  applications: Application[];
  categories: Category[];
  jobEmbeddings: JobEmbeddingRecord[];
  refreshTokens: StoredRefreshToken[];
}

export const defaultData: Database = {
  users: [],
  jobs: [],
  companies: [],
  applications: [],
  categories: [],
  jobEmbeddings: [],
  refreshTokens: [],
};
