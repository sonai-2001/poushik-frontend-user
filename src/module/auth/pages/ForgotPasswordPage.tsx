'use client';

import LandingWrapper from '@/module/Landing/components/LandingWrapper';

import ForgotPasswordForm from '../components/ForgotPasswordForm';
import LoginWrapper from '../components/LoginWrapper';

export default function ForgotPasswordPage() {
  return (
    <LandingWrapper>
      <LoginWrapper>
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Forgot your password?</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email address and we’ll send you a link to reset your password.
              </p>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </LoginWrapper>
    </LandingWrapper>
  );
}
