'use client';

import LandingWrapper from '@/module/Landing/components/LandingWrapper';

import LoginForm from '../components/LoginForm';
import LoginWrapper from '../components/LoginWrapper';

export default function LoginPage() {
  return (
    <LandingWrapper>
      <LoginWrapper>
        <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-card text-card-foreground rounded-2xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to continue to your account</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </LoginWrapper>
    </LandingWrapper>
  );
}
