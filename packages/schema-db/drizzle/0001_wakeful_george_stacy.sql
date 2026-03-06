ALTER TABLE "fc_users" RENAME COLUMN "user_email" TO "email";--> statement-breakpoint
ALTER TABLE "fc_users" RENAME COLUMN "user_pass" TO "pass";--> statement-breakpoint
ALTER TABLE "fc_users" DROP CONSTRAINT "fc_users_user_email_unique";--> statement-breakpoint
ALTER TABLE "fc_users" ALTER COLUMN "slug" SET DATA TYPE varchar(125);--> statement-breakpoint
ALTER TABLE "fc_users" ADD CONSTRAINT "fc_users_email_unique" UNIQUE("email");