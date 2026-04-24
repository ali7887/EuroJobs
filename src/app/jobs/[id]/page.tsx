import { JobDTO } from "@/lib/dto/job.dto"

async function getJob(id: string): Promise<JobDTO> {
  const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch job")
  }

  return res.json()
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  return (
    <main className="container">
      <h1>{job.title}</h1>
      <p>{job.location}</p>
      <p>{job.type}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>
    </main>
  )
}
