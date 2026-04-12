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
  description: text("description"),

  location: varchar("location", { length: 255 }),
  salary: integer("salary"),

  type: varchar("type", { length: 100 }),

  companyId: integer("company_id").references(() => companies.id),
  employerId: integer("employer_id").references(() => users.id),

  isActive: boolean("is_active").default(true),
  published: boolean("published").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
