import React from 'react';

import LandingWrapper from '@/module/Landing/components/LandingWrapper';

import LoginWrapper from '../components/LoginWrapper';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage = ({ token }: { token: string }) => {
  return (
    <LandingWrapper>
      <LoginWrapper>
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Reset your password?</h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below to regain access to your account.
              </p>
            </div>
            <ResetPasswordForm token={token} />
          </div>
        </div>
      </LoginWrapper>
    </LandingWrapper>
  );
};

export default ResetPasswordPage;
