import { z } from 'zod';

// Define the Zod schema for Cards
export const CardsSchema = z.object({
  id: z.number().int().positive().optional(), 
  user_id: z.uuid(), 
  set_id: z.number().int().positive(), 
  term: z.string().max(1000).min(1), 
  definition: z.string().max(1000).min(1), 
});

// Export the inferred TypeScript type
export type Card = z.infer<typeof CardsSchema>;
