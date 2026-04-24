import { getJobById } from "@/lib/db/queries/jobs";
import styles from "./job-details.module.css";
import { ApplyForm } from "@/components/jobs/ApplyForm";

interface JobDetailsPageProps {
  params: { id: string };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await getJobById(params.id);

  if (!job) {
    return <div className={styles.notFound}>Job not found</div>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{job.title}</h1>
      <p className={styles.location}>{job.location}</p>
      <p className={styles.type}>{job.type}</p>

      <div className={styles.section}>
        <h2>Description</h2>
        <p>{job.description}</p>
      </div>

      <div className={styles.section}>
        <h2>Salary</h2>
        <p>{job.salary}</p>
      </div>

      <ApplyForm jobId={job.id} />
    </main>
  );
}
