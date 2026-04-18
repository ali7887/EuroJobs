import { FeaturedJob } from "./job";

const featuredJobs: FeaturedJob[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "TechNova",
    logo: "/logos/technova.png",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    location: "Remote",

    applicants: 42,
    views: 1234,
    matchScore: 87,
    companySize: "50-100",
    postedAt: "2 days ago",
    employmentType: "Full-time",

    employerLastActive: 3,
    employerReplyRate: 92,
    avgResponseHours: 10,
    trendingScore: 67,

    workMode: "remote",
    type: "full-time",

    salaryMin: 90000,
    salaryMax: 140000,
  },

  {
    id: "2",
    title: "Full‑Stack TypeScript Developer",
    company: "CodeSmith Labs",
    logo: "/logos/codesmith.png",
    skills: ["Node.js", "React", "Next.js", "PostgreSQL", "TypeScript"],
    location: "Hybrid - Berlin",

    applicants: 28,
    views: 990,
    matchScore: 82,
    companySize: "20-50",
    postedAt: "1 day ago",
    employmentType: "Full-time",

    employerLastActive: 1,
    employerReplyRate: 97,
    avgResponseHours: 6,
    trendingScore: 74,

    workMode: "hybrid",
    type: "full-time",

    salaryMin: 75000,
    salaryMax: 125000,
  },

  {
    id: "3",
    title: "AI/ML Engineer",
    company: "DeepVision AI",
    logo: "/logos/deepvision.png",
    skills: ["Python", "PyTorch", "TensorFlow", "LLMs", "MLOps"],
    location: "Remote",

    applicants: 65,
    views: 1980,
    matchScore: 91,
    companySize: "100-200",
    postedAt: "3 days ago",
    employmentType: "Full-time",

    employerLastActive: 2,
    employerReplyRate: 88,
    avgResponseHours: 18,
    trendingScore: 82,

    workMode: "remote",
    type: "full-time",

    salaryMin: 110000,
    salaryMax: 170000,
  },

  {
    id: "4",
    title: "DevOps / Cloud Engineer",
    company: "SkyDeploy",
    logo: "/logos/skydeploy.png",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    location: "Onsite - Toronto",

    applicants: 18,
    views: 720,
    matchScore: 78,
    companySize: "10-20",
    postedAt: "4 days ago",
    employmentType: "Contract",

    employerLastActive: 5,
    employerReplyRate: 84,
    avgResponseHours: 22,
    trendingScore: 55,

    workMode: "onsite",
    type: "contract",

    salaryMin: 60000,
    salaryMax: 90000,
  },

  {
    id: "5",
    title: "Senior UI/UX Designer",
    company: "PixelCraft",
    logo: "/logos/pixelcraft.png",
    skills: ["Figma", "User Research", "Design Systems", "Prototyping"],
    location: "Hybrid - Amsterdam",

    applicants: 51,
    views: 1500,
    matchScore: 85,
    companySize: "50-80",
    postedAt: "5 days ago",
    employmentType: "Full-time",

    employerLastActive: 1,
    employerReplyRate: 95,
    avgResponseHours: 5,
    trendingScore: 72,

    workMode: "hybrid",
    type: "full-time",

    salaryMin: 70000,
    salaryMax: 105000,
  },

  {
    id: "6",
    title: "Backend Engineer (Golang)",
    company: "StreamFlow",
    logo: "/logos/streamflow.png",
    skills: ["Go", "gRPC", "Microservices", "Kafka", "SQL"],
    location: "Remote",

    applicants: 33,
    views: 1120,
    matchScore: 89,
    companySize: "200-300",
    postedAt: "6 days ago",
    employmentType: "Full-time",

    employerLastActive: 2,
    employerReplyRate: 91,
    avgResponseHours: 8,
    trendingScore: 80,

    workMode: "remote",
    type: "full-time",

    salaryMin: 95000,
    salaryMax: 150000,
  }
];

export default featuredJobs;
