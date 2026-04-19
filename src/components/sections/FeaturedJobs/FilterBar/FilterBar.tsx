"use client";

import { useState } from "react";
import styles from "./filter-bar.module.css";
import Chip from "@/components/ui/Chip";
import Popover from "@/components/ui/Popover";
import SalaryRangeSlider from "@/components/ui/SalaryRangeSlider";

export default function FilterBar() {

  const [activeType, setActiveType] = useState<string | null>(null);

  const [salary, setSalary] = useState<[number, number]>([10, 30]);

  const [salaryOpen, setSalaryOpen] = useState(false);

  const jobTypes = [
    "Full‑time",
    "Part‑time",
    "Contract",
    "Remote"
  ];

  return (
    <div className={styles.wrapper}>

      <div className={styles.types}>
        {jobTypes.map((type) => (
          <Chip
            key={type}
            active={activeType === type}
            onClick={() =>
              setActiveType(type === activeType ? null : type)
            }
          >
            {type}
          </Chip>
        ))}
      </div>

      <div className={styles.salary}>

        <Chip
          active={salaryOpen}
          onClick={() => setSalaryOpen(!salaryOpen)}
        >
          Salary
        </Chip>

        {salaryOpen && (
          <Popover onClose={() => setSalaryOpen(false)}>
            <SalaryRangeSlider
              value={salary}
              onChange={(v) => setSalary(v)}
            />
          </Popover>
        )}

      </div>

    </div>
  );
}
