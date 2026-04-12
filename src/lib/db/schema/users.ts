import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  name: varchar("name", { length: 100 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: varchar("role", { length: 20 }).default("user"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at"),
});
