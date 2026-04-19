import { FeaturedJob } from "../../../../types/job"
import Chip from "@/components/ui/Chip"
import styles from "./JobCard.module.css"

type Props = {
  job: FeaturedJob
}

export default function JobCard({ job }: Props) {

  const salary = `$${job.salaryMin/1000}k–$${job.salaryMax/1000}k/mo`

  return (
    <div className={styles.card}>

      <div className={styles.header}>

        <img
          src={job.logo}
          alt={job.company}
          className={styles.logo}
        />

        <div className={styles.info}>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>

      </div>

      <div className={styles.salary}>
        {salary}
      </div>

      <div className={styles.skills}>
        {job.skills.map(skill => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>

      <button className={styles.apply}>
        Apply →
      </button>

    </div>
  )
}
