import z, { ZodType } from 'zod';
import { requiredMessage } from '../utils/helper';

export class AuthValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string(requiredMessage('Username'))
      .min(1, {
        message: 'Username must be at least 1 character',
      })
      .max(100)
      .refine((value) => !value.includes(' '), {
        message: 'Username cannot contain spaces',
      }),
    fullName: z
      .string(requiredMessage('Fullname'))
      .min(1, {
        message: 'Fullname must be at least 1 character',
      })
      .max(100),
    email: z
      .string(requiredMessage('Email'))
      .min(5, {
        message: 'Email must be at least 5 character',
      })
      .email(),
    password: z.string(requiredMessage('Password')).min(8, {
      message: 'Password must be at least 8 character',
    }),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string(requiredMessage('Email')).min(1).email(),
    password: z.string(requiredMessage('Password')).min(8, {
      message: 'Password must be at least 8 character',
    }),
  });
}
