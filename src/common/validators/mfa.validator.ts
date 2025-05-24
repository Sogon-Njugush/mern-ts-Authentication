import { z } from "zod";

export const verifyMfaSchema = z.object({
  code: z.string().trim().min(1).max(6),
  secretkey: z.string().trim().min(1),
});

export const verifyMFAForLoginSchema = z.object({
  code: z.string().trim().min(1).max(6),
  email: z.string().trim().email().min(1).max(50),
  userAgent: z.string().optional(),
});
