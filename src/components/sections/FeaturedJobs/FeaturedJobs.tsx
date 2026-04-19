"use client";

import { useState, useMemo } from "react";
import JobsGrid from "./JobsGrid/JobsGrid";
import FilterSection from "./FilterSection";
import { FeaturedJob } from "@/types/job";
import styles from "./featured-jobs.module.css";

type Props = {
  jobs: FeaturedJob[];
  userSkills: string[];
};

export default function FeaturedJobs({ jobs, userSkills }: Props) {

  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 20000]);

 const filteredJobs = useMemo(() => {
  return jobs.filter((job) => {

    if (
      selectedJobTypes.length > 0 &&
      !selectedJobTypes
        .map(t => t.toLowerCase())
        .includes(job.employmentType.toLowerCase())
    ) {
      return false;
    }

    if (
      selectedModes.length > 0 &&
      !selectedModes
        .map(m => m.toLowerCase())
        .includes(job.workMode.toLowerCase())
    ) {
      return false;
    }

    if (
      selectedSkills.length > 0 &&
      !selectedSkills.every(skill =>
        job.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      )
    ) {
      return false;
    }

    if (
      job.salaryMax < salaryRange[0] ||
      job.salaryMin > salaryRange[1]
    ) {
      return false;
    }

    return true;
  });
}, [jobs, selectedJobTypes, selectedModes, selectedSkills, salaryRange]);

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

        <FilterSection
          selectedJobTypes={selectedJobTypes}
          setSelectedJobTypes={setSelectedJobTypes}
          selectedModes={selectedModes}
          setSelectedModes={setSelectedModes}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
        />

        <JobsGrid jobs={filteredJobs} userSkills={userSkills} />

      </div>
    </section>
  );
}
