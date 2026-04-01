import { JobCardProps } from "@/components/ui/JobCard/JobCard";

const JOB_TYPE_MAP: Record<string, JobCardProps['type']> = {
  "FULL_TIME": "Full-time",
  "PART_TIME": "Part-time",
  "CONTRACT": "Contract",
  "REMOTE": "Remote",
  "HYBRID": "Hybrid",
};

export function mapJobToCardProps(job: {
  id: string;
  title: string;
  companyName?: string;
  location: string;
  salary?: string;
  type: string;
  createdAt: string | Date;
}): JobCardProps {
  const parseSalary = (sal?: string) => {
    if (!sal) return undefined;
    const match = sal.match(/(\d+)k?\s*[-–]\s*(\d+)k?/i);
    if (match) {
      return { min: parseInt(match[1]) * 1000, max: parseInt(match[2]) * 1000, currency: '$' };
    }
    return undefined;
  };

  return {
    id: job.id,
    title: job.title,
    company: job.companyName ?? "Unknown",
    location: job.location,
    salary: parseSalary(job.salary),
    type: JOB_TYPE_MAP[job.type] ?? "Full-time",
    postedAt: typeof job.createdAt === 'string' ? job.createdAt : new Date(job.createdAt).toLocaleDateString(),
  };
}
