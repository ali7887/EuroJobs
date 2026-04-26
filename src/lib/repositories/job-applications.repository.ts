import { db } from "@/lib/db";
import { applications, ApplicationStatus } from "@/lib/db/schema/applications";
import { eq, and } from "drizzle-orm";

export const jobApplicationsRepository = {
getById: async (
  id: string
): Promise<(typeof applications.$inferSelect) | null> => {
  const application = await db.query.applications.findFirst({
    where: eq(applications.id, id),
  });
  return application ?? null;
},


  getApplicationsByUser: async (
    userId: string
  ): Promise<(typeof applications.$inferSelect)[]> => {
    return db.query.applications.findMany({
      where: eq(applications.userId, userId),
      with: { job: true },
    });
  },

  getApplicationsByJob: async (
    jobId: string
  ): Promise<(typeof applications.$inferSelect)[]> => {
    return db.query.applications.findMany({
      where: eq(applications.jobId, jobId),
      with: {
        user: true,
        job: true,
      },
    });
  },

  create: async (
    data: typeof applications.$inferInsert
  ): Promise<(typeof applications.$inferSelect)[]> => {
    return db.insert(applications).values(data).returning();
  },

  findExisting: async (
    jobId: string,
    userId: string
  ): Promise<(typeof applications.$inferSelect)[]> => {
    return db.query.applications.findMany({
      where: and(eq(applications.jobId, jobId), eq(applications.userId, userId)),
    });
  },

  updateStatus: async (
    id: string,
    status: ApplicationStatus
  ): Promise<(typeof applications.$inferSelect)[]> => {
    return db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
  },

  delete: async (id: string): Promise<(typeof applications.$inferSelect)[]> => {
    return db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning();
  },
};
