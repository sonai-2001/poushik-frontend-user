import React from 'react';

import { ModeToggle } from '@/components/modeToggle';
import { Button } from '@/components/ui/button';
const page = () => {
  // const ab = 'mnsn';
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1>
        FrontEnd User
        <Button variant={'outline'} className="rounded-[3px]">
          Button
        </Button>
        <ModeToggle />
      </h1>
    </div>
  );
};

export default page;
