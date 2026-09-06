import { Link } from 'react-router';
import Logo from '@components/common/Logo';
import { Button } from '@components/ui/button';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { logout } from '@api/auth/auth.actions';
import { Spinner } from '@components/ui/spinner';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';
import Navlink from '@components/common/Navlink';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCart } from '@api/cart/cart.hooks';

type HeaderProps = {
  onOpenMenu: () => void;
};

const Header = ({ onOpenMenu }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user, hydrating } = useAppSelector(state => state.auth);

  const { data: cart } = useGetCart({ enabled: Boolean(user) });
  const items = cart?.items || [];
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear();
  };

  return (
    <header className="sticky flex justify-center w-full border-b border-zinc-200 bg-transparent backdrop-blur">
      <div className=" w-full mx-0.5 px-4 md:px-6">
        <div className="flex w-full h-10 items-center justify-between">
          <Logo />

          <nav className="hidden lg:flex items-center gap-4 [font-family:var(--font-sans)] text-[14px] text-text">
            <Navlink to="/">Main Page</Navlink>
            <Navlink to="/categories">Categories</Navlink>
            <Navlink to="/products">All products</Navlink>
            <Navlink to="/sales">All sales</Navlink>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 w-56 h-9">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-[14px] text-[#2C332D] placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            <Link
              to="/favourites"
              className="relative flex size-8 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Favourite items"
            >
              <FavouriteIcon className="size-8" />
              <span className="absolute -top-1 right-1 flex size-4 items-center justify-center rounded-full bg-[#E07A5F] text-[10px] font-bold text-white">
                2
              </span>
            </Link>

            <Link
              to="/cart"
              className="relative flex size-8 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Shopping cart"
            >
              <CartIcon className="size-8" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 right-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {hydrating ? (
              <Spinner className="h-5 w-5" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile">
                  <div className="flex size-9 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold">
                    {user.name?.charAt(0).toUpperCase() ?? '?'}
                  </div>
                </Link>
                <Button variant="default" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="default" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
            <button
              className="lg:hidden flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
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
