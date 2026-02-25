import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { usersTable } from '../db/users-schema';
import { z } from 'zod';


// Create Zod schemas from the Drizzle users schema
export const UserInsertSchema = createInsertSchema(usersTable);
export const UserSelectSchema = createSelectSchema(usersTable);

export type userSelectType = z.infer<typeof UserSelectSchema>;
export type userInsertType = z.infer<typeof UserInsertSchema>;


export const AuthRegSchema = UserSelectSchema.pick({ 
  email: true, 
  pass: true 
}).extend({
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

export type AuthRegType = z.infer<typeof AuthRegSchema>;

export const AuthLoginSchema = UserSelectSchema.pick({
  email: true,
  pass: true,
}).extend({
  email: z.email("Invalid email address").min(1, "Email is required"),
  pass: z.string().min(8, "Password too short").max(125),
});

export type AuthLoginType = z.infer<typeof AuthLoginSchema>;

export const AuthPassSchema = UserSelectSchema.pick({
  pass: true,
}).extend({
  pass: z.string().min(8, "Password is required"),
});

export type AuthLogoutType = z.infer<typeof AuthPassSchema>;

export const ProfileSchema = UserSelectSchema.pick({
  pass: true,
}).extend({
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

