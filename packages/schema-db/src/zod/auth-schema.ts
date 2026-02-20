import { z } from 'zod';
import { usersTable } from '../db/users-schema';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

// Create Zod schemas from the Drizzle users schema
export const userInsertSchema = createInsertSchema(usersTable);
export const userSelectSchema = createSelectSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);


export const authRegSchema = z.object({
  email: z.email("Invalid email address"),
  pass: z.string().min(8, "Password too short").max(125),
  passConfirm: z.string(),
})
.superRefine(({ pass, passConfirm }, ctx) => {
  if (passConfirm !== pass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["passConfirm"],
    });
  }
});


export type  AuthRegType = z.infer<typeof authRegSchema>;


export const authLoginSchema = z.object({
  email: z.email().nonempty("Email is required"),
  pass: z.string().min(8, "Password is required"),
});

export type AuthLoginType = z.infer<typeof authLoginSchema>;

export const AuthLogoutSchema = z.object({
  pass: z.string().min(8, "Password is required"),
});

export type AuthLogoutType = z.infer<typeof AuthLogoutSchema>;


export const ProfileSchema = z.object({
  oldPass: z.string().min(8, "Password is required"),
  pass: z.string().min(8, "Password is required"),
  passConfirm: z.string(),
}).superRefine(({ pass, passConfirm }, ctx) => {
  if (passConfirm !== pass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["userPassConfirm"],
    });
  }
});

export type  ProfileType = z.infer<typeof ProfileSchema>;

// Additional schemas for profile updates
export const ProfileUpdateEmailSchema = z.object({
  email: z.email("Invalid email address"),
  pass: z.string().min(8, "Password is required"),
});

export const ProfileUpdatePasswordSchema = z.object({
  oldPass: z.string().min(8, "Current password is required"),
  pass: z.string().min(8, "New password is required"),
  passConfirm: z.string(),
}).superRefine(({ pass, passConfirm }, ctx) => {
  if (passConfirm !== pass) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["pass_confirm"],
    });
  }
});

export const ProfileDeleteAccountSchema = z.object({
  pass: z.string().min(8, "Password is required"),
});


