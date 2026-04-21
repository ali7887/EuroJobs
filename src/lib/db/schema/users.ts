import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean, // FIX
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  name: varchar("name", { length: 100 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  emailVerified: boolean("email_verified").default(false).notNull(), // FIXED
  role: varchar("role", { length: 20 }).default("user"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type SafeUser = Omit<User, "passwordHash">;
