import { db } from "@/lib/db/db";
import { applications } from "@/lib/db/schema/applications"; // مسیر درست
import { eq, and } from "drizzle-orm";

export const applicationRepository = {
  async create(data: any) {
    return db.insert(applications).values(data).returning();
  },

  async findById(id: number) {
    const rows = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id));
    return rows[0] || null;
  },

  async findByUser(userId: number) {
    return db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId));
  },

  async findByJob(jobId: number) {
    return db
      .select()
      .from(applications)
      .where(eq(applications.jobId, jobId));
  },

  async findExisting(jobId: number, userId: number) {
    return db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.jobId, jobId),
          eq(applications.userId, userId)
        )
      );
  },

  async updateStatus(id: number, status: string) {
    return db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
  },

  async delete(id: number) {
    return db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning();
  },
};
