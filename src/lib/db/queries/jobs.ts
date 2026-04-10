import { db } from "../index";
import { jobs } from "../schema";
import { desc } from "drizzle-orm";

export async function getAllJobs() {
  return db.select().from(jobs).orderBy(desc(jobs.createdAt));
}

export async function createJob(data: {
  title: string;
  description?: string;
  userId: number;
}) {
  const [job] = await db.insert(jobs).values(data).returning();
  return job;
}
