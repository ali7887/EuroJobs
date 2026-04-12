import {
  pgTable,
  serial,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobEmbeddings = pgTable("job_embeddings", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  embedding: jsonb("embedding").$type<number[]>().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type JobEmbeddingRecord = typeof jobEmbeddings.$inferSelect;
