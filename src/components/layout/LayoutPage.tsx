import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/slices/auth';
import MobileMenu from './MobileMenu';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { initialized } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchMe());
    }
  }, [dispatch, initialized]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5DC]">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
