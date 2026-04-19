import { useState } from 'react';
import { FeaturedJob } from "@/types/job";
import styles from "./FeaturedJobCard.module.css";
import Chip from "@/components/ui/Chip";

// فرض می‌کنیم از lucide-react برای آیکون‌ها استفاده می‌کنی (اگر نداری نصب کن یا جایگزین کن)
import { Users, Eye, MessageSquare, Clock } from "lucide-react"; 

type Props = {
  job: FeaturedJob;
  userSkills: string[];
};

export default function FeaturedJobCard({ job }: Props) {
  const [imgError, setImgError] = useState(false);

  // منطق رنگ‌بندی دقیق پیشنهادی علی
  const getMatchStyles = (score: number) => {
    if (score >= 90) return { bg: "#10B981", label: "High Match" }; // سبز
    if (score >= 85) return { bg: "#3B82F6", label: "Good Match" }; // آبی
    if (score >= 80) return { bg: "#F59E0B", label: "Fair Match" }; // زرد
    return { bg: "#6B7280", label: "Match" }; // خاکستری
  };

  const matchTheme = getMatchStyles(job.matchScore);

  return (
    <div className={styles.card}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.logoWrapper}>
            {!imgError ? (
              <img 
                src={job.logo} 
                alt={job.company} 
                onError={() => setImgError(true)}
                className={styles.logoImg}
              />
            ) : (
              <div className={styles.logoFallback}>{job.company.charAt(0)}</div>
            )}
          </div>
          <div className={styles.meta}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.companyMeta}>
              {job.company} <span className={styles.dot}>•</span> {job.workMode}
            </p>
          </div>
        </div>
        <div 
          className={styles.matchBadge}
          style={{ backgroundColor: matchTheme.bg }}
        >
          {job.matchScore}% {matchTheme.label}
        </div>
      </div>

      {/* SALARY */}
      <div className={styles.salarySection}>
        <span className={styles.amount}>${job.salaryMin/1000}k–${job.salaryMax/1000}k</span>
        <span className={styles.period}>/mo</span>
      </div>

      {/* SKILLS - با رعایت Gap 8px */}
      <div className={styles.skillsList}>
        {job.skills.map((skill) => (
          <Chip key={skill} className={styles.skillChip}>{skill}</Chip>
        ))}
      </div>

      {/* ANALYTICS - شلوغی کمتر و Hierarchy بیشتر */}
      <div className={styles.analyticsGrid}>
        <div className={styles.statBox}>
          <span className={styles.statValue}><Users size={14} /> {job.applicants}</span>
          <span className={styles.statLabel}>Applicants</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}><Eye size={14} /> {job.views}</span>
          <span className={styles.statLabel}>Views</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}><MessageSquare size={14} /> {job.employerReplyRate}%</span>
          <span className={styles.statLabel}>Reply Rate</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <div className={styles.postedDate}>
          <Clock size={14} /> {job.postedAt}
        </div>
        <button className={styles.applyBtn}>
          Apply Now
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  );
}
