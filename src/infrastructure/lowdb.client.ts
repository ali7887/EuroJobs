// src/infrastructure/lowdb.client.ts
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { StoredRefreshToken } from '@/lib/types/token.types';
import { User } from '@/modules/users/user.types';
import { Job, JobEmbeddingRecord } from '@/lib/db/schema';

// ─── Application type (تا schema.prisma کامل بشه) ─────────────────────────
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'accepted';
  createdAt: string;
}

// ─── DbSchema ──────────────────────────────────────────────────────────────
export interface DbSchema {
  users: User[];
  jobs: Job[];
  applications: Application[];
  refreshTokens: StoredRefreshToken[];
  jobEmbeddings: JobEmbeddingRecord[]; // ✅ اضافه شد
}

// ─── Default data ──────────────────────────────────────────────────────────
const defaultData: DbSchema = {
  users: [],
  jobs: [],
  applications: [],
  refreshTokens: [],
  jobEmbeddings: [], // ✅ اضافه شد
};

// ─── Singleton ─────────────────────────────────────────────────────────────
let db: Low<DbSchema> | null = null;

export async function getDb(): Promise<Low<DbSchema>> {
  if (db) return db;

  const filePath = join(process.cwd(), 'data', 'db.json');
  const adapter = new JSONFile<DbSchema>(filePath);
  db = new Low(adapter, defaultData);
  await db.read();
  db.data ??= defaultData;

  return db;
}
