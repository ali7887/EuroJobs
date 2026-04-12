import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  description: text("description"),
  ownerId: integer("owner_id").references(() => users.id),
});
