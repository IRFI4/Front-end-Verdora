import LayoutPage from '@/layoutPage/LayoutPage';
import { Button } from '@components/ui/button';
import loginPreview from '@assets/images/login-preview.png';
import LogoIcon from '@assets/icons/logo.svg?react';
import GoogleIcon from '@assets/icons/google.svg?react';
import { useState } from 'react';
import PasswordField from '@components/common/forms/PasswordField';

const Login = () => {
  const [password, setPassword] = useState('');

  return (
    <LayoutPage>
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
            <a href="#" className="flex items-center gap-12">
              <div className="w-48 h-48 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <LogoIcon className="w-24 h-24 text-white" />
              </div>
              <span className="text-[24px] text-[var(--text-h)] font-bold">
                Verdora
              </span>
            </a>
            <div className="flex flex-col items-center">
              <h2 className="my-[8px] text-[36px] leading-[40px] text-[var(--text-h)] font-bold font-outfit">
                Sign in to Verdora
              </h2>
              <p className="text-[var(--text)] text-[16px]">
                Access your account and orders
              </p>
            </div>
            <form className="flex flex-col items-center justify-center gap-24 w-full">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-[14px] font-medium text-[var(--text-h)]"
                >
                  Email Address
                </label>
                <input
                  autoComplete="email"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-[50px] rounded-[12px] bg-[var(--block-bg)] border border-zinc-300 pl-16 text-[16px] placeholder:text-[16px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                />
              </div>
              <div className="w-full">
                <PasswordField
                  label="Password"
                  labelRight={
                    <a
                      href="#"
                      className="text-sm text-[var(--accent)] hover:underline"
                    >
                      Forgot password?
                    </a>
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={setPassword}
                />
              </div>
              <Button className="w-full" variant={'active'} type="submit">
                Sign In
              </Button>
            </form>
            <div className="w-full flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-[14px] text-zinc-500">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
          </div>
          <Button
            variant={'default'}
            className="w-full cursor-pointer"
            type="button"
          >
            <GoogleIcon className="size-6 w-20 h-20 mr-12" />
            Continue with Google
          </Button>
          <p className="text-[16px] text-zinc-500">
            Don't have an account?{' '}
            <a href="#" className="text-[var(--accent)] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Login;
