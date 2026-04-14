import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

export const applicationService = {

  async applyToJob(userId: number, jobId: number, data: any) {
    const existing =
      await jobApplicationsRepository.findExisting(jobId, userId);

    if (existing.length > 0) {
      throw new Error("Already applied");
    }

    return jobApplicationsRepository.create({
      jobId,
      userId,
      ...data,
    });
  },

  async getApplicationById(id: number) {
    return jobApplicationsRepository.findById(id);
  },

  async getUserApplications(userId: number) {
    return jobApplicationsRepository.findByUser(userId);
  },

  async getJobApplications(jobId: number) {
    return jobApplicationsRepository.findByJob(jobId);
  },

  async updateStatus(id: number, data: { status: string }) {
    return jobApplicationsRepository.updateStatus(id, data.status);
  },

  async deleteApplication(id: number) {
    return jobApplicationsRepository.delete(id);
  },
};
