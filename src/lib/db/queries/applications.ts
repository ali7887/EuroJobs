import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema/applications";
import { eq } from "drizzle-orm";

export async function applyToJob(data: {
  jobId: number;
  userId: number;
  resumePath?: string;
  coverLetter?: string;
}) {
  const [app] = await db.insert(applications).values(data).returning();
  return app;
}

export async function getApplicationsByUser(userId: number) {
  return db.select().from(applications).where(eq(applications.userId, userId));
}

export async function getApplicationsForEmployer(jobId: number) {
  return db.select().from(applications).where(eq(applications.jobId, jobId));
}

export async function updateApplicationStatus(id: number, status: string) {
  const [updated] = await db
    .update(applications)
    .set({ status })
    .where(eq(applications.id, id))
    .returning();

  return updated;
}
