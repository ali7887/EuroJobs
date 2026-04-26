import { getJobById } from "@/lib/db/queries/jobs";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await getJobById(id);

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
}
