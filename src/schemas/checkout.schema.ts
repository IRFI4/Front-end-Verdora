import { z } from 'zod';
import { emailSchema, phoneNumberSchema } from '@/schemas/fields.schema';

export const checkoutSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    phone: phoneNumberSchema,
    deliveryMethod: z.enum(['delivery', 'pickup']),
    pickupLocationId: z.string().optional(),
    street: z.string().optional(),
    building: z.string().optional(),
    apartment: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === 'delivery') {
      if (!data.street || data.street.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Street address is required',
          path: ['street'],
        });
      }
      if (!data.building || data.building.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Building number is required',
          path: ['building'],
        });
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
