import axiosInstance from '@/api/axiosInstance';
// eslint-disable-next-line import/no-unresolved
import { endpoints } from '@/api/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

import { TAuthModel } from '../auth/schema';

export const fetchUserDetails = async () => {
  const res = await axiosInstance.get<
    TCommonSchema['BaseApiResponse'] & { data: TAuthModel['IUserData'] }
  >(endpoints.auth.profileDetails);

  return res?.data;
};
