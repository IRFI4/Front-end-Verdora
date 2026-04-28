import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  return useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
};
