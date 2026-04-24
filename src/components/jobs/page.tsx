import JobList from "@/components/jobs/JobList"
import { JobCardDTO } from "@/types/job-card"

async function getJobs(): Promise<JobCardDTO[]> {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }

  return res.json()
}

export default async function JobsPage() {

  const jobs = await getJobs()

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Job Opportunities
      </h1>

      <JobList jobs={jobs} />

    </main>
  )
}
