import AuthForm from '@/components/common/forms/AuthForm';
import PasswordField from '@/components/common/forms/PasswordField';
import PasswordStrength from '@components/common/forms/PasswordStrength';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import ArrowIcon from '@assets/icons/arrow.svg?react';
import {
  useResetPasswordForm,
  type ResetPasswordFormData,
} from '@hooks/useResetPassword';

const ResetPassword = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useResetPasswordForm();

  const onSubmit = (data: ResetPasswordFormData) => {
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
        <div className="w-full">
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value={watch('password')}
            onChange={value =>
              setValue('password', value, { shouldValidate: true })
            }
          />
          <PasswordStrength password={watch('password')} />
        </div>
        <div className="w-full">
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={watch('confirmPassword')}
            onChange={value =>
              setValue('confirmPassword', value, { shouldValidate: true })
            }
            error={errors.confirmPassword?.message}
          />
        </div>
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

export default ResetPassword;
