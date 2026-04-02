// src/lib/db/db.ts
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { Database } from './schema';

const file = path.join(process.cwd(), 'data', 'db.json');
const adapter = new JSONFile<Database>(file);

const defaultData: Database = {
  jobs: [],
  companies: [],
  categories: [],
  users: [],
  applications: [],
  jobEmbeddings: [],
  refreshTokens: [], // ✅ اضافه شد
};

export const db = new Low<Database>(adapter, defaultData);

export async function saveDB() {
  await db.write(); // ✅ اضافه شد
}

export async function initDB() {
  await db.read();
  db.data ??= defaultData;
  db.data.users ??= [];
  db.data.applications ??= [];
  db.data.refreshTokens ??= []; // ✅ اضافه شد
  await db.write();
}
