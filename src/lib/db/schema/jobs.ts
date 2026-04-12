import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { users } from "./users";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }),
  location: varchar("location", { length: 255 }),
  salary: integer("salary"),
  isRemote: boolean("is_remote").default(false), // 👈 این باید اینجا باشد
  type: varchar("type", { length: 100 }),
  companyId: integer("company_id"),
  employerId: integer("employer_id"),
  isActive: boolean("is_active").default(true),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
})

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
