import { db, initDB } from '../db/db';
import { Application, ApplicationStatus } from '../db/schema';
import { randomUUID } from 'crypto';

export class ApplicationRepository {
  async findAll(): Promise<Application[]> {
    await initDB();
    return db.data!.applications;
  }

  async findById(id: string): Promise<Application | null> {
    await initDB();
    return db.data!.applications.find(a => a.id === id) ?? null;
  }

  async findByUser(userId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter(a => a.userId === userId);
  }

  async findByJob(jobId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter(a => a.jobId === jobId);
  }

  async findDuplicate(jobId: string, userId: string): Promise<Application | null> {
    await initDB();
    return (
      db.data!.applications.find(
        a => a.jobId === jobId && a.userId === userId,
      ) ?? null
    );
  }

  async create(
    data: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Application> {
    await initDB();
    const application: Application = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    db.data!.applications.push(application);
    await db.write();
    return application;
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
  ): Promise<Application | null> {
    await initDB();
    const index = db.data!.applications.findIndex(a => a.id === id);
    if (index === -1) return null;
    db.data!.applications[index] = {
      ...db.data!.applications[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    await db.write();
    return db.data!.applications[index];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const index = db.data!.applications.findIndex(a => a.id === id);
    if (index === -1) return false;
    db.data!.applications.splice(index, 1);
    await db.write();
    return true;
  }
}

// ✅ singleton
export const applicationRepository = new ApplicationRepository();
