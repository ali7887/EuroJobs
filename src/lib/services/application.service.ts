// src/lib/services/application.service.ts
import { ApplicationRepository } from '../repositories/application.repository';
import { UserRepository } from '../repositories/user.repository';
import { JobRepository } from '../repositories/job.repository';
import { Application } from '../db/schema';
import {
  applicationCreateSchema,
  applicationStatusSchema,
} from '../validators/application.validator';

export class ApplicationService {
  create(arg0: any) {
    throw new Error('Method not implemented.');
  }
  getAllApplications() {
    throw new Error("Method not implemented.");
  }
  private repo = new ApplicationRepository();
  private userRepo = new UserRepository();
  private jobRepo = new JobRepository();

  // ✅ متد استاتیک برای route جدید
  static async getApplicationsByJob(jobId: string): Promise<Application[]> {
    const repo = new ApplicationRepository();
    return repo.findByJob(jobId);
  }

  // ✅ متد برای گرفتن همه applications
  async getApplications(): Promise<Application[]> {
    return this.repo.findAll();
  }

  // ✅ متد create که route.ts انتظار داره
  async createApplication(data: unknown): Promise<Application> {
    return this.apply(data);
  }

  // ── Apply ──────────────────────────────────────────────────────────────
  async apply(data: unknown): Promise<Application> {
    const validated = applicationCreateSchema.parse(data);

    const job = await this.jobRepo.findById(validated.jobId);
    if (!job) throw new Error('Job not found');

    const user = await this.userRepo.findById(validated.userId);
    if (!user) throw new Error('User not found');

    const duplicate = await this.repo.findDuplicate(
      validated.jobId,
      validated.userId,
    );
    if (duplicate) throw new Error('Already applied to this job');

    return this.repo.create({
      jobId: validated.jobId,
      userId: validated.userId,
      status: 'PENDING',
      coverLetter: validated.coverLetter,
    });
  }

  // ── Get by ID ──────────────────────────────────────────────────────────
  async getApplicationById(id: string): Promise<Application> {
    const app = await this.repo.findById(id);
    if (!app) throw new Error('Application not found');
    return app;
  }

  // ── Get by User ────────────────────────────────────────────────────────
  async getByUser(userId: string): Promise<Application[]> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    return this.repo.findByUser(userId);
  }

  // ── Get by Job ─────────────────────────────────────────────────────────
  async getByJob(jobId: string): Promise<Application[]> {
    const job = await this.jobRepo.findById(jobId);
    if (!job) throw new Error('Job not found');
    return this.repo.findByJob(jobId);
  }

  // ── Update Status ──────────────────────────────────────────────────────
  async updateStatus(id: string, data: unknown): Promise<Application> {
    const { status } = applicationStatusSchema.parse(data);
    const updated = await this.repo.updateStatus(id, status);
    if (!updated) throw new Error('Application not found');
    return updated;
  }

  // ── Delete ─────────────────────────────────────────────────────────────
  async deleteApplication(id: string): Promise<{ success: true }> {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error('Application not found');
    return { success: true };
  }
}

export const applicationService = new ApplicationService();
