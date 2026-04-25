import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/slices/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const hydrating = useAppSelector(state => state.auth.hydrating);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  if (hydrating) {
    return null;
  }

  return <>{children}</>;
};
