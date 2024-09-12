import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const updateUserProfileSchema = z.object({
  username: requiredString,
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: requiredString,
});
