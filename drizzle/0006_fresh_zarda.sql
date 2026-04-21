ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "revoked" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP COLUMN "token_hash";--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP COLUMN "is_revoked";