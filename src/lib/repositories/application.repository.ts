import { db, initDB } from '@/lib/db/db';
import { Application } from '@/lib/db/schema';

export class ApplicationRepository {
  async create(data: Application): Promise<Application> {
    await initDB();
    db.data!.applications.push(data);
    await db.write();
    return data;
  }

  async findById(id: string): Promise<Application | undefined> {
    await initDB();
    return db.data!.applications.find((a) => a.id === id);
  }

  async findAll(): Promise<Application[]> {
    await initDB();
    return db.data!.applications;
  }

  async findByJobId(jobId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter((a) => a.jobId === jobId);
  }

  async findByUserId(userId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter((a) => a.userId === userId);
  }

  async update(id: string, data: Partial<Application>): Promise<Application | undefined> {
    await initDB();
    const idx = db.data!.applications.findIndex((a) => a.id === id);
    if (idx === -1) return undefined;
    db.data!.applications[idx] = {
      ...db.data!.applications[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await db.write();
    return db.data!.applications[idx];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const before = db.data!.applications.length;
    db.data!.applications = db.data!.applications.filter((a) => a.id !== id);
    await db.write();
    return db.data!.applications.length < before;
  }
}

export const applicationRepository = new ApplicationRepository();
