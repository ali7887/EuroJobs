import { pgTable, serial, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  salary: integer("salary"),
  isRemote: boolean("is_remote"),
  type: varchar("type", { length: 50 }),
  companyId: integer("company_id"),
  employerId: integer("employer_id"),
  isActive: boolean("is_active").default(true),
  published: boolean("published").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
