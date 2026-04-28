import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const useResetPasswordForm = () => {
  return useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
};
