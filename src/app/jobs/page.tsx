import { JobDTO } from "@/lib/dto/job.dto"
import JobList from "@/components/jobs/JobList"

async function getJobs(): Promise<JobDTO[]> {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }

  return res.json()
}

export default async function JobsPage() {
  const jobs = await getJobs()

  return (
    <main className="container">
      <h1>Jobs</h1>
      <JobList jobs={jobs} />
    </main>
  )
}
