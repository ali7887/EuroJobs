// src/lib/utils/job.utils.ts
import type { Job } from '@/lib/db/schema';
import type { JobCardProps } from '@/components/jobs/JobCard';

export function mapJobTypeToDisplay(type: Job['type']): JobCardProps['type'] {
  const map: Record<Job['type'], JobCardProps['type']> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'remote': 'Remote',
    'contract': 'Contract',
  };
  return map[type];
}
