import { JobListing } from "@/types/JobListing";

export const featuredJobs: JobListing[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "TechNova",
    logoColor: "#4A90E2",
    location: "Berlin, Germany",
    salary: "$120k – $180k",
    jobType: "Remote",
    skills: ["react", "typescript", "next.js"],
    matchScore: 92,
    applicants: 123,
    views: 856,
    isFeatured: true,
    isNew: true,
    postedAt: "2025-04-10"
  },
  {
    id: "2",
    title: "React Developer",
    company: "SkyForge",
    logoColor: "#E25A4A",
    location: "Amsterdam, Netherlands",
    salary: "$90k – $130k",
    jobType: "Hybrid",
    skills: ["react", "javascript", "css"],
    matchScore: 78,
    applicants: 89,
    views: 524,
    postedAt: "2025-04-12"
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Fortiss",
    logoColor: "#f44d3a",
    location: "Cologne, Germany",
    salary: "$100k – $150k",
    jobType: "Part-time",
    skills: ["react", "javascript", "kubernetes"],
    matchScore: 90,
    applicants: 12,
    views: 870,
    postedAt: "2025-07-22"
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "Ferm",
    logoColor: "#b4e24a",
    location: "London, England",
    salary: "$70k – $100k",
    jobType: "Full-time",
    skills: ["figma", "html", "css"],
    matchScore: 68,
    applicants: 112,
    views: 1123,
    postedAt: "2026-02-07"
  }
];
