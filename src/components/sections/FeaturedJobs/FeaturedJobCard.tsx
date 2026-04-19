import { FeaturedJob } from "@/types/job"
import Chip from "@/components/ui/Chip"
import styles from "./FeaturedJobCard.module.css"

type Props = {
  job: FeaturedJob
  userSkills: string[]
}

function getMatchColor(match: number) {

  if (match >= 90) return "#10B981"
  if (match >= 80) return "#3B82F6"
  if (match >= 70) return "#F59E0B"

  return "#6B7280"
}

export default function FeaturedJobCard({ job }: Props) {

  const salary = `$${job.salaryMin/1000}k–$${job.salaryMax/1000}k/mo`

  return (
    <div className={styles.card}>

      {/* HEADER */}

      <div className={styles.header}>

        <div className={styles.companyInfo}>

          <div className={styles.logo}>
            <img src={job.logo} alt={job.company} />
          </div>

          <div className={styles.meta}>
            <h3 className={styles.title}>{job.title}</h3>

            <p className={styles.company}>
              {job.company} • {job.workMode}
            </p>
          </div>

        </div>

        <span
          className={styles.match}
          style={{ backgroundColor: getMatchColor(job.matchScore) }}
        >
          {job.matchScore}% Match
        </span>

      </div>

      {/* SALARY */}

      <div className={styles.salary}>
        {salary}
      </div>

      {/* SKILLS */}

      <div className={styles.skills}>
        {job.skills.slice(0,4).map(skill => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>

      {/* ANALYTICS */}

      <div className={styles.stats}>

        <div className={styles.statItem}>
          <div className={styles.statValue}>{job.applicants}</div>
          <div className={styles.statLabel}>Applicants</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValue}>{job.views}</div>
          <div className={styles.statLabel}>Views</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statValue}>{job.employerReplyRate}%</div>
          <div className={styles.statLabel}>Reply</div>
        </div>

      </div>

      {/* FOOTER */}

      <div className={styles.footer}>

        <span className={styles.date}>
          {job.postedAt}
        </span>

        <button className={styles.applyButton}>
          Apply →
        </button>

      </div>

    </div>
  )
}
