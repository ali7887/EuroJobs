import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote" | "hybrid";
  salary?: string;
  description: string;
  requirements: string[];
  postedAt: string;
  expiresAt: string;
  status: "active" | "closed" | "draft";
  employerId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "employer" | "jobseeker" | "admin";
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  appliedAt: string;
  resume?: string;
  coverLetter?: string;
}

interface Database {
  jobs: Job[];
  users: User[];
  applications: Application[];
}

const dbPath = path.join(process.cwd(), "data", "db.json");
const adapter = new JSONFile<Database>(dbPath);
const defaultData: Database = { jobs: [], users: [], applications: [] };

let db: Low<Database> | null = null;

export async function getDb() {
  if (!db) {
    db = new Low(adapter, defaultData);
    await db.read();
  }
  return db;
}
