import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),

  jobId: integer("job_id"),
  userId: integer("user_id").references(() => users.id),

  status: varchar("status", { length: 30 }).default("pending"),

  resumePath: text("resume_path"),
  coverLetter: text("cover_letter"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
