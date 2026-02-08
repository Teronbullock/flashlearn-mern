import { z } from 'zod';
export declare const AuthRegSchema: z.ZodObject<{
    userEmail: z.ZodEmail;
    userPass: z.ZodString;
    userPassConfirm: z.ZodString;
}, z.core.$strip>;
export type AuthRegType = z.infer<typeof AuthRegSchema>;
export declare const AuthLoginSchema: z.ZodObject<{
    userEmail: z.ZodEmail;
    userPass: z.ZodString;
}, z.core.$strip>;
export type AuthLoginType = z.infer<typeof AuthLoginSchema>;
export declare const AuthLogoutSchema: z.ZodObject<{
    userPass: z.ZodString;
}, z.core.$strip>;
export type AuthLogoutType = z.infer<typeof AuthLogoutSchema>;
export declare const ProfileSchema: z.ZodObject<{
    userOldPass: z.ZodString;
    userPass: z.ZodString;
    userPassConfirm: z.ZodString;
}, z.core.$strip>;
export type ProfileType = z.infer<typeof ProfileSchema>;
