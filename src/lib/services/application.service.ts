import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

export const applicationService = {
  applyToJob: async (userId: number, jobId: number, data: any) => {
    return jobApplicationsRepository.create({ jobId, userId, ...data });
  },

  getApplicationById: async (id: number) => {
    return jobApplicationsRepository.findById(id);
  },

  getUserApplications: async (userId: number) => {
    return jobApplicationsRepository.getApplicationsByUser(userId);
  },

  getJobApplications: async (jobId: number) => {
    return jobApplicationsRepository.findExisting(jobId, 0); // مثال
  },

  updateStatus: async (id: number, data: { status: string }) => {
    return jobApplicationsRepository.updateStatus(id, data.status);
  },

  deleteApplication: async (id: number) => {
    return jobApplicationsRepository.delete(id);
  },

  existingApplication: async (jobId: number, userId: number) => {
    return jobApplicationsRepository.findExisting(jobId, userId);
  },
};
