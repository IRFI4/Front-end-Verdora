import { Button } from '@components/ui/button';
import GoogleIcon from '@assets/icons/google.svg?react';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link } from 'react-router';
import { useLoginForm, type LoginFormData } from '@hooks/useLoginForm';
import AuthForm from '@/components/layout/Auth';

const Login = () => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useLoginForm();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <AuthForm
      title="Sign in to Verdora"
      subtitle="Access your account and orders"
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
        <PasswordField
          label="Password"
          labelRight={
            <Link
              to="/forgot-password"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              Forgot password?
            </Link>
          }
          placeholder="Enter your password"
          value={watch('password')}
          onChange={value =>
            setValue('password', value, { shouldValidate: true })
          }
          error={errors.password?.message}
        />
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid}
        >
          Sign In
        </Button>
      </form>
      <div className="w-full flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-200" />
        <span className="text-[14px] text-zinc-500 mx-[16px]">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>
      <Button
        variant={'default'}
        className="w-full cursor-pointer"
        type="button"
      >
        <GoogleIcon className="size-6 w-20 h-20 mr-12 cursor-pointer" />
        Continue with Google
      </Button>
      <p className="text-[16px] text-zinc-500">
        Don't have an account?{' '}
        <Link to="/register" className="text-[var(--accent)] hover:underline">
          Sign up
        </Link>
      </p>
    </AuthForm>
  );
};

export default Login;
