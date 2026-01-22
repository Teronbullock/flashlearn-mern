import { z } from "zod";
export declare const AuthLoginSchema: z.ZodObject<{
    userEmail: z.ZodEmail;
    userPass: z.ZodString;
}, z.core.$strip>;
export type AuthLoginType = z.infer<typeof AuthLoginSchema>;
