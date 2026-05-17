import { Link } from 'react-router';
import LogoIcon from '@assets/icons/logo.svg?react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-12">
      <div className="flex size-44 items-center justify-center rounded-full bg-[var(--accent)]">
        <LogoIcon className="size-20 text-white" />
      </div>
      <span className="text-[20px] font-semibold text-[var(--text-h)]">
        Verdora
      </span>
    </Link>
  );
};

export default Logo;
