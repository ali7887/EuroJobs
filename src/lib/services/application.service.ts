import { ApplicationRepository } from '../repositories/application.repository';
import { Application } from '../db/schema';

export class ApplicationService {
  private repository: ApplicationRepository;

  constructor() {
    this.repository = new ApplicationRepository();
  }

  // ✅ متد مورد نیاز route‌ها
  async getApplications(): Promise<Application[]> {
    return this.repository.findAll();
  }

  async getApplicationById(id: string): Promise<Application | undefined> {
    return this.repository.findById(id);
  }

  async getApplicationsByJobId(jobId: string): Promise<Application[]> {
    return this.repository.findByJobId(jobId);
  }

  async getApplicationsByUserId(userId: string): Promise<Application[]> {
    return this.repository.findByUserId(userId);
  }

  // ✅ alias‌های static برای route‌هایی که static صدا می‌زنند
  static async getApplicationsByJob(jobId: string): Promise<Application[]> {
    const repo = new ApplicationRepository();
    return repo.findByJobId(jobId);
  }

  static async getApplicationsByUser(userId: string): Promise<Application[]> {
    const repo = new ApplicationRepository();
    return repo.findByUserId(userId);
  }

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    return this.repository.findByJobId(jobId);
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return this.repository.findByUserId(userId);
  }

  async createApplication(
    data: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): Promise<Application> {
    const application: Application = {
      ...data,
      id: crypto.randomUUID(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return this.repository.create(application);
  }

  async updateApplicationStatus(
    id: string,
    status: Application['status']
  ): Promise<Application | undefined> {
    return this.repository.update(id, { status });
  }

  async deleteApplication(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}

export const applicationService = new ApplicationService();
