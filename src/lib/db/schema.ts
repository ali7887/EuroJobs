import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

/* =========================
   USERS & AUTH
========================= */
/* =========================
   USERS & AUTH
========================= */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 200 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: varchar("role", { length: 20 }).default("user"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" }),

  tokenHash: text("token_hash").notNull(),

  expiresAt: timestamp("expires_at").notNull(),

  isRevoked: boolean("is_revoked").default(false),

  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  tokenHash: text("token_hash").notNull(),

  ipAddress: varchar("ip_address", { length: 100 }),

  userAgent: text("user_agent"),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});



/* =========================
   COMPANIES & CATEGORIES
========================= */
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  description: text("description"),
  ownerId: integer("owner_id").references(() => users.id),
});

/* =========================
   JOBS
========================= */
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 150 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 150 }),
  salary: integer("salary"),
  type: varchar("type", { length: 50 }), // 'Full-time', 'Remote', etc.
  companyId: integer("company_id").references(() => companies.id),
  employerId: integer("employer_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

/* =========================
   APPLICATIONS
========================= */
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id),
  userId: integer("user_id").references(() => users.id),
  status: varchar("status", { length: 30 }).default("pending"), // 'pending', 'accepted', 'rejected'
  resumePath: text("resume_path"),
  coverLetter: text("cover_letter"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const jobEmbeddings = pgTable('job_embeddings', {
  id: serial('id').primaryKey(),
  jobId: integer('job_id').notNull().references(() => jobs.id),
  embedding: jsonb('embedding').$type<number[]>().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

/* =========================
   EXPORTS & TYPES
========================= */
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type SafeUser = Omit<User, "passwordHash">;

export type Job = InferSelectModel<typeof jobs>;
export type NewJob = InferInsertModel<typeof jobs>;

export type Application = InferSelectModel<typeof applications>;
export type StoredRefreshToken = InferSelectModel<typeof refreshTokens>;
export type JobEmbeddingRecord = InferSelectModel<typeof jobEmbeddings>;
export type Company = InferSelectModel<typeof companies>;

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;
