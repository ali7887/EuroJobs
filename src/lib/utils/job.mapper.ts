import { jobs } from "@/lib/db/schema/jobs"

export function mapJob(job: typeof jobs.$inferSelect) {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary,
    isRemote: job.isRemote,
    createdAt: job.createdAt,

    // computed fields
    postedAt: job.createdAt,
    type: job.type ?? "Full-time",
  }
}
