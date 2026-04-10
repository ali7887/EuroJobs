// src/components/jobs/JobCard.tsx
import Link from 'next/link';

export type JobTypeDisplay = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Hybrid';

export interface JobCardProps {
  id: number | string;
  title: string;
  company: string;
  location: string;
  type: JobTypeDisplay;
  salary?: string | number | null;
  postedAt: string; // متن آماده نمایش (مثلاً "Apr 10")
}

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedAt,
}: JobCardProps) {
  return (
    <Link
      href={`/jobs/${id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
          <p className="mt-1 text-xs text-gray-500">{location}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
            {type}
          </span>
          {salary != null && salary !== '' && (
            <span className="text-sm font-medium text-gray-900">
              {typeof salary === 'number' ? `$${salary.toLocaleString()}` : salary}
            </span>
          )}
          <span className="text-xs text-gray-400">Posted {postedAt}</span>
        </div>
      </div>
    </Link>
  );
}
