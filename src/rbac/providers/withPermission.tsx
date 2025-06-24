import React from 'react';

import { usePermission } from '../hooks/usePermission';
import { TActions, TSubjects } from '../lib/ability';

interface IWithPermissionProps {
  action: TActions;
  subject: TSubjects;
  fallback?: React.ReactNode;
}

export const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { action, subject, fallback }: IWithPermissionProps,
) => {
  return function WithPermissionComponent(props: P) {
    const { can } = usePermission();

    if (!can(action, subject)) {
      return fallback || null;
    }

    return <WrappedComponent {...props} />;
  };
};
