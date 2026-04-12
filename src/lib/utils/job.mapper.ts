import { jobs } from "@/lib/db/schema/jobs"

export function mapJob(job: typeof jobs.$inferSelect) {

  return {

    id: job.id,

    title: job.title,

    description: job.description,

    companyName: job.companyName,

    location: job.location,

    salary: job.salary,

    isRemote: job.isRemote,

    createdAt: job.createdAt
  }
}
