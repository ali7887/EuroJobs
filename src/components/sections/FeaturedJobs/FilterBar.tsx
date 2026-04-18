// src/components/sections/FeaturedJobs/FilterBar.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FilterBar.module.css";
import { filtersConfig } from "./filtersConfig";

export type FilterState = {
  type: string[];
  location: string[];
  salary: string[];
  skills: string[];
  customSalaryMin?: number;
  customSalaryMax?: number;
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export default function FilterBar({ filters, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCustomSalary, setShowCustomSalary] = useState(false);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onChange({ ...filters, [category]: updated });

    if (category === "salary" && value === "custom") {
      setShowCustomSalary(!showCustomSalary);
    }
  };

  const clearAll = () => {
    onChange({
      type: [],
      location: [],
      salary: [],
      skills: [],
      customSalaryMin: undefined,
      customSalaryMax: undefined,
    });
    setShowCustomSalary(false);
  };

  const activeCount =
    filters.type.length +
    filters.location.length +
    filters.salary.length +
    filters.skills.length;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h4 className={styles.title}>Filter Opportunities</h4>
        {activeCount > 0 && (
          <button className={styles.clearBtn} onClick={clearAll}>
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* GROUPS */}
      <div className={styles.groups}>
        {/* TYPE */}
        <FilterGroup
          label="Job Type"
          expanded={expanded === "type"}
          onToggle={() => setExpanded(expanded === "type" ? null : "type")}
        >
          <div className={styles.chips}>
            {filtersConfig.type.map((t) => (
              <Chip
                key={t.value}
                label={t.label}
                active={filters.type.includes(t.value)}
                onClick={() => toggleFilter("type", t.value)}
              />
            ))}
          </div>
        </FilterGroup>

        {/* LOCATION */}
        <FilterGroup
          label="Work Mode"
          expanded={expanded === "location"}
          onToggle={() =>
            setExpanded(expanded === "location" ? null : "location")
          }
        >
          <div className={styles.chips}>
            {filtersConfig.location.map((loc) => (
              <Chip
                key={loc.value}
                label={loc.label}
                active={filters.location.includes(loc.value)}
                onClick={() => toggleFilter("location", loc.value)}
              />
            ))}
          </div>
        </FilterGroup>

        {/* SALARY */}
        <FilterGroup
          label="Salary Range"
          expanded={expanded === "salary"}
          onToggle={() => setExpanded(expanded === "salary" ? null : "salary")}
        >
          <div className={styles.chips}>
            {filtersConfig.salary.map((s) => (
              <Chip
                key={s.value}
                label={s.label}
                active={filters.salary.includes(s.value)}
                onClick={() => toggleFilter("salary", s.value)}
              />
            ))}
          </div>

          {/* CUSTOM RANGE */}
          <AnimatePresence>
            {showCustomSalary && (
              <motion.div
                className={styles.customSalary}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <label>Min: ${filters.customSalaryMin || 0}k</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={filters.customSalaryMin || 0}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      customSalaryMin: Number(e.target.value),
                    })
                  }
                />

                <label>Max: ${filters.customSalaryMax || 20}k</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={filters.customSalaryMax || 20}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      customSalaryMax: Number(e.target.value),
                    })
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </FilterGroup>

        {/* SKILLS */}
        <FilterGroup
          label="Skills"
          expanded={expanded === "skills"}
          onToggle={() => setExpanded(expanded === "skills" ? null : "skills")}
        >
          <div className={styles.chips}>
            {filtersConfig.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                active={filters.skills.includes(skill)}
                onClick={() => toggleFilter("skills", skill)}
              />
            ))}
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}

/* SUB-COMPONENTS */
function FilterGroup({
  label,
  expanded,
  onToggle,
  children,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.group}>
      <button className={styles.groupHeader} onClick={onToggle}>
        <span>{label}</span>
        <svg
          className={`${styles.chevron} ${expanded ? styles.chevronUp : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.groupContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
    >
      {label}
    </button>
  );
}
