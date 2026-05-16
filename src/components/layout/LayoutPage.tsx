import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/slices/auth';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchMe());
    }
  }, [dispatch, initialized]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1710px] mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
