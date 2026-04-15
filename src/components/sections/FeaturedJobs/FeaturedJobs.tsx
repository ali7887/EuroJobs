"use client";

import JobCard from "@/components/ui/JobCard/JobCard";
import JobCard3D from "@/components/ui/JobCard/JobCard3D";

import styles from "./FeaturedJobs.module.css";
import { featuredJobs } from "./data";
import { jobFilters } from "./filtersConfig";
import { JobListing } from "./types";

export default function FeaturedJobs() {
  return (
    <section className={styles.section}>
      
      <div className={styles.canvas} id="featuredCanvas"></div>

      <div className={styles.header}>
        <h2>Featured Opportunities</h2>
        <p>Open positions from top technology companies</p>
      </div>

      <div className={styles.filters}>
        {jobFilters.map((filter) => (
          <button key={filter.id}>
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {featuredJobs.map((job: JobListing) => (
          <JobCard3D key={job.id}>
            <div className={styles.card}>
              <JobCard {...job} />
            </div>
          </JobCard3D>
        ))}
      </div>

    </section>
  );
}
