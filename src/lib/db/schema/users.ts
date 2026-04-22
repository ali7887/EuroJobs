import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  index
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),

    email: varchar("email", { length: 200 }).notNull(),

    name: varchar("name", { length: 100 }),

    passwordHash: varchar("password_hash", { length: 255 }),

    emailVerified: boolean("email_verified").default(false).notNull(),

    role: varchar("role", { length: 20 }).default("user"),

    avatarUrl: text("avatar_url"),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date()),
  },

  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type SafeUser = Omit<User, "passwordHash">;
