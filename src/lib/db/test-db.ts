import { db } from "./db"
import { defaultData } from "./schema"

export async function resetTestDB() {

  await db.read()

  db.data = structuredClone(defaultData)

  await db.write()

}
