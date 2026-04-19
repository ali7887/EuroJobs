import { FeaturedJob } from "@/types/job"
import FeaturedJobCard from "../../FeaturedJobs/FeaturedJobCard"
import styles from "./jobs-grid.module.css"

type Props = {
  jobs: FeaturedJob[]
  userSkills: string[]
}

export default function JobsGrid({ jobs, userSkills }: Props) {
  return (
    <div className={styles.grid}>
      {jobs.map((job) => (
        <FeaturedJobCard
          key={job.id}
          job={job}
          userSkills={userSkills}
        />
      ))}
    </div>
  )
}
