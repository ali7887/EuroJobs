import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema/jobs";
import { eq, ilike, and, sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";

type JobLevel = "intern" | "junior" | "mid" | "senior" | "lead";

export async function getJobsPaginated({
  search,
  location,
  type,
  remote,
  level,
  page = 1,
  limit = 10,
}: {
  search?: string;
  location?: string;
  type?: string;
  remote?: string;
  level?: JobLevel;
  page?: number;
  limit?: number;
}) {
  const offset = (page - 1) * limit;

  const conditions: SQL[] = [];

  if (search) {
    conditions.push(ilike(jobs.title, `%${search}%`));
  }

  if (location) {
    conditions.push(eq(jobs.location, location));
  }

  if (type) {
    conditions.push(eq(jobs.type, type));
  }

  if (remote) {
    conditions.push(eq(jobs.isRemote, remote === "true"));
  }

  if (level) {
    conditions.push(eq(jobs.level, level));
  }

  const items = await db
    .select()
    .from(jobs)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  const [totalRow] = await db
    .select({ count: sql<number>`count(*)` })
    .from(jobs)
    .where(conditions.length ? and(...conditions) : undefined);

  return {
    items,
    total: Number(totalRow.count),
    page,
    limit,
    totalPages: Math.ceil(Number(totalRow.count) / limit),
  };
}

export async function getJobById(id: string) {
  const job = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, id))
    .limit(1);

  return job[0] ?? null;
}
