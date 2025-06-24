import React from 'react';

import LandingWrapper from '@/module/Landing/components/LandingWrapper';

import LoginWrapper from '../components/LoginWrapper';
import { RegisterForm } from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <LandingWrapper>
      <LoginWrapper>
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground">Enter your details to get started</p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </LoginWrapper>
    </LandingWrapper>
  );
};

export default RegisterPage;
