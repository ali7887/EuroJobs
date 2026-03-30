import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { Database } from './schema';

const file = path.join(process.cwd(), 'data', 'db.json');
const adapter = new JSONFile<Database>(file);
const defaultData: Database = { jobs: [], companies: [], categories: [] };

export const db = new Low<Database>(adapter, defaultData);

export async function initDB() {
  await db.read();
  db.data ||= defaultData;
  await db.write();
}
