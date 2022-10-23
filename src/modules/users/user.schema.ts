import * as z from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  phoneNumber: z.string().min(10).max(10),
  password: z.string().min(5),
  avatar: z.string().optional(),
});

export type UserPayload = z.infer<typeof UserSchema>;
