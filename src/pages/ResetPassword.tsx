import AuthForm from '@/components/layout/Auth';
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
      title="Reset Your Password"
      subtitle="Enter a new password for your account"
    >
      <form
        className="flex flex-col items-center justify-center gap-24 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <PasswordField
            label="Password"
            placeholder="At least 8 characters"
            value={watch('password')}
            onChange={value =>
              setValue('password', value, { shouldValidate: true })
            }
          />
          <PasswordStrength password={watch('password')} />
        </div>
        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter your new password"
          value={watch('confirmPassword')}
          onChange={value =>
            setValue('confirmPassword', value, { shouldValidate: true })
          }
          error={errors.confirmPassword?.message}
        />
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid}
        >
          Reset Password
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
