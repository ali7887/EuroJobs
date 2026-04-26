CREATE TYPE "public"."job_level" AS ENUM('intern', 'junior', 'mid', 'senior', 'lead');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "company_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "employer_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "job_embeddings" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "level" "job_level";--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "token_hash" text;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_users_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;