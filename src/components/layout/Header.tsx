import { Link } from 'react-router';
import Logo from '@components/common/Logo';
import { Button } from '@components/ui/button';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { logout } from '@api/slices/auth';
import { Spinner } from '@components/ui/spinner';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';
import Navlink from '@components/common/Navlink';

type HeaderProps = {
  onOpenMenu: () => void;
};

const Header = ({ onOpenMenu }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky flex justify-center top-0 z-50 w-full border-b border-zinc-200 bg-transparent backdrop-blur">
      <div className=" w-full max-w-[1696px] mx-[2px] px-16 md:px-24">
        <div className="flex w-full h-81 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-32 [font-family:var(--font-sans)] text-[14px] text-[var(--text)]">
            <Navlink to="/">Main Page</Navlink>
            <Navlink to="/categories">Categories</Navlink>
            <Navlink to="/products">All products</Navlink>
            <Navlink to="/sales">All sales</Navlink>
          </nav>

          {/* Right side: Search, Cart, Profile */}
          <div className="flex items-center gap-16">
            {/* Search */}
            <div className="hidden md:flex items-center gap-12 rounded-full border border-zinc-300 bg-zinc-50 px-16 py-8 w-[224px] h-[38px]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-[14px] text-[#2C332D] placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            {/* Favourite Icon */}

            <Link
              to="/favourites"
              className="relative flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Favourite items"
            >
              <FavouriteIcon className="size-20" />
              <span className="absolute -top-1 right-1 flex size-16 items-center justify-center rounded-full bg-[#E07A5F] text-[10px] font-bold text-white">
                2
              </span>
            </Link>

            {/* Cart Icon */}

            <Link
              to="/cart"
              className="relative flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Shopping cart"
            >
              <CartIcon className="size-20" />
              <span className="absolute -top-1 right-1 flex size-16 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                3
              </span>
            </Link>

            {hydrating ? (
              <Spinner className="h-24 w-24" />
            ) : user ? (
              <div className="flex items-center gap-12">
                <Link to="/profile">
                  <div className="flex size-36 items-center justify-center rounded-full bg-[var(--accent)] text-white text-[13px] font-bold">
                    {user.name?.charAt(0).toUpperCase() ?? '?'}
                  </div>
                </Link>
                <Button
                  variant="default"
                  className="h-36 px-20 text-[14px]"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="active"
                  className="h-36 px-20 text-[14px] w-[90px]"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Open menu"
              onClick={() => onOpenMenu()}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
