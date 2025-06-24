'use client';

import { Eye, EyeOff, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { setOAuthAppAccessToken } from '@/api/axiosInstance';
import { authService } from '@/api/hooks/auth/hooks';
import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useZodForm } from '@/hooks/useZodForm';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: isLoginPending } = authService.useAuthLoginHook();
  const { setHasToken } = useAuth();
  const router = useRouter();

  const form = useZodForm(schema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const storageTokenKeyName = process.env.NEXT_PUBLIC_TOKEN_NAME;
  const storageRefreshTokenKeyName = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME;

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);

    login(data, {
      onSuccess: (data) => {
        setCookie(null, storageTokenKeyName as string, data.data.accessToken, {
          path: '/',
        });
        setCookie(null, storageRefreshTokenKeyName as string, data.data.refreshToken, {
          path: '/',
        });
        setOAuthAppAccessToken(data.data.accessToken);
        // queryClient.invalidateQueries({ queryKey: ['userDetails'] });
        setHasToken(data.data.accessToken);

        toast.success('Signed in successfully');

        // const returnUrl = router.query.returnUrl;
        // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboards';
        router.push('/authenticated/home');
      },
    });
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField name="email" label="Email" type="email" />

        <FormField name="password" label="Password">
          {({ field }) => (
            <div className="relative ">
              <Input {...field} type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
              <button
                type="button"
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}
        </FormField>

        <div className="flex items-center justify-between">
          <div />
          <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoginPending}>
          {isLoginPending ? 'Signing in...' : 'Sign In'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Button type="button" variant="outline" className="w-full flex items-center gap-2">
          <Github className="h-4 w-4" />
          Sign in with GitHub
        </Button>
      </form>
    </Form>
  );
}
