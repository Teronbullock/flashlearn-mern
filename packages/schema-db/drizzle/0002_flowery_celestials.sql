ALTER TABLE "fc_refresh_tokens" DROP CONSTRAINT "fc_refresh_tokens_user_id_fc_users_id_fk";
--> statement-breakpoint
ALTER TABLE "fc_refresh_tokens" ADD CONSTRAINT "fc_refresh_tokens_user_id_fc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fc_users"("id") ON DELETE cascade ON UPDATE no action;