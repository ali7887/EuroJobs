// src/components/jobs/JobList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/lib/db/schema';
import JobCard from '@/components/jobs/JobCard';

interface JobListProps {
  keyword?: string;
  location?: string;
  category?: string;
}

const mapJobType = (
  type: string
): 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid' => {
  const map: Record<string, 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid'> = {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    CONTRACT: 'Contract',
    REMOTE: 'Remote',
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    contract: 'Contract',
    remote: 'Remote',
  };
  return map[type] ?? 'Full-time';
};

export default function JobList({ keyword, location, category }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const params = new URLSearchParams();
      if (keyword) params.set('keyword', keyword);
      if (location) params.set('location', location);
      if (category) params.set('category', category);

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, [keyword, location, category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.companyId}
          location={job.location ?? 'Not specified'}
          type={mapJobType(job.type)}
          salary={job.salary}                          // ✅ مستقیم string
          postedAt={new Date(job.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        />
      ))}
    </div>
  );
}
