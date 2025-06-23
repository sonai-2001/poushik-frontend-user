import React from 'react';

import LandingNavbar from './LandingNavbar';

const LandingWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingNavbar />
      {children}
    </>
  );
};

export default LandingWrapper;
