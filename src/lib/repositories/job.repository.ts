import { and, ilike, gte, lte, eq } from "drizzle-orm";
import { jobs, Job, NewJob } from "@/lib/db/schema/jobs";
import { companies } from "@/lib/db/schema/companies";
import { db } from "@/lib/db/db";

export const jobRepository = {
  async create(data: NewJob): Promise<Job> {
    const result = await db.insert(jobs).values(data).returning();
    return result[0];
  },

  async findAll(limit = 20, offset = 0): Promise<
    Array<Job & { companyName: string | null }>
  > {
    return db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        location: jobs.location,
        salary: jobs.salary,
        isRemote: jobs.isRemote,
        type: jobs.type,
        isActive: jobs.isActive,
        published: jobs.published,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        employerId: jobs.employerId,
        companyName: companies.name,
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .limit(limit)
      .offset(offset);
  },

  async findById(id: number): Promise<
    (Job & { companyName: string | null }) | undefined
  > {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        location: jobs.location,
        salary: jobs.salary,
        isRemote: jobs.isRemote,
        type: jobs.type,
        isActive: jobs.isActive,
        published: jobs.published,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        employerId: jobs.employerId,
        companyName: companies.name,
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.id, id));

    return result[0];
  },

  async findByEmployer(userId: number) {
    const rows = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        location: jobs.location,
        salary: jobs.salary,
        isRemote: jobs.isRemote,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        employerId: jobs.employerId,
        companyName: companies.name,
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.employerId, userId));

    return rows;
  },

  async delete(id: number): Promise<Job | undefined> {
    const result = await db.delete(jobs).where(eq(jobs.id, id)).returning();
    return result[0];
  },

  async search(filters: any, limit = 20, offset = 0) {
    const conditions = [];

    if (filters.search) {
      conditions.push(ilike(jobs.title, `%${filters.search}%`));
    }

    if (filters.location) {
      conditions.push(ilike(jobs.location, `%${filters.location}%`));
    }

    if (filters.salaryMin) {
      conditions.push(gte(jobs.salary, filters.salaryMin));
    }

    if (filters.salaryMax) {
      conditions.push(lte(jobs.salary, filters.salaryMax));
    }

    const baseQuery = db
      .select({
        id: jobs.id,
        title: jobs.title,
        description: jobs.description,
        location: jobs.location,
        salary: jobs.salary,
        isRemote: jobs.isRemote,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        companyId: jobs.companyId,
        employerId: jobs.employerId,
        companyName: companies.name,
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .limit(limit)
      .offset(offset);

    return conditions.length
      ? baseQuery.where(and(...conditions))
      : baseQuery;
  },
};
