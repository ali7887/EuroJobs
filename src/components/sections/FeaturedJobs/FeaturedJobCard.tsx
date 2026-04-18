import styles from "./FeaturedJobCard.module.css";
import { FeaturedJob, UserSkill } from "./job";

type Props = {
  job: FeaturedJob;
  userSkills: UserSkill[];
};

export default function FeaturedJobCard({ job, userSkills }: Props) {
  const skillIsMatch = (skill: string) => userSkills.includes(skill);

  const matchClass =
    job.matchScore >= 90
      ? styles.matchHigh
      : job.matchScore >= 75
      ? styles.matchMid
      : styles.matchLow;

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
            <div className={styles.company}>{job.company}</div>
            <div className={styles.location}>{job.location}</div>
          </div>
        </div>

        <div className={styles.badges}>
          <span className={`${styles.matchScore} ${matchClass}`}>
            {job.matchScore}% Match
          </span>

          {job.trending && (
            <span className={styles.urgentBadge}>Trending</span>
          )}
        </div>
      </div>

      <div className={styles.divider} />

      {/* SKILLS */}
      <div className={styles.skillsContainer}>
        {job.skills.map((skill) => (
          <span
            key={skill}
            className={
              skillIsMatch(skill)
                ? styles.skillMatch
                : styles.skillLow
            }
          >
            {skill}
          </span>
        ))}
      </div>

      {/* ANALYTICS */}
      <div className={styles.analytics}>
        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Applicants</span>
          <span className={styles.metricValue}>{job.applicants}</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Views</span>
          <span className={styles.metricValue}>{job.views}</span>
        </div>

        <div className={styles.metricItem}>
          <span className={styles.metricLabel}>Reply Rate</span>
          <span className={styles.metricValue}>
            {job.employerReplyRate}%
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        className={`${styles.cta} ${styles.ctaDefault}`}
      >
        Apply Before It's Gone
      </button>

      {/* FOOTER */}
      <div className={styles.footer}>
        <span className={styles.postedAt}>Posted {job.postedAt}</span>
        <span className={styles.companySize}>{job.salaryMin / 1000}–{job.salaryMax / 1000}k</span>
      </div>
    </div>
  );
}
