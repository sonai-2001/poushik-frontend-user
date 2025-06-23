import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';

import LandingPage from '@/module/Landing/pages/LandingPage';

export default function Home() {
  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storedToken = parseCookies(null, storageTokenKeyName as string);

  if (storedToken[storageTokenKeyName as string]) {
    redirect('/authenticated/home');
  } else {
    return <LandingPage />;
  }
}
