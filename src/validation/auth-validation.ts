import z, { ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .min(1)
      .max(100)
      .refine((value) => !value.includes(' '), {
        message: 'Cannot contain spaces',
      }),
    fullName: z.string().min(1).max(100),
    email: z.string().min(1).email(),
    password: z.string().min(8),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
  });
}
