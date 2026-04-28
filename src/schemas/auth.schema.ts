import { z } from 'zod';
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  termsSchema,
} from '@/schemas/fields.schema';

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const registerSchema = z
  .object({
    username: usernameSchema,
    phoneNumber: phoneNumberSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptedTerms: termsSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
