import { TCommonSchema } from '@/types/common/common.schema';

export type TAuthModel = {
  ILoginReq: {
    email: string;
    password: string;
    deviceToken?: string;
  };

  ILoginResData: {
    _id: string;
    fullName: string;
    email: string;
    role: TAuthModel['IRole'];
    profileImage: string;
    status: string;
    createdAt: string;
  };

  IData: {
    user: TAuthModel['IUserData'];
    accessToken: string;
    refreshToken: string;
  };

  IForgotPassReq: {
    email: string;
    baseUrl: string;
  };

  IResetPassReq: {
    newPassword: string;
    authToken: string;
  };

  IRole: {
    _id: string;
    role: 'pet-owner' | 'pet-doctor' | 'pet-seller';
    roleDisplayName: string;
    roleGroup: string;
    status: string;
  };

  IPetOwnerDetails: {
    phone: string;
    address: string;
    pets: {
      name: string;
      type: string;
      breed: string;
      imageName?: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  IPetDoctorDetails: {
    phone: string;
    clinicName: string;
    clinicAddress: string;
    specialization: string;
    licenseNumber: string;
    licenseDocument: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
  };

  IPetSellerDetails: {
    phone: string;
    storeName: string;
    storeAddress: string;
    businessLicense: string;
    licenseDocument: string;
    images?: string[];
    createdAt: string;
    updatedAt: string;
  };

  IMoreProfileDetails:
    | TAuthModel['IPetOwnerDetails']
    | TAuthModel['IPetDoctorDetails']
    | TAuthModel['IPetSellerDetails'];

  IUserData: {
    _id: string;
    role: TAuthModel['IRole'];
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    userName: string;
    profileImage: string;
    status: string;
    isEmailVerified: boolean;
    isKycApproved: boolean;
    createdAt: string;
    moreprofileDetails: TAuthModel['IMoreProfileDetails'];
  };

  IAuthResponseBody: {
    _id: string;
    role: string;
    fullName: string;
    countryCode: string;
    phone: string;
    email: string;
    userName: string;
    password: string;
    profileImage: string;
    emailOtp: string;
    otpExpireTime: string;
    status: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };

  ILoginResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IData'];
  };

  IResetPassResponse: TCommonSchema['BaseApiResponse'] & {
    data: TAuthModel['IAuthResponseBody'];
  };
};
