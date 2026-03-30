// ============================================================
// JobCard.tsx — Featured Job Card Component
// Job Board / Recruitment Platform SaaS
// Fixes: Proper 2-col layout, tag overflow, button alignment
// ============================================================

import React from "react";
import styles from "./JobCard.module.css";

// ── TYPES ────────────────────────────────────────────────────
export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyInitial?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";
  salary?: {
    min: number;
    max: number;
    currency?: string;
  };
  tags?: string[];
  postedAt: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isSaved?: boolean;
  applicantCount?: number;
  onApply?: (id: string) => void;
  onSave?: (id: string) => void;
  onView?: (id: string) => void;
}

// ── HELPERS ──────────────────────────────────────────────────
function formatSalary(salary: JobCardProps["salary"]): string {
  if (!salary) return "";
  const { min, max, currency = "$" } = salary;
  const fmt = (n: number) =>
    n >= 1000 ? `${currency}${(n / 1000).toFixed(0)}k` : `${currency}${n}`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function getTypeClass(type: JobCardProps["type"]): string {
  const map: Record<JobCardProps["type"], string> = {
    "Full-time": styles.typeFull,
    "Part-time": styles.typePart,
    "Contract":  styles.typeContract,
    "Remote":    styles.typeRemote,
    "Hybrid":    styles.typeHybrid,
  };
  return map[type] ?? styles.typeFull;
}

// ── COMPONENT ────────────────────────────────────────────────
export const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  companyLogo,
  companyInitial,
  location,
  type,
  salary,
  tags = [],
  postedAt,
  isFeatured = false,
  isNew = false,
  isSaved = false,
  applicantCount,
  onApply,
  onSave,
  onView,
}) => {
  // Limit tags to max 3 to prevent overflow
  const visibleTags = tags.slice(0, 3);
  const overflowCount = tags.length - visibleTags.length;

  return (
    <article
      className={`${styles.card} ${isFeatured ? styles.featured : ""}`}
      role="article"
      aria-label={`${title} at ${company}`}
    >
      {/* ── CARD HEADER ── */}
      <div className={styles.cardHeader}>
        {/* Company Logo / Initial */}
        <div className={styles.logoWrapper}>
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${company} logo`}
              className={styles.logoImage}
              width={44}
              height={44}
            />
          ) : (
            <div className={styles.logoFallback} aria-hidden="true">
              {companyInitial ?? company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className={styles.badges}>
          {isNew && (
            <span className={styles.badgeNew} aria-label="New listing">
              New
            </span>
          )}
          {isFeatured && (
            <span className={styles.badgeFeatured} aria-label="Featured job">
              Featured
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          className={`${styles.saveButton} ${isSaved ? styles.saved : ""}`}
          onClick={() => onSave?.(id)}
          aria-label={isSaved ? "Remove from saved" : "Save job"}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── CARD BODY ── */}
      <div className={styles.cardBody}>
        {/* Job Title */}
        <h3 className={styles.jobTitle}>
          <button
            className={styles.titleButton}
            onClick={() => onView?.(id)}
            type="button"
          >
            {title}
          </button>
        </h3>

        {/* Company Name */}
        <p className={styles.companyName}>{company}</p>

        {/* Meta Info */}
        <div className={styles.metaRow}>
          {/* Location */}
          <span className={styles.metaItem}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </span>

          {/* Salary */}
          {salary && (
            <span className={styles.metaItem}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {formatSalary(salary)}
            </span>
          )}
        </div>

        {/* Job Type Badge */}
        <div className={styles.typeRow}>
          <span className={`${styles.typeBadge} ${getTypeClass(type)}`}>
            {type}
          </span>
          {applicantCount !== undefined && (
            <span className={styles.applicants}>
              {applicantCount} applicants
            </span>
          )}
        </div>

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className={styles.tagsRow}>
            {visibleTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className={styles.tagOverflow}>+{overflowCount}</span>
            )}
          </div>
        )}
      </div>

      {/* ── CARD FOOTER ── */}
      <div className={styles.cardFooter}>
        <span className={styles.postedAt}>{postedAt}</span>
        <button
          className={styles.applyButton}
          onClick={() => onApply?.(id)}
          type="button"
          aria-label={`Apply for ${title}`}
        >
          Apply Now
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default JobCard;
