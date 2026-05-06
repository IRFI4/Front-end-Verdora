import { Button } from '@components/ui/button';
import GoogleIcon from '@assets/icons/google.svg?react';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link, useNavigate } from 'react-router';
import { useLoginForm, type LoginFormData } from '@hooks/useLoginForm';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { login } from '@api/slices/auth';
import { rateLimit } from '@/utils/rateLimit';
import { useMemo } from 'react';
import AuthForm from '@/components/layout/Auth';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useLoginForm();
  const canSubmit = useMemo(() => rateLimit(2000), []);

  const onSubmit = async (data: LoginFormData) => {
    if (!canSubmit()) return;
    await dispatch(
      login({ email: data.email, password: data.password })
    ).unwrap();
    navigate('/');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
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
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid || loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
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
        onClick={handleGoogleLogin}
      >
        <GoogleIcon className="size-6 w-20 h-20 mr-12" />
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
