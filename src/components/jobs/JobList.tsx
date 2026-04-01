'use client';

import { useState, useEffect } from "react";
import { JobCard } from "../ui/JobCard/JobCard";
import { Job } from "@/lib/db/schema";

interface JobListProps {
  keyword?: string;
  location?: string;
  category?: string;
}

const mapJobType = (type?: string): "Remote" | "Full-time" | "Contract" | "Part-time" | "Hybrid" => {
  const map: Record<string, "Remote" | "Full-time" | "Contract" | "Part-time" | "Hybrid"> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'remote': 'Remote',};
  return map[type || ''] || 'Full-time';
};

export default function JobList({ keyword, location, category }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (location) params.set("location", location);
      if (category) params.set("category", category);

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, [keyword, location, category]);

  if (loading) return <div>Loading...</div>;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return undefined;
    return { min: min || 0, max: max || 0, currency: '$' };
  };

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.companyId}
          location={job.location || 'Not specified'}
          salary={formatSalary(job.salaryMin, job.salaryMax)}
          type={mapJobType(job.jobType)}
          postedAt={new Date(job.createdAt).toLocaleDateString()}
        />
      ))}
    </div>
  );
}
