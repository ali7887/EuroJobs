import { db } from "@/lib/db";
import { applications, ApplicationStatus } from "@/lib/db/schema/applications";
import { eq, and } from "drizzle-orm";

export const jobApplicationsRepository = {
  findById: async (id: number) => {
    return db.query.applications.findFirst({
      where: eq(applications.id, id),
    });
  },

  getApplicationsByUser: async (userId: number) => {
    return db.query.applications.findMany({
      where: eq(applications.userId, userId),
      with: { job: true },
    });
  },

  create: async (data: typeof applications.$inferInsert) => {
    return db.insert(applications).values(data).returning();
  },

  findExisting: async (jobId: number, userId: number) => {
    return db.query.applications.findMany({
      where: and(
        eq(applications.jobId, jobId),
        eq(applications.userId, userId)
      ),
    });
  },

  updateStatus: async (id: number, status: ApplicationStatus) => {
    return db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning();
  },
};
