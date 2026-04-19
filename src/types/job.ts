import { ReactNode } from "react";

export type WorkMode =
  | "remote"
  | "hybrid"
  | "onsite";

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export type FeaturedJob = {
  replyRate: ReactNode;
  salary: ReactNode;
  logoUrl: string | Blob | undefined;
  id: string;
  title: string;
  company: string;
  logo: string;

  location: string;
  skills: string[];

  applicants: number;
  views: number;
  matchScore: number;

  companySize: string;
  postedAt: string;

  employmentType: EmploymentType;
  workMode: WorkMode;

  employerLastActive: number;
  employerReplyRate: number;
  avgResponseHours: number;

  trendingScore: number;

  salaryMin: number;
  salaryMax: number;

  trending?: boolean;
};
