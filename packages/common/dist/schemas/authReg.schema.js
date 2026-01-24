import { z } from 'zod';
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
