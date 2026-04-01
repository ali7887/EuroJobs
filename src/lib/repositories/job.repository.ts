import { db, initDB } from "@/lib/db/db";
import { Job } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

export interface JobQuery {
  search?: string;
  categoryId?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJobs {
  data: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class JobRepository {
  async findAll(query: JobQuery = {}): Promise<PaginatedJobs> {
    await initDB();
    const { search, categoryId, location, type, page = 1, limit = 10 } = query;

    let jobs = db.data!.jobs.filter((j) => j.isActive);

    if (search) {
      const q = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }
    if (categoryId) jobs = jobs.filter((j) => j.categoryId === categoryId);
    if (location) {
      const q = location.toLowerCase();
      jobs = jobs.filter((j) => j.location.toLowerCase().includes(q));
    }
    if (type) jobs = jobs.filter((j) => j.type === type);

    const total = jobs.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = jobs.slice(start, start + limit);

    return { data, total, page, limit, totalPages };
  }

  async findById(id: string): Promise<Job | undefined> {
    await initDB();
    return db.data!.jobs.find((j) => j.id === id);
  }

  async create(input: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
    await initDB();
    const now = new Date().toISOString();
    const job: Job = { id: uuidv4(), ...input, createdAt: now, updatedAt: now };
    db.data!.jobs.push(job);
    await db.write();
    return job;
  }

  async update(id: string, input: Partial<Omit<Job, "id" | "createdAt">>): Promise<Job | null> {
    await initDB();
    const idx = db.data!.jobs.findIndex((j) => j.id === id);
    if (idx === -1) return null;
    db.data!.jobs[idx] = { ...db.data!.jobs[idx], ...input, updatedAt: new Date().toISOString() };
    await db.write();
    return db.data!.jobs[idx];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const before = db.data!.jobs.length;
    db.data!.jobs = db.data!.jobs.filter((j) => j.id !== id);
    await db.write();
    return db.data!.jobs.length < before;
  }
}

export const jobRepository = new JobRepository();
