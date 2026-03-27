import Link from "next/link";
import Card from "../ui/Card";
import { Job } from "@/lib/db-operations";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <Link href={`/jobs/${job.id}`}>
        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 mb-2">
          {job.title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-sm text-gray-500 mb-3">{job.location}</p>
      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {job.type}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
          ${job.salary.toLocaleString()}
        </span>
      </div>
      <p className="text-gray-700 line-clamp-2">{job.description}</p>
    </Card>
  );
}
