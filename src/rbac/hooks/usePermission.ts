import { useRBAC } from '../context/RBACContext';
import { TActions, TSubjects } from '../lib/ability';

export const usePermission = () => {
  const ability = useRBAC();

  const can = (action: TActions, subject: TSubjects) => {
    return ability.can(action, subject);
  };

  const cannot = (action: TActions, subject: TSubjects) => {
    return ability.cannot(action, subject);
  };

  return {
    can,
    cannot,
  };
};
