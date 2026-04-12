import { db } from "@/lib/db/db"
import { sessions } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export const sessionService = {

  async create(session: typeof sessions.$inferInsert) {
    const result = await db
      .insert(sessions)
      .values(session)
      .returning()

    return result[0]
  },

  async findByTokenHash(hash: string) {

    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.tokenHash, hash))

    return result[0] ?? null
  },

  async delete(sessionId: number) {

    await db
      .delete(sessions)
      .where(eq(sessions.id, sessionId))
  },

  async deleteByUserId(userId: number) {

    await db
      .delete(sessions)
      .where(eq(sessions.userId, userId))
  }

}
