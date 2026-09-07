import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  checkoutSchema,
  type CheckoutFormData,
} from '@/schemas/checkout.schema';

export const useCheckoutForm = (defaultValues?: Partial<CheckoutFormData>) => {
  return useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      deliveryMethod: 'delivery',
      pickupLocationId: 'kyiv-1',
      street: '',
      building: '',
      apartment: '',
      ...defaultValues,
    },
  });
};
