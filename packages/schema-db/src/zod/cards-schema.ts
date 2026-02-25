import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { cardsTable } from "../db/cards-schema";


export const CardSelectSchema = createSelectSchema(cardsTable);
export const CardsInsertSchema = createInsertSchema(cardsTable);

export type CardInsertType = z.infer<typeof CardsInsertSchema>;
export type CardSelectType = z.infer<typeof CardSelectSchema>;

export const CardFormSchema = CardsInsertSchema.pick({
  term: true,
  definition: true,
}).extend({
  term: z.string()
  .trim()
  .min(1, 'Please enter a term')
  .max(300, 'Term must be less than 300 characters'),
  definition: z.string()
  .max(300, 'Definition must be less than 300 characters')
  .nullable(),
});

export type CardFormType= z.infer<typeof CardFormSchema>;

export type CardType = CardFormType & {
  id: string;
};