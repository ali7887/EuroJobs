import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { Database } from "./schema";

const dbPath = path.join(process.cwd(), "data", "db.json");
const adapter = new JSONFile<Database>(dbPath);

const defaultData: Database = {
  jobs: [],
  companies: [],
  categories: [],
  users: [],
  applications: [],
};

export const db = new Low<Database>(adapter, defaultData);

export async function initDB(): Promise<void> {
  await db.read();
  db.data ??= defaultData;
  db.data.jobs ??= [];
  db.data.companies ??= [];
  db.data.categories ??= [];
  db.data.users ??= [];
  db.data.applications ??= [];
  await db.write();
}
