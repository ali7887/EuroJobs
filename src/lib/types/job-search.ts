export interface JobSearchQuery {

  search?: string

  location?: string

  salaryMin?: number

  salaryMax?: number

  jobType?: string

  tags?: string[]

  page?: number
}
