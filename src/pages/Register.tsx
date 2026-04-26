import { Button } from '@components/ui/button';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link } from 'react-router';
import CheckIcon from '@assets/icons/checkbox.svg?react';
import { cn } from '@/lib/utils';
import { useRegisterForm, type RegisterFormData } from '@hooks/useRegisterForm';
import PasswordStrength from '@components/common/forms/PasswordStrength';
import AuthForm from '@/components/layout/Auth';

const Register = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useRegisterForm();

  const accepted = watch('acceptedTerms');

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Join Verdora and start your green journey"
    >
      <form
        className="flex flex-col items-center justify-center gap-24 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          label="Username"
          id="username"
          placeholder="john_doe"
          value={watch('username')}
          onChange={value =>
            setValue('username', value, { shouldValidate: true })
          }
          error={errors.username?.message}
        />
        <TextField
          type="text"
          label="Email Address"
          id="email"
          placeholder="your@email.com"
          value={watch('email')}
          onChange={value => setValue('email', value, { shouldValidate: true })}
          error={errors.email?.message}
        />
        <TextField
          type="tel"
          label="Phone Number"
          id="phone"
          placeholder="+1 (555) 000-0000"
          value={watch('phoneNumber')}
          onChange={value =>
            setValue('phoneNumber', value, { shouldValidate: true })
          }
          error={errors.phoneNumber?.message}
        />
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
        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={watch('confirmPassword')}
          onChange={value =>
            setValue('confirmPassword', value, { shouldValidate: true })
          }
          error={errors.confirmPassword?.message}
        />
        <div className="w-full">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() =>
                setValue('acceptedTerms', !accepted, {
                  shouldValidate: true,
                })
              }
              className="sr-only"
            />

            <div
              className={cn(
                'flex size-16 items-center justify-center rounded-[4px] border border-zinc-400 bg-white mr-4 transition',
                accepted && 'border-[#2F5BFF] bg-[#2F5BFF]'
              )}
            >
              <CheckIcon
                className={cn(
                  'size-8 text-white opacity-0 transition',
                  accepted && 'opacity-100'
                )}
              />
            </div>

            <span className="text-[14px] text-[var(--text)] [font-family:var(--font-sans)]">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                Terms and Conditions
              </Link>
            </span>
          </label>
        </div>
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid || !accepted}
        >
          Create Account
        </Button>
      </form>
      <p className="text-[16px] text-zinc-500 [font-family:var(--font-sans)]">
        Already have an account?{' '}
        <Link to="/login" className="text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthForm>
  );
};

export default Register;
