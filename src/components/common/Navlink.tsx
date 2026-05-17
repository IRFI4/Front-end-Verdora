import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

const Navlink = (props: NavlinkProps) => {
  return (
    <NavLink
      to={props.to}
      end
      className={({ isActive }) =>
        cn(
          'text-[14px] font-medium transition-colors',
          isActive
            ? 'pb-2 text-[var(--accent)] border-b-[2px] border-[var(--accent)]'
            : 'pb-2 text-[var(--text-h)] border-b-[2px] border-transparent'
        )
      }
    >
      {props.children}
    </NavLink>
  );
};

export default Navlink;
