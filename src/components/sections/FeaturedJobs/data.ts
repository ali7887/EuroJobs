import { FeaturedJob } from "@/types/job";

const featuredJobs: FeaturedJob[] = [
  {
    id: "job-1",
    title: "Senior React Developer",
    company: "TechNova",
    location: "Remote",
    logo: "/logos/technova.png",

    employmentType: "full-time",
    workMode: "remote",

    salaryMin: 6000,
    salaryMax: 9000,

    matchScore: 92,

    skills: ["React", "Next.js", "TypeScript"],

    applicants: 42,
    views: 312,
    employerReplyRate: 68,

    postedAt: "2 days ago",
    companySize: "",
    employerLastActive: 0,
    avgResponseHours: 0,
    trendingScore: 0,
    replyRate: undefined,
    salary: undefined,
    logoUrl: undefined
  },
  {
    id: "job-2",
    title: "Frontend Engineer",
    company: "Pixel Labs",
    location: "Berlin",
    logo: "/logos/pixel.png",

    employmentType: "full-time",
    workMode: "hybrid",

    salaryMin: 5000,
    salaryMax: 7500,

    matchScore: 88,

    skills: ["React", "TypeScript", "GraphQL"],

    applicants: 28,
    views: 210,
    employerReplyRate: 64,

    postedAt: "3 days ago",
    companySize: "",
    employerLastActive: 0,
    avgResponseHours: 0,
    trendingScore: 0,
    replyRate: undefined,
    salary: undefined,
    logoUrl: undefined
  },
  {
    id: "job-3",
    title: "Next.js Developer",
    company: "CloudStack",
    location: "Remote",
    logo: "/logos/cloudstack.png",

    employmentType: "contract",
    workMode: "remote",

    salaryMin: 6500,
    salaryMax: 9500,

    matchScore: 90,

    skills: ["Next.js", "Node.js", "AWS"],

    applicants: 35,
    views: 290,
    employerReplyRate: 71,

    postedAt: "1 day ago",
    companySize: "",
    employerLastActive: 0,
    avgResponseHours: 0,
    trendingScore: 0,
    replyRate: undefined,
    salary: undefined,
    logoUrl: undefined
  }
]

export default featuredJobs
