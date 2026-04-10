import { ApplicationRepository } from "../repositories/application.repository";

export const ApplicationService = {
  async getAllApplications() {
    return ApplicationRepository.findAll();
  },

  async getApplicationsByJob(jobId: number) {
    return ApplicationRepository.findByJobId(jobId);
  },

  async getByUser(userId: number) {
    return ApplicationRepository.findByUserId(userId);
  },

  async create(data: {
    userId: number;
    jobId: number;
    resumePath?: string;
    coverLetter?: string;
  }) {
    return ApplicationRepository.create({
      userId: data.userId,
      jobId: data.jobId,
      resumePath: data.resumePath ?? null,
      coverLetter: data.coverLetter ?? null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async updateStatus(
    id: number,
    input: { status: string }
  ) {
    return ApplicationRepository.updateStatus(id, input);
  },

  async deleteApplication(id: number) {
    return ApplicationRepository.delete(id);
  },
};
