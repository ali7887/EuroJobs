ALTER TABLE "jobs" DROP CONSTRAINT "jobs_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "location" varchar(150);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "salary" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "type" varchar(50);--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "employer_id" integer;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "published" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar(20) DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "company";