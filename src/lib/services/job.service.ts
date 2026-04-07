import { getDb, saveDb } from "@/infrastructure/lowdb.client";
import type { Job, JobType } from "@/lib/db/schema";
import { randomUUID } from "crypto";

type CreateJobInput = {
  title: string;
  description: string;
  companyId?: string;
  company?: string;
  location: string;
  salary?:
    | string
    | {
        min: number;
        max: number;
        currency: string;
      };
  skills?: string[];
  type: JobType | "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT";
};

type GetJobsParams = {
  search?: string;
  categoryId?: string;
  location?: string;
  type?: string;
  page: number;
  limit: number;
};

function normalizeJobType(type: CreateJobInput["type"]): JobType {
  const map: Record<string, JobType> = {
    FULL_TIME: "full-time",
    PART_TIME: "part-time",
    REMOTE: "remote",
    CONTRACT: "contract",
  };

  return (map[type] ?? type) as JobType;
}

function parseSalary(
  salary: CreateJobInput["salary"]
): Job["salary"] {
  if (!salary) return undefined;

  if (typeof salary === "string") {
    return undefined;
  }

  return salary;
}

export class JobService {

  static async getJobs({
    search,
    location,
    type,
    page,
    limit,
  }: GetJobsParams) {

    const db = await getDb();

    let jobs = [...db.data!.jobs];

    /**
     * search
     */
    if (search) {
      const q = search.toLowerCase();

      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      );
    }

    /**
     * location filter
     */
    if (location) {
      jobs = jobs.filter((j) => j.location === location);
    }

    /**
     * type filter
     */
    if (type) {
      jobs = jobs.filter((j) => j.type === type);
    }

    /**
     * only active jobs
     */
    jobs = jobs.filter((j) => j.isActive && j.published);

    /**
     * newest first
     */
    jobs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = jobs.slice(start, end);

    return {
      total: jobs.length,
      page,
      limit,
      data: paginated,
    };
  }

  static async createJob(
    data: CreateJobInput,
    employerId: string,
    companyName: string
  ): Promise<Job> {

    const db = await getDb();

    const now = new Date().toISOString();

    const job: Job = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      company: companyName,
      companyId: data.companyId,
      employerId,
      type: normalizeJobType(data.type),
      location: data.location,
      salary: parseSalary(data.salary),
      skills: data.skills ?? [],
      isActive: true,
      published: true,
      createdAt: now,
      updatedAt: now,
    };

    db.data!.jobs.push(job);

    await saveDb();

    return job;
  }
}
