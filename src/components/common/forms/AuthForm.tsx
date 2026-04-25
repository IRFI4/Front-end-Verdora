import loginPreview from '@assets/images/login-preview.png';
import LogoIcon from '@assets/icons/logo.svg?react';
import { Link } from 'react-router';

type AuthFormProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const AuthForm = ({ title, subtitle, children }: AuthFormProps) => {
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
              {title}
            </h2>
            <p className="text-[var(--text)] text-[16px] [font-family:var(--font-sans)]">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
