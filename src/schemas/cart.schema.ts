import { z } from 'zod';

export const proceedToCheckoutSchema = z.object({
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});
