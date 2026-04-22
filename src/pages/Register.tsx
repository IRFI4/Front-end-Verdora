import { Button } from '@components/ui/button';
import loginPreview from '@assets/images/login-preview.png';
import LogoIcon from '@assets/icons/logo.svg?react';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link } from 'react-router';
import CheckIcon from '@assets/icons/checkbox.svg?react';
import { cn } from '@/lib/utils';
import { useRegisterForm, type RegisterFormData } from '@hooks/useRegisterForm';
import PasswordStrength from '@components/common/forms/PasswordStrength';

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
    <div className="flex items-center justify-center ">
      <div className="hidden lg:block w-[50vw]">
        <img
          src={loginPreview}
          alt="Login preview"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="w-[50vw] h-full flex items-center justify-center">
        <div className="w-[448px] flex flex-col items-center justify-center gap-24">
          <Link to="/" className="flex items-center gap-8">
            <div className="flex size-40 items-center justify-center rounded-full bg-[var(--accent)]">
              <LogoIcon className="size-20 text-white" />
            </div>
            <span className="text-[20px] font-bold text-[var(--text-h)]">
              Verdora
            </span>
          </Link>
          <div className="flex flex-col items-center">
            <h2 className="my-[8px] text-[36px] leading-[40px] text-[var(--text-h)] font-bold font-outfit">
              Create Account
            </h2>
            <p className="text-[var(--text)] text-[16px] [font-family:var(--font-sans)]">
              Join Verdora and start your green journey
            </p>
          </div>
          <form
            className="flex flex-col items-center justify-center gap-24 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full">
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
            </div>
            <div className="w-full">
              <TextField
                type="text"
                label="Email Address"
                id="email"
                placeholder="your@email.com"
                value={watch('email')}
                onChange={value =>
                  setValue('email', value, { shouldValidate: true })
                }
                error={errors.email?.message}
              />
            </div>
            <div className="w-full">
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
            </div>
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
            <div className="w-full">
              <label className="flex items-center gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={() =>
                    setValue('acceptedTerms', !accepted as true, {
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
                  <a
                    href="/terms"
                    className="text-[var(--accent)] underline underline-offset-4"
                  >
                    Terms and Conditions
                  </a>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
