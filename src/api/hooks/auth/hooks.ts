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

export const useStep1Register = () => {
  return useMutation<TAuthModel['IRegisterStep1Response'], Error, TAuthModel['IStep1Register']>({
    mutationKey: [LoginQueryEnum.Reset],
    mutationFn: async (payload: TAuthModel['IStep1Register']) => {
      const res = await axiosInstance.post<TAuthModel['IRegisterStep1Response']>(
        endpoints.auth.step1Register,
        payload,
      );

      return res?.data;
    },
  });
};

export const useStep2PetOwner = () => {
  return useMutation<TCommonSchema['BaseApiResponse'], Error, TAuthModel['IStep2PetOwner']>({
    mutationKey: [LoginQueryEnum.Reset],
    mutationFn: async (payload: TAuthModel['IStep2PetOwner']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.step2RegisterPetOwner,
        payload,
      );

      return res?.data;
    },
  });
};

const useStep2PetDoctor = () => {
  return useMutation<TCommonSchema['BaseApiResponse'], Error, TAuthModel['IStep2PetDoctor']>({
    mutationKey: [LoginQueryEnum.Reset],
    mutationFn: async (payload: TAuthModel['IStep2PetDoctor']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.step2RegisterPetDoctor,
        payload,
      );

      return res?.data;
    },
  });
};

const useStep2PetSeller = () => {
  return useMutation<TCommonSchema['BaseApiResponse'], Error, TAuthModel['IStep2PetSeller']>({
    mutationKey: [LoginQueryEnum.Reset],
    mutationFn: async (payload: TAuthModel['IStep2PetSeller']) => {
      const res = await axiosInstance.post<TCommonSchema['BaseApiResponse']>(
        endpoints.auth.step2RegisterPetSeller,
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
  useStep1Register,
  useStep2PetDoctor,
  useStep2PetSeller,
  useStep2PetOwner,
};
