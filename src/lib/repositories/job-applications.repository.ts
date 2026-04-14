import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export const jobApplicationsRepository = {
  create: async (data: any) => {
    return db.insert(applications).values(data).returning();
  },

  findAll: async (limit: number, offset: number) => {
    return db.select().from(applications).limit(limit).offset(offset);
  },

  findById: async (id: number) => {
    return db
      .select()
      .from(applications)
      .where(eq(applications.id, id))
      .limit(1)
      .then(r => r[0] ?? null);
  },

  delete: async (id: number) => {
    return db.delete(applications).where(eq(applications.id, id));
  },

  // === NEW METHODS (for application.service.ts) ===

  findExisting: async (jobId: number, userId: number) => {
    return db
      .select()
      .from(applications)
      .where(
        and(eq(applications.jobId, jobId), eq(applications.userId, userId))
      );
  },

  findByUser: async (userId: number) => {
    return db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId));
  },

  findByJob: async (jobId: number) => {
    return db
      .select()
      .from(applications)
      .where(eq(applications.jobId, jobId));
  },

  updateStatus: async (id: number, status: string) => {
    return db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
  },
};
