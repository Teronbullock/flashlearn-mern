import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { cardsTable } from "../db/cards-schema";
export const CardSelectSchema = createSelectSchema(cardsTable);
export const CardsInsertSchema = createInsertSchema(cardsTable);
export const CardFormSchema = CardsInsertSchema.pick({
    term: true,
    definition: true,
}).extend({
    term: CardsInsertSchema.shape.term.pipe(z.string()
        .min(1, 'Please enter a term')
        .max(1000, 'Term must be less than 1000 characters')),
    definition: CardsInsertSchema.shape.definition.pipe(z.string()
        .min(1, 'Please enter a definition')
        .max(1000, 'Definition must be less than 300 characters')),
});
