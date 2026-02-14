
import {z} from 'zod';

export const cardSchema = z.object({
  "term": z.string().min(1, 'Please enter a term'),
  "definition": z.string(),  
});

export const setSchema = z.object({
  title: z.string().min(1, 'Please enter a title'),
  description: z.string(),

});