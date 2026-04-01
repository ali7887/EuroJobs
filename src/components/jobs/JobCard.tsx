import Link from "next/link";

export interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: "Remote" | "Full-time" | "Contract" | "Part-time" | "Hybrid";
  tags?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  postedAt: string;
  applicants?: number;
  logo?: string;
}

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
  return (
    <Link href={`/jobs/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            {logo && <span className="text-2xl">{logo}</span>}
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-600">{company}</p>
            </div>
          </div><div className="flex gap-1">
            {isNew && <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">New</span>}
            {isFeatured && <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Featured</span>}</div>
        </div>
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <span>📍 {location}</span>
          <span>💼 {type}</span>
          {salary && <span>💰 {salary}</span>}
        </div>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-3 flex justify-between text-xs text-gray-400">
          <span>{postedAt}</span>
          {applicants && <span>{applicants} applicants</span>}
        </div>
      </div>
    </Link>
  );
}
