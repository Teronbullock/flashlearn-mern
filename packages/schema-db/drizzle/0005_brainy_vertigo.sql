ALTER TABLE "fc_cards" DROP CONSTRAINT "fc_cards_set_id_fc_sets_id_fk";
--> statement-breakpoint
ALTER TABLE "fc_cards" ADD CONSTRAINT "fc_cards_set_id_fc_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."fc_sets"("id") ON DELETE cascade ON UPDATE no action;