import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
  index
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { jobs } from "./jobs";

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "reviewing",
  "accepted",
  "rejected",
]);

export type ApplicationStatus =
  (typeof applicationStatusEnum.enumValues)[number];

export const applications = pgTable(
  "applications",
  {
    id: serial("id").primaryKey(),

    jobId: integer("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    status: applicationStatusEnum("status")
      .default("pending")
      .notNull(),

    resumePath: text("resume_path"),

    coverLetter: text("cover_letter"),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date()),
  },

  (table) => ({
    jobIdx: index("applications_job_idx").on(table.jobId),

    userIdx: index("applications_user_idx").on(table.userId),

    statusIdx: index("applications_status_idx").on(table.status),
  })
);

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
