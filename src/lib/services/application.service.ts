import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";
import { ApplicationStatus } from "@/lib/types/application.types";
import {
  ApplicationCreateInput,
  ApplicationUpdateInput,
} from "@/lib/types/application.types";

export const applicationService = {
  applyToJob: async (
    userId: string,
    jobId: string,
    data: Omit<ApplicationCreateInput, "userId" | "jobId">
  ) => {
    const existing = await jobApplicationsRepository.findExisting(jobId, userId);

    if (existing && existing.length > 0) {
      throw new Error("Already applied");
    }

    return jobApplicationsRepository.create({
      userId,
      jobId,
      ...data,
    });
  },

  getApplicationById: async (id: string) => {
    return jobApplicationsRepository.findById(id);
  },

  getUserApplications: async (userId: string) => {
    return jobApplicationsRepository.getApplicationsByUser(userId);
  },

  getJobApplications: async (jobId: string) => {
    return jobApplicationsRepository.getApplicationsByJob(jobId);
  },

  updateStatus: async (id: string, data: ApplicationUpdateInput) => {
    if (!data.status) throw new Error("Missing status");
    return jobApplicationsRepository.updateStatus(id, data.status);
  },

  deleteApplication: async (id: string) => {
    return jobApplicationsRepository.delete(id);
  },

  existingApplication: async (jobId: string, userId: string) => {
    return jobApplicationsRepository.findExisting(jobId, userId);
  },
};
