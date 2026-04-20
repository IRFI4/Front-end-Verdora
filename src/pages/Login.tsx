import LayoutPage from '@/layoutPage/LayoutPage';
import { Button } from '@components/ui/button';
import loginPreview from '@assets/images/login-preview.png';
import LogoIcon from '@assets/icons/logo.svg?react';
import GoogleIcon from '@assets/icons/google.svg?react';
import { useState } from 'react';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
                <TextField
                  type="text"
                  label="Email Address"
                  id="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={value => handleInputChange('email', value)}
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
              <Link
                to="/register"
                className="text-[var(--accent)] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Login;
