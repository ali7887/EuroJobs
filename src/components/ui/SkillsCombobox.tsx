import React, { useState } from "react";
import { filtersConfig } from "../sections/FeaturedJobs/filtersConfig";

type SkillsComboboxProps = {
  selected: string[];
  onChange: (skills: string[]) => void;
};

export default function SkillsCombobox({
  selected,
  onChange,
}: SkillsComboboxProps) {
  const [search, setSearch] = useState("");

  const toggle = (skill: string) => {
    const exists = selected.includes(skill);
    const next = exists
      ? selected.filter((s) => s !== skill)
      : [...selected, skill];
    onChange(next);
  };

  return (
    <div>
      <input
        placeholder="Search skill…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {filtersConfig.skills
        .filter((s) => s.toLowerCase().includes(search.toLowerCase()))
        .map((skill) => {
          const active = selected.includes(skill);
          return (
            <div
              key={skill}
              onClick={() => toggle(skill)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                cursor: "pointer",
                background: active ? "#007aff" : "#f5f5f5",
                color: active ? "white" : "black",
                marginBottom: 6,
              }}
            >
              {skill}
            </div>
          );
        })}
    </div>
  );
}
