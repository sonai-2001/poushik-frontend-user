'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { getOAuthAppAccessToken, setOAuthAppAccessToken } from '@/api/axiosInstance';
import { TAuthModel } from '@/api/hooks/auth/schema';
import { fetchUserDetails } from '@/api/hooks/profile/hooks';
import { ROUTES } from '@/navigation/routes';
import { RBACProvider } from '@/rbac/context/RBACContext';

import { AuthValuesType } from './types';

const defaultProvider: AuthValuesType = {
  user: null,
  isLoading: false,
  setUser: () => null,
  setHasToken: () => null,

  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TAuthModel['IUserData'] | null>(null);
  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storageRefreshTokenKeyName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME;
  const storedToken = parseCookies(null, storageTokenKeyName);
  const [hasToken, setHasToken] = useState<string | null>(
    getOAuthAppAccessToken() || storedToken[storageTokenKeyName as string],
  );
  const handleLogout = () => {
    destroyCookie(undefined, storageTokenKeyName as string, {
      path: '/',
    });
    destroyCookie(undefined, storageRefreshTokenKeyName as string, {
      path: '/',
    });
    setOAuthAppAccessToken(null);
    setUser(null);
    setHasToken(null);
    router.push(ROUTES.auth.login);
  };

  // console.info(hasToken, 'At authprovider');
  const { data, isLoading, error } = useQuery({
    queryKey: ['userDetails', hasToken],
    queryFn: fetchUserDetails,
    enabled: !!hasToken,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const router = useRouter();

  useEffect(() => {
    !!data?.data && setUser(data.data);
  }, [data?.data]);

  useEffect(() => {
    if (error) {
      setOAuthAppAccessToken(null);
      setUser(null);
      destroyCookie(undefined, storageTokenKeyName as string, {
        path: '/',
      });
      destroyCookie(undefined, storageRefreshTokenKeyName as string, {
        path: '/',
      });
      router.push(ROUTES.auth.login);
    }
  }, [error, router, storageTokenKeyName]);

  const values = {
    user,
    isLoading,
    setUser,
    logout: handleLogout,
    setHasToken: setHasToken,
  };

  return (
    <AuthContext.Provider value={values}>
      <RBACProvider role={user?.role?.role || ''}>{children}</RBACProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
