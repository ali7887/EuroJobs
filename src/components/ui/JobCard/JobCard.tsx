"use client";

import { motion } from "framer-motion";
import styles from "./JobCard.module.css";
import { JobListing } from "@/types/JobListing";
import { generateColor } from "../../../../src/lib/utils/avatarColor";  // updated
import { BookmarkIcon } from "@/components/icons/BookmarkIcon";

import { Users, Eye, Target } from "lucide-react";

export default function JobCard({ job }: { job: JobListing }) {
  const avatarBg = generateColor(job.company);

  // badge logic ↓ max 2
  const badges = [];
  if (job.isFeatured) badges.push("FEATURED");
  if (job.isNew) badges.push("NEW");
  if (job.matchScore >= 85) badges.push("TOP MATCH");
  const visibleBadges = badges.slice(0, 2);

  return (
    <motion.div
      className={styles.card}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <button className={styles.saveBtn}>
        <BookmarkIcon />
      </button>

      <div className={styles.badges}>
        {visibleBadges.map((b) => (
          <span key={b} className={styles.badge}>{b}</span>
        ))}
      </div>

      <div className={styles.header}>
        <div className={styles.avatar} style={{ background: avatarBg }}>
          {job.company[0]}
        </div>

        <div>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>
      </div>

      <p className={styles.salary}>{job.salary}</p>

      <div className={styles.locationRow}>
        📍 {job.location} · {job.jobType}
      </div>

      <div className={styles.skills}>
        {job.skills.slice(0, 5).map((s) => (
          <span key={s} className={styles.skill}>
            {s}
          </span>
        ))}
      </div>

      {/* metrics FIX: lucide icons */}
      <div className={styles.metrics}>
        <span><Users size={14}/> {job.applicants}</span>
        <span><Eye size={14}/> {job.views}</span>
        <span><Target size={14}/> {job.matchScore}%</span>
      </div>

      <button className={styles.applyBtn}>Apply Now →</button>
    </motion.div>
  );
}
