import { z } from 'zod';
export declare const cardSchema: z.ZodObject<{
    term: z.ZodString;
    definition: z.ZodString;
}, z.core.$strip>;
export declare const setSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
