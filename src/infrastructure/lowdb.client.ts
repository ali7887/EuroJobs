// src/infrastructure/lowdb.client.ts
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import type { Database } from '@/lib/db/schema';

// ✅ یک نوع واحد — از schema.ts
export type { Database as DbSchema };

const defaultData: Database = {
  jobs: [],
  companies: [],
  categories: [],
  users: [],
  applications: [],
  jobEmbeddings: [],
  refreshTokens: [],
  sessions: []

};

let instance: Low<Database> | null = null;

export async function getDb(): Promise<Low<Database>> {
  if (instance) return instance;

  const file = path.join(process.cwd(), 'data', 'db.json');
  const adapter = new JSONFile<Database>(file);
  instance = new Low<Database>(adapter, defaultData);

  await instance.read();
  instance.data ??= defaultData;

  // ✅ اطمینان از وجود همه آرایه‌ها
  instance.data.jobs ??= [];
  instance.data.companies ??= [];
  instance.data.categories ??= [];
  instance.data.users ??= [];
  instance.data.applications ??= [];
  instance.data.jobEmbeddings ??= [];
  instance.data.refreshTokens ??= [];

  await instance.write();
  return instance;
}

export async function saveDb(): Promise<void> {
  const db = await getDb();
  await db.write();
}
