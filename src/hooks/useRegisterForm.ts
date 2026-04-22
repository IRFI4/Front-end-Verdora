import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth.schema';
import { z } from 'zod';

export type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false as true,
    },
  });
};
