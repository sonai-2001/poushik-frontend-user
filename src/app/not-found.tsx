import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(255,255,255,0.05)_39px,rgba(255,255,255,0.05)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(255,255,255,0.05)_39px,rgba(255,255,255,0.05)_40px)]">
      <h1 className="text-[120px] font-bold text-white leading-none md:text-[170px] ">404</h1>
      <h2 className="text-2xl text-white mb-8 md:text-3xl">Page Not Found</h2>
      <Button asChild className="bg-white text-black hover:bg-gray-200">
        <Link href={'/'}>Back to Home</Link>
      </Button>
    </div>
  );
}
