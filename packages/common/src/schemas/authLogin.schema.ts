import { z } from "zod";

export const AuthLoginSchema = z.object({
  userEmail: z.email("Invalid email address"),
  userPass: z.string().min(8, "Password is required"),
});

export type AuthLoginType = z.infer<typeof AuthLoginSchema>;
