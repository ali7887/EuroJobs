// src/lib/repositories/session.repository.ts
import { db } from "../db";
import { sessions } from "../db/schema/sessions";
import { eq, Placeholder, SQL, SQLWrapper } from "drizzle-orm";

export const SessionRepository = {
  create: async (data: { userId: string | SQL<unknown> | Placeholder<string, any>; refreshToken: string | SQL<unknown> | Placeholder<string, any>; expiresAt: SQL<unknown> | Date | Placeholder<string, any>; id?: string | SQL<unknown> | Placeholder<string, any> | undefined; createdAt?: SQL<unknown> | Date | Placeholder<string, any> | null | undefined; updatedAt?: SQL<unknown> | Date | Placeholder<string, any> | null | undefined; userAgent?: string | SQL<unknown> | Placeholder<string, any> | null | undefined; ip?: string | SQL<unknown> | Placeholder<string, any> | null | undefined; }) => {
    const [session] = await db.insert(sessions).values(data).returning();
    return session;
  },

  findByToken: async (token: string | SQLWrapper) => {
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.refreshToken, token));
    return session;
  },

  deleteById: async (id: string | SQLWrapper) => {
    return db.delete(sessions).where(eq(sessions.id, id));
  },

  deleteAllByUser: async (userId: string | SQLWrapper) => {
    return db.delete(sessions).where(eq(sessions.userId, userId));
  },

  rotateToken: async (id: string | SQLWrapper, newToken: any, expiresAt: any) => {
    const [updated] = await db
      .update(sessions)
      .set({
        refreshToken: newToken,
        expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(sessions.id, id))
      .returning();

    return updated;
  },
};

