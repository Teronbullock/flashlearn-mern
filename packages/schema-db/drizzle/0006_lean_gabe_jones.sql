ALTER TABLE "fc_cards" ADD COLUMN "next_review_date" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "fc_cards" ADD COLUMN "interval" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "fc_cards" ADD COLUMN "ease_factor" numeric(3, 2) DEFAULT '2.50';--> statement-breakpoint
ALTER TABLE "fc_cards" ADD COLUMN "review_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "fc_cards" ADD COLUMN "last_reviewed_at" timestamp;--> statement-breakpoint
ALTER TABLE "fc_cards" ADD COLUMN "rating_history" varchar(1000) DEFAULT '[]';