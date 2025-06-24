'use client';
import { useState } from 'react';

import { authService } from '@/api/hooks/auth/hooks';

import { PetDoctorForm } from './PetDoctorForm';
import { PetOwnerForm } from './PetOwnerForm';
import { PetSellerForm } from './PetSellerForm';
import { FormValues, Step1Form } from '../components/RegisterStep1';

export function RegisterForm() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'pet-owner' | 'pet-doctor' | 'seller' | null>(null);
  const [regToken, setRegToken] = useState<string | null>(null);

  const { mutate: register, isPending: isRegisterPending } = authService.useStep1Register();

  const { mutate: step2RegisterPetOwner, isPending: isStep2RegisterPetOwnerPending } =
    authService.useStep2PetOwner();

  const { mutate: step2RegisterPetSeller, isPending: isStep2RegisterPetSellerPending } =
    authService.useStep2PetSeller();

  const { mutate: step2RegisterPetDoctor, isPending: isStep2RegisterPetDoctorPending } =
    authService.useStep2PetDoctor();

  const handleStep1Submit = (data: FormValues) => {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    formData.append('profileImage', data.profileImage);

    register(formData, {
      onSuccess: (res) => {
        setRole(data.role); // or use data.role
        setRegToken(res.regToken);
        setStep(2);
      },
    });
  };

  const handleStep2Submit = (data: FormData) => {
    const method =
      role === 'pet-owner'
        ? step2RegisterPetOwner
        : role === 'pet-doctor'
          ? step2RegisterPetDoctor
          : step2RegisterPetSeller;
    method(data, {
      onSuccess: () => {
        setStep(3);
      },
    });
  };

  return (
    <>
      {step === 1 && <Step1Form onSubmit={handleStep1Submit} isPending={isRegisterPending} />}

      {step === 2 &&
        (role === 'pet-owner' ? (
          <PetOwnerForm
            onSubmit={handleStep2Submit}
            regToken={regToken as string}
            isPending={isStep2RegisterPetOwnerPending}
          />
        ) : role === 'pet-doctor' ? (
          <PetDoctorForm
            onSubmit={handleStep2Submit}
            regToken={regToken as string}
            isPending={isStep2RegisterPetDoctorPending}
          />
        ) : (
          <PetSellerForm
            onSubmit={handleStep2Submit}
            regToken={regToken as string}
            isPending={isStep2RegisterPetSellerPending}
          />
        ))}
      {/* {step === 3 && <FinalStep />} */}
    </>
  );
}
