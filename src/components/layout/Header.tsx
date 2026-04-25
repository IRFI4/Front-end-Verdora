import { Link } from 'react-router';
import LogoIcon from '@assets/icons/logo.svg?react';
import { Button } from '@components/ui/button';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { logout } from '@api/slices/auth';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-16 md:px-24">
        <div className="flex h-64 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-8">
            <div className="flex size-40 items-center justify-center rounded-full bg-[var(--accent)]">
              <LogoIcon className="size-20 text-white" />
            </div>
            <span className="text-[20px] font-bold text-[var(--text-h)]">
              Verdora
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-32">
            <Link
              to="/shop"
              className="text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right side: Search, Cart, Profile */}
          <div className="flex items-center gap-16">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-8 rounded-full border border-zinc-300 bg-zinc-50 px-16 py-8 w-[280px]">
              <svg
                className="size-16 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent text-[14px] text-[var(--text)] placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                className="size-20 text-[var(--text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-4 -right-4 flex size-16 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                0
              </span>
            </Link>

            {user ? (
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
                <Button variant="active" className="h-36 px-20 text-[14px]">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="size-24 text-[var(--text)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
