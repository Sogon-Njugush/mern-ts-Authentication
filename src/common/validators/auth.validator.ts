import { z } from "zod";

export const emailSchema = z.string().trim().email().min(3).max(50);
export const passwordSchema = z.string().trim().min(5).max(50);

export const registerSchema = z
  .object({
    name: z.string().trim().min(3).max(50),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});
