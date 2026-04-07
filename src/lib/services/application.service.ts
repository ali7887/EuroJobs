import { getDb, saveDb } from '@/infrastructure/lowdb.client';
import type { Application, ApplicationStatus } from '@/lib/db/schema';
import { randomUUID } from 'crypto';

export class ApplicationService {
  static deleteApplication(id: string) {
    throw new Error('Method not implemented.');
  }

  static async create(data: {
    jobId: string;
    userId: string;
    resumePath?: string;
    coverLetter?: string;
  }): Promise<Application> {

    const db = await getDb();

    const now = new Date().toISOString();

    const application: Application = {
      id: randomUUID(),
      jobId: data.jobId,
      userId: data.userId,
      status: 'pending',
      resumePath: data.resumePath,
      coverLetter: data.coverLetter,
      createdAt: now,
      updatedAt: now,
    };

    db.data!.applications.push(application);

    await saveDb();

    return application;
  }

  static async getByUser(userId: string): Promise<Application[]> {
    const db = await getDb();

    return db.data!.applications.filter(
      (app) => app.userId === userId
    );
  }

  static async getByJob(jobId: string): Promise<Application[]> {
    const db = await getDb();

    return db.data!.applications.filter(
      (app) => app.jobId === jobId
    );
  }

  static async getApplicationsByJob(jobId: string) {
    return this.getByJob(jobId);
  }

  static async getAllApplications(): Promise<Application[]> {
    const db = await getDb();
    return db.data!.applications;
  }

  static async updateStatus(
    id: string,
    status: ApplicationStatus
  ): Promise<Application | null> {

    const db = await getDb();

    const application = db.data!.applications.find(
      (a) => a.id === id
    );

    if (!application) return null;

    application.status = status;
    application.updatedAt = new Date().toISOString();

    await saveDb();

    return application;
  }
}
