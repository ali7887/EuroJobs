import styles from "./featured-jobs.module.css"
import { FeaturedJob } from "@/types/job";

interface Props {
  job: FeaturedJob
}

export default function JobCard({ job }: Props) {

  const {
    title,
    company,
    location,
    logo,
    employmentType,
    workMode,
    salaryMin,
    salaryMax,
    matchScore,
    skills,
    applicants,
    views,
    employerReplyRate
  } = job

  const minSalary = Math.round(salaryMin / 1000)
  const maxSalary = Math.round(salaryMax / 1000)

  return (
    <div className={styles.card}>

      {/* header */}
      <div className={styles.cardHeader}>

        <img
          src={logo}
          alt={company}
          className={styles.companyLogo}
        />

        <div className={styles.headerInfo}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.companyMeta}>
            <span>{company}</span>
            <span className={styles.dot}>•</span>
            <span>{location}</span>
          </div>
        </div>

        <div className={styles.matchBadge}>
          {matchScore}% Match
        </div>

      </div>

      {/* salary */}
      <div className={styles.salary}>
        ${minSalary}k – ${maxSalary}k / mo
      </div>

      {/* tags */}
      <div className={styles.tags}>
        <span className={styles.tag}>{employmentType}</span>
        <span className={styles.tag}>{workMode}</span>
      </div>

      {/* skills */}
      <div className={styles.skills}>
        {skills.slice(0, 4).map(skill => (
          <span key={skill} className={styles.skill}>
            {skill}
          </span>
        ))}

        {skills.length > 4 && (
          <span className={styles.moreSkills}>
            +{skills.length - 4}
          </span>
        )}
      </div>

      {/* stats */}
      <div className={styles.stats}>
        <span>{applicants} applicants</span>
        <span>{views} views</span>
        <span>{employerReplyRate}% reply</span>
      </div>

      {/* footer */}
      <div className={styles.cardFooter}>
        <button className={styles.applyBtn}>
          Apply Now
        </button>
      </div>

    </div>
  )
}
