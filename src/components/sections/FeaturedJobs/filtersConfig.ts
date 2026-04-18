// src/components/sections/FeaturedJobs/filtersConfig.ts

export const filtersConfig = {
  type: [
    { label: "Full‑time", value: "full-time" },
    { label: "Part‑time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ],

  location: [
    { label: "On‑site", value: "onsite" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
  ],

  salary: [
    { label: "$0–5k", value: "0-5" },
    { label: "$5–10k", value: "5-10" },
    { label: "$10–20k", value: "10-20" },
    { label: "Custom", value: "custom" },
  ],

  skills: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "SQL",
    "MongoDB",
    "Tailwind",
    "Redis",
    "GraphQL",
  ],
};
