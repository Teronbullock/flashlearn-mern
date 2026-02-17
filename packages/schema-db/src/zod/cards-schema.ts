import { createInsertSchema } from "drizzle-zod";
import { cardsTable } from "../db/cards-schema";
import { z } from "zod";


export const cardsInsertSchema = createInsertSchema(cardsTable);

export const cardFormSchema = z.object({
   term: z.string()
   .trim()
   .min(1, 'Please enter a term')
   .max(300, 'Term must be less than 300 characters'),
   definition: z.string()
   .max(300, 'Definition must be less than 300 characters'),
});

  
export type CardFormType= z.infer<typeof cardFormSchema>;
  