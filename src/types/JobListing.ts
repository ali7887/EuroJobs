export interface JobListing {
  id: string;

  title: string;
  company: string;
  location: string;

  salary: string;

  jobType: "Full-time" | "Part-time" | "Contract" | "Remote" | "Hybrid";

  skills: string[];

  applicants: number;
  views: number;
  matchScore: number;

  isFeatured?: boolean;
  isNew?: boolean;

  postedAt?: string;
  logoColor?: string;
}
