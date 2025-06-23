'use client';

import { Eye, EyeOff, Github } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useZodForm } from '@/hooks/useZodForm';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useZodForm(schema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    console.log(data);

    // simulate API
    await new Promise((res) => setTimeout(res, 1500));

    setIsLoading(false);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField name="email" label="Email" type="email" />

        <FormField name="password" label="Password">
          {({ field }) => (
            <div className="relative">
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
          <a href="#" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
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
