'use client';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { useEffect } from 'react';

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storedToken = parseCookies(null, storageTokenKeyName as string);

  useEffect(() => {
    storedToken[storageTokenKeyName as string] && router.replace('/authenticated/home');
  }, [router]);

  return <>{children}</>;
};

export default LoginWrapper;
