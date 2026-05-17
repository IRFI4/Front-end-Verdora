import CloseIcon from '@assets/icons/close.svg?react';
import Navlink from '../common/Navlink';

type MobileMenuProps = {
  onClose: () => void;
};

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        onClick={onClose}
        aria-label="Close menu overlay"
      />

      <div className="fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-xl lg:hidden">
        <button
          className="absolute top-25 left-25"
          type="button"
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon className="size-32" />
        </button>

        <nav className="flex flex-col gap-8 p-6 pt-20 mt-48 [font-family:var(--font-sans)] text-[14px] text-[var(--text)]">
          <Navlink to="/">Main Page</Navlink>
          <Navlink to="/categories">Categories</Navlink>
          <Navlink to="/products">All products</Navlink>
          <Navlink to="/sales">All sales</Navlink>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
