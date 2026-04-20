import LayoutPage from '@/layoutPage/LayoutPage';
import { Button } from '@components/ui/button';
import loginPreview from '@assets/images/login-preview.png';
import LogoIcon from '@assets/icons/logo.svg?react';
import { useState } from 'react';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { Link } from 'react-router-dom';
import CheckIcon from '@assets/icons/checkbox.svg?react';
import { cn } from '@/lib/utils';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
  });

  const [accepted, setAccepted] = useState(false);

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
                Create Account
              </h2>
              <p className="text-[var(--text)] text-[16px] [font-family:var(--font-sans)]">
                Join Verdora and start your green journey
              </p>
            </div>
            <form className="flex flex-col items-center justify-center gap-24 w-full">
              <div className="w-full">
                <TextField
                  type="text"
                  label="Full Name"
                  id="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={value => handleInputChange('fullName', value)}
                />
              </div>
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
                <TextField
                  type="tel"
                  label="Phone Number"
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={value => handleInputChange('phone', value)}
                />
              </div>
              <div className="w-full">
                <PasswordField
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={value => handleInputChange('password', value)}
                />
              </div>
              <div className="w-full">
                <PasswordField
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={value =>
                    handleInputChange('confirmPassword', value)
                  }
                />
              </div>
              <div className="w-full">
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={e => setAccepted(e.target.checked)}
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
                disabled={
                  !formData.fullName ||
                  !formData.email ||
                  !formData.password ||
                  formData.password !== formData.confirmPassword ||
                  !accepted
                }
              >
                Create Account
              </Button>
            </form>
            <p className="text-[16px] text-zinc-500 [font-family:var(--font-sans)]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[var(--accent)] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Register;
