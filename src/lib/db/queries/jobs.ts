import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema/jobs";
import { eq, ilike, and } from "drizzle-orm";

export async function createJob(data: {
  title: string;
  description?: string;
  location?: string;
  salary?: number;
  type?: string;
  companyId?: string;
  employerId: string; // UUID
}) {
  const [job] = await db.insert(jobs).values(data).returning();
  return job;
}

export async function getJobById(id: string) {
  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, id));
  return job;
}

export async function getJobs(params: {
  search?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const offset = (page - 1) * limit;

  const where = [];

  if (params.search) {
    where.push(ilike(jobs.title, `%${params.search}%`));
  }

  if (params.location) {
    where.push(eq(jobs.location, params.location));
  }

  if (params.type) {
    where.push(eq(jobs.type, params.type));
  }

  const rows = await db
    .select()
    .from(jobs)
    .where(where.length ? and(...where) : undefined)
    .limit(limit)
    .offset(offset);

  return rows;
}

export async function updateJob(
  id: string,
  data: Partial<typeof jobs.$inferInsert>,
) {
  const [updated] = await db
    .update(jobs)
    .set(data)
    .where(eq(jobs.id, id))
    .returning();

  return updated;
}
