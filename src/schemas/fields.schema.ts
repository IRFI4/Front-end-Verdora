import { z } from 'zod';

export const emailSchema = z.email();

export const passwordSchema = z
  .string()
  .min(8, 'Min 8 characters')
  .max(64, 'Max 64 characters')
  .refine(val => /[a-z]/.test(val), {
    message: 'There must be at least one lowercase letter',
  })
  .refine(val => /[A-Z]/.test(val), {
    message: 'There must be at least one uppercase letter',
  })
  .refine(val => /\d/.test(val), {
    message: 'There must be at least one number',
  })
  .refine(val => /[\W_]/.test(val), {
    message: 'There must be at least one special character',
  });

export const usernameSchema = z
  .string()
  .min(2, 'Min 2 characters')
  .max(10, 'Max 10 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscore');

export const phoneNumberSchema = z.e164();

export const termsSchema = z.boolean().refine(val => val === true, {
  message: 'You must accept the Terms and Conditions',
});
