import { FilterSection } from "./FilterSection";
import { JobCard } from "./JobCard";
import styles from "./featured-jobs.module.css";

interface FeaturedJobsProps {
  jobs: any[];
  userSkills: string[];
}

export default function FeaturedJobs({ jobs, userSkills }: FeaturedJobsProps) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Featured Opportunities</h2>

      {/* Filters */}
      <FilterSection userSkills={userSkills} />

      {/* Jobs Grid */}
      <div className={styles.jobsGrid}>
        {jobs.map((job, i) => (
          <JobCard key={i} {...job} />
        ))}
      </div>
    </div>
  );
}
