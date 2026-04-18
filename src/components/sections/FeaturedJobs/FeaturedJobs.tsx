"use client";

import { useMemo, useState } from "react";
import styles from "./FeaturedJobs.module.css";

import FilterBar, { FilterState } from "./FilterBar";
import FeaturedJobCard from "./FeaturedJobCard";

// ✔ فقط از این استفاده کن
import { FeaturedJob, UserSkill } from "./job";

type Props = {
  jobs: FeaturedJob[];
  userSkills: UserSkill[];
};

export default function FeaturedJobs({ jobs, userSkills }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    location: [],
    salary: [],
    skills: [],
    customSalaryMin: undefined,
    customSalaryMax: undefined,
  });

  const filteredJobs = useMemo(() => {
    if (!jobs) return []; // ✔ حتماً چک کن
    return jobs.filter((job) => {
      if (filters.type.length > 0 && !filters.type.includes(job.type))
        return false;

      if (filters.location.length > 0 && !filters.location.includes(job.workMode))
        return false;

      if (filters.skills.length > 0 && !filters.skills.some((s) => job.skills.includes(s)))
        return false;

      if (filters.salary.includes("custom")) {
        const min = filters.customSalaryMin ?? 0;
        const max = filters.customSalaryMax ?? 999;

        const jobMin = job.salaryMin / 1000;
        const jobMax = job.salaryMax / 1000;

        if (jobMax < min || jobMin > max) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2 className={styles.heading}>Featured Opportunities</h2>
        <p className={styles.subheading}>Hand‑picked roles at high‑growth companies</p>

        <FilterBar filters={filters} onChange={setFilters} />

        <div className={styles.grid}>
          {filteredJobs.map((job) => (
            <FeaturedJobCard key={job.id} job={job} userSkills={userSkills} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className={styles.empty}>No jobs match your filters.</div>
        )}

      </div>
    </section>
  );
}
