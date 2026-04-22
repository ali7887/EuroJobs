import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
  index
} from "drizzle-orm/pg-core";

// ENUM job status
export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "open",
  "closed",
  "archived",
]);

export const jobs = pgTable(
  "jobs",
  {
    id: serial("id").primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description"),

    location: varchar("location", { length: 255 }),

    salary: integer("salary"),

    isRemote: boolean("is_remote").default(false),

    type: varchar("type", { length: 50 }),

    companyId: integer("company_id"),

    employerId: integer("employer_id"),

    isActive: boolean("is_active").default(true),

    published: boolean("published").default(false),

    status: jobStatusEnum("status").default("open").notNull(),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()),
  },

  (table) => ({
    statusIdx: index("jobs_status_idx").on(table.status),

    companyIdx: index("jobs_company_idx").on(table.companyId),

    createdIdx: index("jobs_created_idx").on(table.createdAt),

    employerIdx: index("jobs_employer_idx").on(table.employerId),
  })
);

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
