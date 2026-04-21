import { pgTable, serial, integer, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").notNull(),

  token: text("token").notNull(),

  revoked: boolean("revoked").default(false),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow()
});
