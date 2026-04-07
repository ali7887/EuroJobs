// src/lib/repositories/job.repository.ts
import { db } from '@/lib/db/db';
import type { Job, Database } from '@/lib/db/schema';
import { randomUUID } from 'crypto';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationOptions {
  page: number;      // 1-based
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobFilters {
  type?: Job['type'];
  location?: string;
  companyId?: string;
  employerId?: string;
  isActive?: boolean;
  published?: boolean;
  search?: string;   // title + description full-text
}

type CreateJobInput = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateJobInput = Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>;

// ─── Repository ───────────────────────────────────────────────────────────────

export const jobRepository = {

  // ── Helpers ────────────────────────────────────────────────────────────────

  _collection(): Job[] {
    return db.data.jobs;
  },

  _matchesFilters(job: Job, filters: JobFilters): boolean {
    if (filters.type       && job.type       !== filters.type)       return false;
    if (filters.companyId  && job.companyId  !== filters.companyId)  return false;
    if (filters.employerId && job.employerId !== filters.employerId) return false;
    if (filters.isActive   !== undefined && job.isActive  !== filters.isActive)  return false;
    if (filters.published  !== undefined && job.published !== filters.published) return false;

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      if (!job.location.toLowerCase().includes(loc)) return false;
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      const inTitle = job.title.toLowerCase().includes(q);
      const inDesc  = job.description.toLowerCase().includes(q);
      if (!inTitle && !inDesc) return false;
    }

    return true;
  },

  // ── Read ───────────────────────────────────────────────────────────────────

  async findAll(
    filters: JobFilters = {},
    pagination?: PaginationOptions,
  ): Promise<PaginatedResult<Job>> {
    await db.read();

    const filtered = this._collection().filter(j => this._matchesFilters(j, filters));
    const total    = filtered.length;

    if (!pagination) {
      return { data: filtered, total, page: 1, limit: total, totalPages: 1 };
    }

    const { page, limit } = pagination;
    const start = (page - 1) * limit;
    const data  = filtered.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async findById(id: string): Promise<Job | null> {
    await db.read();
    return this._collection().find(j => j.id === id) ?? null;
  },

  async findByEmployer(employerId: string): Promise<Job[]> {
    await db.read();
    return this._collection().filter(j => j.employerId === employerId);
  },

  async findActive(pagination?: PaginationOptions): Promise<PaginatedResult<Job>> {
    return this.findAll({ isActive: true, published: true }, pagination);
  },

  // ── Write ──────────────────────────────────────────────────────────────────

  async create(input: CreateJobInput): Promise<Job> {
    await db.read();

    const now = new Date().toISOString();
    const job: Job = {
      ...input,
      id:        randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    db.data.jobs.push(job);
    await db.write();
    return job;
  },

  async update(id: string, input: UpdateJobInput): Promise<Job | null> {
    await db.read();

    const idx = db.data.jobs.findIndex(j => j.id === id);
    if (idx === -1) return null;

    const updated: Job = {
      ...db.data.jobs[idx],
      ...input,
      id,                                // id هرگز تغییر نمی‌کند
      createdAt: db.data.jobs[idx].createdAt,
      updatedAt: new Date().toISOString(),
    };

    db.data.jobs[idx] = updated;
    await db.write();
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    await db.read();

    const before = db.data.jobs.length;
    db.data.jobs = db.data.jobs.filter(j => j.id !== id);

    if (db.data.jobs.length === before) return false;

    await db.write();
    return true;
  },

  async softDelete(id: string): Promise<Job | null> {
    return this.update(id, { isActive: false, published: false });
  },
};
