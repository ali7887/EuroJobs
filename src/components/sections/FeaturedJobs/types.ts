export interface FeaturedJob {
  id: string

  title: string
  company: string
  location: string

  logo: string

  employmentType: "Full-time" | "Part-time" | "Contract"
  workMode: "Remote" | "Hybrid" | "On-site"

  salaryMin: number
  salaryMax: number

  matchScore: number

  skills: string[]

  applicants: number
  views: number
  employerReplyRate: number

  postedAt: string
}
