// src/components/jobs/JobCard.tsx
import Link from 'next/link';
import type { JobType } from '@/lib/db/schema';

// ─── Type Utilities ───────────────────────────────────────────────────────────

type SalaryObject = { min: number; max: number; currency: string };

/** Schema JobType → display string */
const JOB_TYPE_LABELS: Record<JobType, JobCardProps['type']> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'remote':    'Remote',
  'contract':  'Contract',
};

export function mapJobType(type: JobType): JobCardProps['type'] {
  return JOB_TYPE_LABELS[type];
}

/** Schema salary object → formatted string */
export function formatSalary(salary: SalaryObject | string | undefined): string | undefined {
  if (!salary) return undefined;
  if (typeof salary === 'string') return salary;
  return `${salary.currency} ${salary.min.toLocaleString()} – ${salary.max.toLocaleString()}`;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location: string;
  /** هر دو شکل قبول می‌شود: string خام یا آبجکت از schema */
  salary?: string | SalaryObject;
  /** مقادیر display — برای تبدیل از schema از mapJobType استفاده کن */
  type: 'Remote' | 'Full-time' | 'Contract' | 'Part-time' | 'Hybrid';
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  postedAt: string;
  applicants?: number;
  logo?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  type,
  tags,
  isNew,
  isFeatured,
  postedAt,
  applicants,
  logo,
}: JobCardProps) {
  const salaryDisplay = formatSalary(salary);

  return (
    <Link href={`/jobs/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">

        {/* ── Header ── */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            {logo && (
              <span className="text-2xl" role="img" aria-label={`${company} logo`}>
                {logo}
              </span>
            )}
            <div>
              <h3 className="font-bold text-lg leading-tight">{title}</h3>
              <p className="text-gray-500 text-sm">{company}</p>
            </div>
          </div>

          {/* ── Badges ── */}
          <div className="flex gap-1 flex-shrink-0 ml-2">
            {isNew && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                New
              </span>
            )}
            {isFeatured && (
              <span className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* ── Meta ── */}
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <span aria-hidden>📍</span>
            {location}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden>💼</span>
            {type}
          </span>
          {salaryDisplay && (
            <span className="flex items-center gap-1">
              <span aria-hidden>💰</span>
              {salaryDisplay}
            </span>
          )}
        </div>

        {/* ── Tags ── */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-400 border-t pt-2">
          <span>{postedAt}</span>
          {applicants !== undefined && applicants > 0 && (
            <span>{applicants.toLocaleString()} applicants</span>
          )}
        </div>

      </div>
    </Link>
  );
}
