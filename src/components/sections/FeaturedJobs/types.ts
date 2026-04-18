export type UserSkill = string;

export type FeaturedJob = {
  id: string;
  company: string;
  logo: string;
  title: string;
  type: string; // Full-Time, Part-Time, Contract...
  location: string; // Remote, Hybrid, Onsite
  salary: number;
  skills: UserSkill[];
  postedAt: string;
  experience: string;
  description: string;
  applicants: number;
};
