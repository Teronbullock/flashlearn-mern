import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { setsTable } from '../db/set-schema';


export const SetSelectSchema = createSelectSchema(setsTable);
export const SetInsertSchema = createInsertSchema(setsTable);

export type SetSelectType = z.infer<typeof SetSelectSchema>
export type SetInsertType = z.infer<typeof SetInsertSchema>

export const SetSchema = SetInsertSchema.pick({
  title: true,
  description: true,
}).extend({
  title: SetInsertSchema.shape.title.pipe(z.string()
    .min(1, 'Please enter a title')
    .max(180, 'Title must be less than 180 characters')),
  description: SetInsertSchema.shape.description.pipe(z.string()
    .max(500, 'Description must be less than 500 characters')
  ).nullable().optional()
});

export type SetType = z.infer<typeof SetSchema>;

export interface BaseSetDal {
  id: string;
  userId: string;
}

export interface SetDal extends Omit<BaseSetDal, "id"> {
  title: string;
  description?: string;
}

export type UpdateSet = SetType & BaseSetDal;
