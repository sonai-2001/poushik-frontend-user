import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';

import { ActionEnum, SubjectEnum, UserRoleEnum } from '@/types/enums/common.emums';

export type TActions = `${ActionEnum}`;

export type TSubjects = `${SubjectEnum}`;

export type TAppAbility = PureAbility<[TActions, TSubjects]>;

export function defineAbilityFor(role: string) {
  const { can, cannot, build } = new AbilityBuilder<PureAbility<[TActions, TSubjects]>>(
    PureAbility as AbilityClass<TAppAbility>,
  );

  switch (role) {
    case UserRoleEnum.ADMIN:
      can(
        [ActionEnum.CREATE, ActionEnum.READ, ActionEnum.UPDATE, ActionEnum.DELETE],
        [SubjectEnum.ALL],
      );
      break;
    case UserRoleEnum.MANAGER:
      can(
        [ActionEnum.READ, ActionEnum.CREATE, ActionEnum.UPDATE],
        [
          SubjectEnum.CATEGORY,
          SubjectEnum.CONTACT_US,
          SubjectEnum.PAYMENTS,
          SubjectEnum.PERMISSION,
          SubjectEnum.ROLE,
          SubjectEnum.SEO,
          SubjectEnum.USER,
          SubjectEnum.FAQ,

          SubjectEnum.PRODUCT,

          SubjectEnum.ORDER,
        ],
      );
      cannot([ActionEnum.DELETE], [SubjectEnum.ALL]);
      cannot([ActionEnum.UPDATE], [SubjectEnum.PRIVACY_POLICY, SubjectEnum.TERMS_AND_CONDITION]);
      break;

    case UserRoleEnum.USER:
      can([ActionEnum.READ], [SubjectEnum.USER]);
      cannot(
        [ActionEnum.READ],
        [SubjectEnum.CONTACT_US, SubjectEnum.SEO, SubjectEnum.PAYMENTS, SubjectEnum.ORDER],
      );
      cannot(
        [ActionEnum.CREATE, ActionEnum.UPDATE, ActionEnum.DELETE],
        [
          SubjectEnum.USER,
          SubjectEnum.ROLE,
          SubjectEnum.PERMISSION,
          SubjectEnum.CONTACT_US,
          SubjectEnum.SEO,
          SubjectEnum.PAYMENTS,
          SubjectEnum.CATEGORY,

          SubjectEnum.PRODUCT,
          SubjectEnum.FAQ,
          SubjectEnum.ORDER,
        ],
      );
      break;
    default:
      can([ActionEnum.READ], [SubjectEnum.USER, SubjectEnum.CONTACT_US]);
      break;
  }

  return build();
}
