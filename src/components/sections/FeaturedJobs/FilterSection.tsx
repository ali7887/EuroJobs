import { useState } from "react";
import styles from "./featured-jobs.module.css";

interface Props {
  userSkills: string[];
}

export function FilterSection({ userSkills }: Props) {
  const [activeSkills, setActiveSkills] = useState<string[]>(userSkills);

  const skillsList = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Redux", "GraphQL"];

  function toggleSkill(skill: string) {
    setActiveSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className={styles.filtersGrid}>
        <select className={styles.select}>
          <option>Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
        </select>

        <select className={styles.select}>
          <option>Work Mode</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>

        <select className={styles.select}>
          <option>Salary Range</option>
          <option>$50k - $100k</option>
        </select>
      </div>

      {/* Skills */}
      <div className={styles.skillsContainer}>
        {skillsList.map(skill => (
          <div
            key={skill}
            className={`${styles.skillChip} ${
              activeSkills.includes(skill) ? styles.skillChipActive : ""
            }`}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </div>
        ))}
      </div>

      <div className={styles.divider} />
    </div>
  );
}
