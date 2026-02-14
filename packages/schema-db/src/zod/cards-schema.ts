import { createInsertSchema } from "drizzle-zod";
import { cardsTable } from "../db";
import { z } from "zod";


export const cardsInsertSchema = createInsertSchema(cardsTable, {
  term: z.string().min(3, 'Please enter a longer term'),
  definition: z.string()
})
.omit({
  id: true,
  userId: true,
  setId: true,
});
