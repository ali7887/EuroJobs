// =======================
// Enums / Literal Types
// =======================

export type JobType =
  | "full-time"
  | "part-time"
  | "remote"
  | "contract"

export type UserRole =
  | "admin"
  | "employer"
  | "jobseeker"

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "accepted"
  | "rejected"

// =======================
// Core Models
// =======================

export interface User {
  id: string
  email: string
  passwordHash: string
  name: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  provider: string
}

export type SafeUser = Omit<User, "passwordHash">

export interface Company {
  id: string
  name: string
  description?: string
  logoUrl?: string
  website?: string
  location?: string
  ownerId: string
  createdAt: string
  updatedAt: string
}

export interface JobSalary {
  min: number
  max: number
  currency: string
}

export interface Job {
  id: string
  title: string
  description: string

  company: string
  companyId?: string
  employerId: string

  type: JobType
  location: string

  salary?: JobSalary

  skills: string[]

  isActive: boolean
  published: boolean

  aiScore?: number

  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  jobId: string
  userId: string

  status: ApplicationStatus

  resumePath?: string
  coverLetter?: string

  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface JobEmbeddingRecord {
  id: string
  jobId: string
  embedding: number[]
  updatedAt: string
}

// =======================
// Auth / Session Models
// =======================

export interface Session {
  id: string
  userId: string
  tokenHash: string
  createdAt: string
  expiresAt: string
}

export interface StoredRefreshToken {
  id: string
  userId: string
  tokenHash: string
  expiresAt: string
  createdAt: string
  isRevoked: boolean
  revokedAt?: string
  replacedByTokenId?: string
}

// =======================
// Database Root
// =======================

export interface Database {
  users: User[]
  jobs: Job[]
  companies: Company[]
  applications: Application[]
  categories: Category[]
  jobEmbeddings: JobEmbeddingRecord[]

  sessions: Session[]
  refreshTokens: StoredRefreshToken[]
}

// =======================
// Default Data
// =======================

export const defaultData: Database = {
  users: [],
  jobs: [],
  companies: [],
  applications: [],
  categories: [],
  jobEmbeddings: [],
  refreshTokens: [],
  sessions: [],
}
