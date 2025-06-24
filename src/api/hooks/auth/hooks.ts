import { useMutation } from '@tanstack/react-query';

import axiosInstance from '@/api/axiosInstance';
import { endpoints } from '@/api/endpoints';
import { TCommonSchema } from '@/types/common/common.schema';

import { LoginQueryEnum } from './key';
import { TAuthModel } from './schema';

const useAuthLoginHook = () => {
  return useMutation<TAuthModel['ILoginResponse'], Error, TAuthModel['ILoginReq']>({
    mutationKey: [LoginQueryEnum.Login],
    mutationFn: async (payload: TAuthModel['ILoginReq']) => {
      const res = await axiosInstance.post<TAuthModel['ILoginResponse']>(
        endpoints.auth.login,
        payload,
      );

      return res?.data;
    },
  });
};

const useForgotPassHook = () => {
  return useMutation<TCommonSchema['BaseApiResponse'], Error, TAuthModel['IForgotPassReq']>({
    mutationKey: [LoginQueryEnum.Forgot],
    mutationFn: async (payload: TAuthModel['IForgotPassReq']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.forgot,
        payload,
      );

      return res?.data;
    },
  });
};

export const useResetPassHook = () => {
  return useMutation<TAuthModel['IResetPassResponse'], Error, TAuthModel['IResetPassReq']>({
    mutationKey: [LoginQueryEnum.Reset],
    mutationFn: async (payload: TAuthModel['IResetPassReq']) => {
      const res = await axiosInstance.post<TAuthModel['IResetPassResponse']>(
        endpoints.auth.reset,
        payload,
      );

      return res?.data;
    },
  });
};

export const authService = {
  useAuthLoginHook,
  useForgotPassHook,
  useResetPassHook,
};
