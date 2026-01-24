import { z } from 'zod';
export declare const AuthRegSchema: z.ZodObject<{
    userEmail: z.ZodEmail;
    userPass: z.ZodString;
    userPassConfirm: z.ZodString;
}, z.core.$strip>;
export type AuthRegType = z.infer<typeof AuthRegSchema>;
