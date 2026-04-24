import {
  pgTable,
  varchar,
  uuid,
  text,
  
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  description: text("description"),
  ownerId: uuid("owner_id")
  .notNull()
  .references(() => users.id)

});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;
