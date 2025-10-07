import z from 'zod';

export const createUserSchema = z.object({
  dateOfBirth: z.coerce.date().optional(),
  email: z.email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  middleName: z.string().optional(),
  password: z.string().min(8),
  userName: z.string().nonempty(),
});

export type CreateUserInputDto = z.infer<typeof createUserSchema>;
