export type AdminStats = {
  users: number
  jobs: number
  companies: number
  applications: number

  recentJobs: {
    id: string
    title: string
    company: string
    createdAt: string
  }[]

  recentUsers: {
    id: string
    name: string
    email: string
    role: string
  }[]

  aiActivity: {
    id: string
    action: string
    time: string
  }[]

  chart: {
    name: string
    jobs: number
    users: number
  }[]
}
