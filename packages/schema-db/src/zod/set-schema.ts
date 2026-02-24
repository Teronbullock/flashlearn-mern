import {z} from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema} from 'drizzle-zod';
import {setsTable} from '../db/sets-schema'; 


export const SetInsertSchema = createInsertSchema(setsTable);
export const SetSelectSchema = createSelectSchema(setsTable);
export const SetUpdateSchema = createUpdateSchema(setsTable);


export const setSchema = z.object({
  title: z.string()
  .min(1, 'Please enter a title')
  .max(120, 'Title must be less than 120 characters'),
  description: z.string()
  .max(256, 'Description must be less than 256 characters')
  .nullable(),
});


export type SetInsertType = z.infer<typeof SetInsertSchema>
export type SetSelectType = z.infer<typeof SetSelectSchema>
export type SetUpdateType = z.infer<typeof SetUpdateSchema>
export type SetType = z.infer<typeof setSchema>;

