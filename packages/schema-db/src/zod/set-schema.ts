import {z} from 'zod';


export const setSchema = z.object({
  title: z.string().nonempty('required').min(1, 'Please enter a title').max(120, 'Title must be less than 120 characters'),
  description: z.string().max(256, 'Description must be less than 256 characters'),
});


export type SetSchema = z.infer<typeof setSchema>
