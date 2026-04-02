// src/lib/db/schema.ts

// ─── Company ───────────────────────────────────────────────────────────────
export type Company = {
  id: string;
  name: string;
  logo: string;
  website?: string;
  // createdAt نداریم - عمداً حذف شده
};

// ─── JobEmbeddingRecord ────────────────────────────────────────────────────
export type JobEmbeddingRecord = {
  jobId: string;
  embedding: number[];
  updatedAt: string;
};
// ─── Job ───────────────────────────────────────────────────────────────────
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE';

export type Job = {
  status: string;
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  type: JobType;          // ✅ نوع اصلی
  jobType?: string;       // ✅ optional - برای فیلتر آزاد
  isActive: boolean;      // ✅ boolean نه unknown
  companyId: string;
  categoryId?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  jobEmbeddings: string;
};

// ─── Category ──────────────────────────────────────────────────────────────
export type Category = {
  id: string;
  name: string;
  slug: string;
};

// ─── User ──────────────────────────────────────────────────────────────────
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'JOBSEEKER' | 'EMPLOYER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<User, 'password'>;

// ─── Application ───────────────────────────────────────────────────────────
export type ApplicationStatus =
  | 'PENDING'
  | 'REVIEWING'
  | 'INTERVIEWED'
  | 'ACCEPTED'
  | 'REJECTED';

export type Application = {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
};


// src/lib/db/schema.ts - اضافه کردن به انتهای فایل

// ─── RefreshToken ──────────────────────────────────────────────────────────
export type RefreshToken = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
  isRevoked: boolean;
  revokedAt?: string;
};

// ─── Database (آپدیت) ──────────────────────────────────────────────────────
export type Database = {
  jobs: Job[];
  companies: Company[];
  categories: Category[];
  users: User[];
  applications: Application[];
  jobEmbeddings: JobEmbeddingRecord[];
  refreshTokens: RefreshToken[]; // ✅ اضافه شد
};
