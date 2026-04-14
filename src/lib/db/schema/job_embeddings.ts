import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const job_embeddings = pgTable("job_embeddings", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),

  embedding: text("embedding").notNull(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
