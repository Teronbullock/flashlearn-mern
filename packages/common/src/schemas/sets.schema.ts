import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { sets } from 'db-schema'; 

export const insertCompanySchema = createInsertSchema(sets);
export const selectCompanySchema = createSelectSchema(sets);