import Link from "next/link"
import styles from "./job-card.module.css"
import { JobCardDTO } from "@/types/job-card"


interface Props {
  job: JobCardDTO
}

export default function JobCard({ job }: Props) {

  return (
    <div className={styles.card}>

      <h3 className={styles.title}>
        <Link href={`/jobs/${job.id}`}>
          {job.title}
        </Link>
      </h3>

      <div className={styles.meta}>

        {job.location && (
          <span className={styles.location}>
            {job.location}
          </span>
        )}

        {job.type && (
          <span className={styles.type}>
            {job.type}
          </span>
        )}

      </div>

      {job.salary && (
        <div className={styles.salary}>
          ${job.salary}
        </div>
      )}

    </div>
  )
}
