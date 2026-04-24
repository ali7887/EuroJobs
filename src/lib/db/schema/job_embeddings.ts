import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";

export const job_embeddings = pgTable("job_embeddings", {
  id: uuid("id").defaultRandom().primaryKey(),

  jobId: uuid("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),

  embedding: text("embedding").notNull(),

  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
