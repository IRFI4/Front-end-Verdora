import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/slices/auth';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!hydrating && !user) {
      dispatch(fetchMe());
    }
  }, [dispatch, user, hydrating]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
