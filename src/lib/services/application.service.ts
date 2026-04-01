import { applicationRepository } from "@/lib/repositories/application.repository";
import { Application } from "@/lib/db/schema";

export class ApplicationService {
  static getApplicationsByUser(userId: string) {
    throw new Error('Method not implemented.');
  }
  static getApplicationsByJob(jobId: string) {
    throw new Error('Method not implemented.');
  }
  async getApplications(): Promise<Application[]> {
    return applicationRepository.findAll();
  }

  async getApplicationById(id: string): Promise<Application | null> {
    return (await applicationRepository.findById(id)) ?? null;
  }

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    return applicationRepository.findByJobId(jobId);
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return applicationRepository.findByUserId(userId);
  }

  async createApplication(input: Omit<Application, "id" | "createdAt" | "updatedAt">): Promise<Application> {
    return applicationRepository.create(input);
  }

  async updateApplication(id: string, input: Partial<Omit<Application, "id" | "createdAt">>): Promise<Application | null> {
    return applicationRepository.update(id, input);
  }

  async deleteApplication(id: string): Promise<boolean> {
    return applicationRepository.delete(id);
  }
}

export const applicationService = new ApplicationService();
