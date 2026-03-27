import { getDb, Job, User, Application } from "./db";
import { randomUUID } from "crypto";

export async function createJob(jobData: Omit<Job, "id" | "postedAt">) {
  const db = await getDb();
  const job: Job = {
    ...jobData,
    id: randomUUID(),
    postedAt: new Date().toISOString(),
  };
  db.data.jobs.push(job);
  await db.write();
  return job;
}

export async function getJobs(filters?: { status?: string; type?: string }) {
  const db = await getDb();
  let jobs = db.data.jobs;
  
  if (filters?.status) {
    jobs = jobs.filter((j) => j.status === filters.status);
  }
  if (filters?.type) {
    jobs = jobs.filter((j) => j.type === filters.type);
  }
  
  return jobs;
}

export async function getJobById(id: string) {
  const db = await getDb();
  return db.data.jobs.find((j) => j.id === id);
}

export async function updateJob(id: string, updates: Partial<Job>) {
  const db = await getDb();
  const index = db.data.jobs.findIndex((j) => j.id === id);
  if (index !== -1) {
    db.data.jobs[index] = { ...db.data.jobs[index], ...updates };
    await db.write();
    return db.data.jobs[index];
  }
  return null;
}

export async function deleteJob(id: string) {
  const db = await getDb();
  const index = db.data.jobs.findIndex((j) => j.id === id);
  if (index !== -1) {
    db.data.jobs.splice(index, 1);
    await db.write();
    return true;
  }
  return false;
}

export async function createUser(userData: Omit<User, "id" | "createdAt">) {
  const db = await getDb();
  const user: User = {
    ...userData,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db.data.users.push(user);
  await db.write();
  return user;
}

export async function getUserById(id: string) {
  const db = await getDb();
  return db.data.users.find((u) => u.id === id);
}

export async function createApplication(
  appData: Omit<Application, "id" | "appliedAt">
) {
  const db = await getDb();
  const application: Application = {
    ...appData,
    id: randomUUID(),
    appliedAt: new Date().toISOString(),
  };
  db.data.applications.push(application);
  await db.write();
  return application;
}

export async function getApplicationsByJobId(jobId: string) {
  const db = await getDb();
  return db.data.applications.filter((a) => a.jobId === jobId);
}

export async function getApplicationsByUserId(userId: string) {
  const db = await getDb();
  return db.data.applications.filter((a) => a.userId === userId);
}
