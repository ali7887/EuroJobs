import { db } from '@/lib/db';
import { jobs } from '@/lib/db/schema';
import { eq, inArray, desc } from 'drizzle-orm';
import type { Job, NewJob } from '@/lib/db/schema';

export const jobRepository = {
  async findById(id: number): Promise<Job | null> {
    const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    return rows[0] ?? null;
  },

  async findMany(ids: number[]): Promise<Job[]> {
    if (ids.length === 0) return [];
    return db.select().from(jobs).where(inArray(jobs.id, ids));
  },

  async findAll(): Promise<Job[]> {
    return db.select().from(jobs).orderBy(desc(jobs.createdAt));
  },

  async create(data: NewJob): Promise<Job> {
    const now = new Date();
    const inserted = await db.insert(jobs).values({
      ...data,
      createdAt: now,
      updatedAt: now,
    }).returning();
    return inserted[0];
  },

  async update(id: number, data: Partial<Job>): Promise<Job | null> {
    const now = new Date();
    const updated = await db
      .update(jobs)
      .set({ ...data, updatedAt: now })
      .where(eq(jobs.id, id))
      .returning();
    return updated[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const deleted = await db.delete(jobs).where(eq(jobs.id, id)).returning();
    return deleted.length > 0;
  }
};
