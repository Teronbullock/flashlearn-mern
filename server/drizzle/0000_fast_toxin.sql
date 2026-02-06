CREATE TABLE "fc_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"set_id" integer NOT NULL,
	"term" varchar(1000) NOT NULL,
	"definition" varchar(1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fc_refresh_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fc_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(500) NOT NULL,
	"description" varchar(500) DEFAULT 'No description added'
);
--> statement-breakpoint
CREATE TABLE "fc_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_pass" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	CONSTRAINT "fc_users_user_email_unique" UNIQUE("user_email"),
	CONSTRAINT "fc_users_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "fc_cards" ADD CONSTRAINT "fc_cards_user_id_fc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fc_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fc_cards" ADD CONSTRAINT "fc_cards_set_id_fc_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."fc_sets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fc_refresh_tokens" ADD CONSTRAINT "fc_refresh_tokens_user_id_fc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fc_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fc_sets" ADD CONSTRAINT "fc_sets_user_id_fc_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."fc_users"("id") ON DELETE no action ON UPDATE no action;