import JobsGrid from "./JobsGrid/JobsGrid"
import { FeaturedJob } from "@/types/job"
import styles from "./featured-jobs.module.css"

type Props = {
  jobs: FeaturedJob[]
  userSkills: string[]
}


export default function FeaturedJobs({ jobs, userSkills }: Props) {
  return (
    <section className={styles.section}>

      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>
            FEATURED JOB OPPORTUNITIES
          </h2>

          <p className={styles.subtitle}>
            Curated opportunities matching your skills
          </p>
        </div>

        <JobsGrid jobs={jobs} userSkills={userSkills} />

      </div>

    </section>
  )
}
