import { db, initDB } from '../db/db';
import { Job } from '../db/schema';
import { JobQuery, JobWithCompany } from '../types/job.types';
import { randomUUID } from 'crypto';

export class JobRepository {
  async findWithFilters(query: JobQuery) {
    await initDB();
    
    let filtered = db.data.jobs.filter(job => job.published);

    if (query.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search)
      );
    }

    if (query.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(query.location!.toLowerCase())
      );
    }

    if (query.type) {
      filtered = filtered.filter(job => job.type === query.type);
    }

    if (query.category) {
      filtered = filtered.filter(job => job.categoryId === query.category);
    }

    const total = filtered.length;
    const start = (query.page - 1) * query.limit;
    const jobs = filtered.slice(start, start + query.limit);

    const jobsWithCompany = jobs.map(job => ({
      ...job,
      company: db.data.companies.find(c => c.id === job.companyId)!,
    }));

    return { jobs: jobsWithCompany, total };
  }

  async findById(id: string): Promise<JobWithCompany | null> {
    await initDB();
    const job = db.data.jobs.find(j => j.id === id);
    if (!job) return null;

    const company = db.data.companies.find(c => c.id === job.companyId);
    return { ...job, company: company! };
  }

  async create(data: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'published'>): Promise<Job> {
    await initDB();
    
    const job: Job = {
      ...data,
      id: randomUUID(),
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.data.jobs.push(job);
    await db.write();
    return job;
  }

  async update(id: string, data: Partial<Job>): Promise<Job | null> {
    await initDB();
    
    const index = db.data.jobs.findIndex(j => j.id === id);
    if (index === -1) return null;

    db.data.jobs[index] = {
      ...db.data.jobs[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.write();
    return db.data.jobs[index];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    
    const index = db.data.jobs.findIndex(j => j.id === id);
    if (index === -1) return false;

    db.data.jobs.splice(index, 1);
    await db.write();
    return true;
  }
}
