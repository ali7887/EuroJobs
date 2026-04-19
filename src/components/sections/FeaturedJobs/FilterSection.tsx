'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './featured-jobs.module.css';

type Props = {
  selectedJobTypes: string[];
  setSelectedJobTypes: (x: string[]) => void;
  selectedModes: string[];
  setSelectedModes: (x: string[]) => void;
  selectedSkills: string[];
  setSelectedSkills: (x: string[]) => void;
  salaryRange: [number, number];
  setSalaryRange: (x: [number, number]) => void;
};

export default function FilterSection({
  selectedJobTypes,
  setSelectedJobTypes,
  selectedModes,
  setSelectedModes,
  selectedSkills,
  setSelectedSkills,
  salaryRange,
  setSalaryRange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!popRef.current) return;
      if (!popRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const jobTypes = ['Full-time', 'Part-time', 'Contract'];
  const modes = ['Remote', 'Hybrid', 'On-site'];
  const allSkills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'GraphQL', 'Docker'];

  const toggle = (value: string, list: string[], setter: (x: string[]) => void) => {
    if (list.includes(value)) setter(list.filter(v => v !== value));
    else setter([...list, value]);
  };

  return (
    <div className={styles.filterBar}>
      
      {/* Job Type */}
      <div className={styles.filterGroup}>
        {jobTypes.map(j => (
          <button
            key={j}
            className={`${styles.chip} ${selectedJobTypes.includes(j) ? styles.activeChip : ''}`}
            onClick={() => toggle(j, selectedJobTypes, setSelectedJobTypes)}
          >
            {j}
          </button>
        ))}
      </div>

      {/* Work Mode */}
      <div className={styles.filterGroup}>
        {modes.map(m => (
          <button
            key={m}
            className={`${styles.chip} ${selectedModes.includes(m) ? styles.activeChip : ''}`}
            onClick={() => toggle(m, selectedModes, setSelectedModes)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Skills */}
      <div className={styles.skillsRow}>
        {allSkills.map(s => (
          <button
            key={s}
            className={`${styles.skillChip} ${selectedSkills.includes(s) ? styles.skillActive : ''}`}
            onClick={() => toggle(s, selectedSkills, setSelectedSkills)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Salary Range Popover */}
      <div className={styles.salaryWrapper} ref={popRef}>
        <button className={styles.chip} onClick={() => setIsOpen(!isOpen)}>
          Salary: ${salaryRange[0] / 1000}k – ${salaryRange[1] / 1000}k / mo
        </button>

        {isOpen && (
          <div className={styles.popover}>
            
            {/* Inputs */}
            <div className={styles.inputRow}>
              <input
                type="number"
                value={salaryRange[0]}
                onChange={e => setSalaryRange([Number(e.target.value), salaryRange[1]])}
                className={styles.input}
              />
              <span className={styles.sep}>–</span>
              <input
                type="number"
                value={salaryRange[1]}
                onChange={e => setSalaryRange([salaryRange[0], Number(e.target.value)])}
                className={styles.input}
              />
            </div>

            {/* Slider */}
            <div className={styles.sliderRow}>
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={salaryRange[0]}
                onChange={e => setSalaryRange([Number(e.target.value), salaryRange[1]])}
              />
              <input
                type="range"
                min={0}
                max={20000}
                step={500}
                value={salaryRange[1]}
                onChange={e => setSalaryRange([salaryRange[0], Number(e.target.value)])}
              />
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
