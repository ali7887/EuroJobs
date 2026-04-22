import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";

export const jobRepository = {

    async updateById(id: number, data: any) {
    await db.update(jobs).set(data).where(eq(jobs.id, id));
    return this.findById(id);
  },
  create: async (data: any) => {
    return db.insert(jobs).values(data).returning();
  },

  findAll: async (limit: number, offset: number) => {
    return db
      .select()
      .from(jobs)
      .limit(limit)
      .offset(offset);
  },

  findById: async (id: number) => {
    return db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id))
      .limit(1)
      .then(res => res[0] ?? null);
  },

  delete: async (id: number) => {
    return db.delete(jobs).where(eq(jobs.id, id));
  },

  search: async (query: any, limit: number, offset: number) => {
    return db
      .select()
      .from(jobs)
      .where(like(jobs.title, `%${query.query}%`))
      .limit(limit)
      .offset(offset);
  },
};
