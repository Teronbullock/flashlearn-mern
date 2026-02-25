import { createInsertSchema, createSelectSchema, createUpdateSchema} from 'drizzle-zod';
import {z} from 'zod';
import {setsTable} from '../db/sets-schema'; 


export const SetInsertSchema = createInsertSchema(setsTable);
export const SetSelectSchema = createSelectSchema(setsTable);

export type SetInsertType = z.infer<typeof SetInsertSchema>
export type SetSelectType = z.infer<typeof SetSelectSchema>

export const setSchema = SetSelectSchema.pick({
  title: true,
  description: true,
}).extend({
  title: z.string()
  .min(1, 'Please enter a title')
  .max(120, 'Title must be less than 120 characters'),
  description: z.string()
  .max(256, 'Description must be less than 256 characters')
  .nullable(),
});

export type SetType = z.infer<typeof setSchema>;

