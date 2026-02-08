import {z} from 'zod';

export const AuthRegSchema = z.object({
  userEmail: z.email("Invalid email address"),
  userPass: z.string().min(8, "Password too short").max(100),
  userPassConfirm: z.string(),
}).superRefine(({ userPass, userPassConfirm }, ctx) => {
  if (userPassConfirm !== userPass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["userPassConfirm"],
    });
  }
});

export type  AuthRegType = z.infer<typeof AuthRegSchema>;


export const AuthLoginSchema = z.object({
  userEmail: z.email().nonempty("Email is required"),
  userPass: z.string().min(8, "Password is required"),
});

export type AuthLoginType = z.infer<typeof AuthLoginSchema>;

export const AuthLogoutSchema = z.object({
  userPass: z.string().min(8, "Password is required"),
});

export type AuthLogoutType = z.infer<typeof AuthLogoutSchema>;


export const ProfileSchema = z.object({
  userOldPass: z.string().min(8, "Password is required"),
  userPass: z.string().min(8, "Password is required"),
  userPassConfirm: z.string(),
}).superRefine(({ userPass, userPassConfirm }, ctx) => {
  if (userPassConfirm !== userPass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["userPassConfirm"],
    });
  }
});

export type  ProfileType = z.infer<typeof ProfileSchema>;


