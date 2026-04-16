"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./FeaturedJobs.module.css";

import JobCard from "@/components/ui/JobCard/JobCard";
import CanvasParticles from "@/components/particles/CanvasParticles";
import { featuredJobs } from "./data";

const jobTypeFilters = [
  { label: "All Types", value: "all" },
  { label: "Full-time", value: "Full-time" },
  { label: "Contract", value: "Contract" },
  { label: "Remote", value: "Remote" },
];

const skillFilters = [
  { label: "All Skills", value: "all" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "next.js" },
  { label: "Node.js", value: "node.js" },
  { label: "TypeScript", value: "typescript" },
  { label: "CSS", value: "css" },
];

export default function FeaturedJobs() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");

  const filtered = useMemo(() => {
    return featuredJobs.filter((job) => {
      const typeOK = typeFilter === "all" || job.jobType === typeFilter;
      const skillOK =
        skillFilter === "all" ||
        job.skills.map((x) => x.toLowerCase()).includes(skillFilter);

      return typeOK && skillOK;
    });
  }, [typeFilter, skillFilter]);

  const sortedJobs = useMemo(
    () => [...filtered].sort((a, b) => b.matchScore - a.matchScore),
    [filtered]
  );

  return (
    <section className={styles.section}>
      <CanvasParticles />

      {/* Header — FINAL (single instance only) */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
       
      </motion.div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Type</span>
          {jobTypeFilters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${
                typeFilter === f.value ? styles.active : ""
              }`}
              onClick={() => setTypeFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Skills</span>
          {skillFilters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${
                skillFilter === f.value ? styles.active : ""
              }`}
              onClick={() => setSkillFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <motion.div
        className={styles.grid}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        initial="hidden"
        animate="show"
      >
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </motion.div>

      {/* CTA */}
      <div className={styles.viewAll}>
        <button className={styles.viewAllBtn}>View All Featured Jobs →</button>
      </div>
    </section>
  );
}
