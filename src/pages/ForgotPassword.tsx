import AuthForm from '@/components/layout/Auth';
import TextField from '@/components/common/forms/TextField';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import {
  useForgotPasswordForm,
  type ForgotPasswordFormData,
} from '@hooks/useForgotPassword';

const ForgotPassword = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForgotPasswordForm();

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form
        className="flex flex-col items-center justify-center gap-24 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          label="Email Address"
          id="email"
          placeholder="your@email.com"
          value={watch('email')}
          onChange={value => setValue('email', value, { shouldValidate: true })}
          error={errors.email?.message}
        />
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid}
        >
          Send Reset Link
        </Button>
        <Link
          to="/login"
          className="text-[var(--accent)] [font-family:var(--font-sans)] flex items-center"
        >
          <ArrowIcon className="size-6 w-20 h-20 mr-12 cursor-pointer" />
          Back to Sign In
        </Link>
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
