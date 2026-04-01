import { db, initDB } from "@/lib/db/db";
import { Application } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";

export class ApplicationRepository {
  async findAll(): Promise<Application[]> {
    await initDB();
    return db.data!.applications;
  }

  async findById(id: string): Promise<Application | undefined> {
    await initDB();
    return db.data!.applications.find((a) => a.id === id);
  }

  async findByJobId(jobId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter((a) => a.jobId === jobId);
  }

  async findByUserId(userId: string): Promise<Application[]> {
    await initDB();
    return db.data!.applications.filter((a) => a.userId === userId);
  }

  async create(input: Omit<Application, "id" | "createdAt" | "updatedAt">): Promise<Application> {
    await initDB();
    const now = new Date().toISOString();
    const app: Application = { id: uuidv4(), ...input, createdAt: now, updatedAt: now };
    db.data!.applications.push(app);
    await db.write();
    return app;
  }

  async update(id: string, input: Partial<Omit<Application, "id" | "createdAt">>): Promise<Application | null> {
    await initDB();
    const idx = db.data!.applications.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    db.data!.applications[idx] = { ...db.data!.applications[idx], ...input, updatedAt: new Date().toISOString() };
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
