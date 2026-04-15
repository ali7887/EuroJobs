"use client";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: string;
  tags: string[];
  isNew: boolean;
  isFeatured: boolean;
  postedAt: string;
  applicantCount: number;
}

export default function JobCard(props: JobCardProps) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.company}</p>
      <p>{props.location}</p>
    </div>
  );
}
