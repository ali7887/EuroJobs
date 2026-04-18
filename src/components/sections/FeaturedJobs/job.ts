// src/types/job.ts

export type UserSkill = string;

export type FeaturedJob = {
  id: string;
  title: string;
  company: string;
  logo: string;
  skills: UserSkill[];
  location: string;

  applicants: number;
  views: number;
  matchScore: number;
  companySize: string;
  postedAt: string;
  employmentType: string;

  employerLastActive: number;
  employerReplyRate: number;
  avgResponseHours: number;
  trendingScore: number;
  //jHistoryInteractions: number;

  // Filtering extras
  workMode: string;   // remote | hybrid | onsite
  type: string;       // full-time | part-time | contract | internship

  salaryMin: number;
  salaryMax: number;

  trending?: boolean;
};
