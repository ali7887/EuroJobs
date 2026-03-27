"use client";

import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Job } from "@/lib/db-operations";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: "active", type: "" });

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter.status) params.append("status", filter.status);
    if (filter.type) params.append("type", filter.type);

    const response = await fetch(`/api/jobs?${params}`);
    const data = await response.json();
    setJobs(data);
    setLoading(false);
  };

  if (loading) return <div className="text-center py-8">Loading jobs...</div>;

  return (
    <div>
      <div className="mb-6 flex gap-4">
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
