import { JobDTO, JobCreateDTO } from "@/lib/dto/job.dto"

export interface JobPayload {
  title: string
  description: string
  location?: string
  salary?: number
  type?: string
  companyId: string
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    throw new Error("API request failed")
  }

  return res.json()
}

export const jobsClient = {

  getJobs: async (): Promise<JobDTO[]> =>
    request("/api/jobs"),

  getJob: async (id: string): Promise<JobDTO> =>
    request(`/api/jobs/${id}`),

  createJob: async (data: JobCreateDTO): Promise<JobDTO> =>
    request("/api/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateJob: async (id: string, data: Partial<JobCreateDTO>) =>
    request(`/api/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteJob: async (id: string) =>
    request(`/api/jobs/${id}`, {
      method: "DELETE",
    }),
}
