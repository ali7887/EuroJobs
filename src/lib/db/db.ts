// src/lib/db/db.ts

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { Database } from './schema'

const file = path.join(process.cwd(), process.env.DB_FILE ?? 'data/db.json')

const adapter = new JSONFile<Database>(file)


const defaultData: Database = {
  jobs: [],
  companies: [],
  categories: [],
  users: [],
  applications: [],
  jobEmbeddings: [],
  refreshTokens: [],
  sessions: []
}

export const db = new Low<Database>(adapter, defaultData)

export async function saveDB() {
  await db.write()
}

export async function initDB() {
  await db.read()

  db.data ??= defaultData

  db.data.users ??= []
  db.data.applications ??= []
  db.data.refreshTokens ??= []
  db.data.sessions ??= []

  await db.write()
}
