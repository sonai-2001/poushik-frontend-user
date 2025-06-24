import React, { createContext, ReactNode, useContext } from 'react';

import { defineAbilityFor, TAppAbility } from '../lib/ability';

interface IRBACProviderProps {
  children: ReactNode;
  role: string;
}

export const RBACContext = createContext<TAppAbility | null>(null);

export const RBACProvider: React.FC<IRBACProviderProps> = ({ children, role }) => {
  const ability = defineAbilityFor(role);

  return <RBACContext.Provider value={ability}>{children}</RBACContext.Provider>;
};

export const useRBAC = () => {
  const ability = useContext(RBACContext);
  if (!ability) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return ability;
};
