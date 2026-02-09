import { createInsertSchema } from "drizzle-zod";
import { cards } from "../db";
import { z } from "zod";


export const cardsInsertSchema = createInsertSchema(cards, {
  term: z.string().min(3, 'Please enter a longer term'),
  definition: z.string()
})
.omit({
  id: true,
  userId: true,
  setId: true,
});
