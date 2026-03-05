import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { usersTable } from '../db/users-schema';
import { z } from 'zod';
export const UserSelectSchema = createSelectSchema(usersTable);
export const UserInsertSchema = createInsertSchema(usersTable);
export const RegisterSchema = UserSelectSchema.pick({
    email: true,
    password: true
}).extend({
    email: UserInsertSchema.shape.email.pipe(z.email("Invalid email address")),
    password: UserInsertSchema.shape.password.pipe(z.string().min(8, "Password too short")),
    passwordConfirm: z.string(),
})
    .refine((data) => {
    return data.password === data.passwordConfirm;
}, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});
export const LoginSchema = UserSelectSchema.pick({
    email: true,
    password: true,
}).extend({
    email: UserSelectSchema.shape.email.pipe(z.email("Invalid email address").min(1, "Email is required")),
    password: UserSelectSchema.shape.password.pipe(z.string().min(8, "Password too short")),
});
export const PasswordSchema = UserSelectSchema.pick({
    password: true,
}).extend({
    password: UserSelectSchema.shape.password.pipe(z.string().min(8, "Password is required")),
});
export const UpdatePasswordSchema = UserInsertSchema.pick({
    password: true,
}).extend({
    password: UserInsertSchema.shape.password.pipe(z.string().min(8, "Password is required")),
    oldPassword: z.string().min(8, "Current password is required"),
    passwordConfirm: z.string(),
}).refine((data) => {
    return data.password === data.passwordConfirm;
}, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});
