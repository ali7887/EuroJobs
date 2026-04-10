import { db } from "@/lib/db/db";
import { refreshTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const TokenRepository = {
  async store(data: typeof refreshTokens.$inferInsert) {
    const result = await db.insert(refreshTokens).values(data).returning();
    return result[0];
  },

  async findByHash(hash: string) {
    const result = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.tokenHash, hash));

    return result[0] ?? null;
  },

  async revoke(id: number) {
    await db
      .update(refreshTokens)
      .set({ isRevoked: true })
      .where(eq(refreshTokens.id, id));
  },
};
