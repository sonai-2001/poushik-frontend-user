'use client';

import { toast } from 'sonner';
import { z } from 'zod';

import { authService } from '@/api/hooks/auth/hooks';
import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useZodForm } from '@/hooks/useZodForm';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending: isForgotPasswordPending } =
    authService.useForgotPassHook();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const form = useZodForm(forgotPasswordSchema, {
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log('Forgot password form submitted:', data);
    // Add your API call here to trigger email
    const updatedBaseUrl = `${baseUrl}/auth`;
    const payload = {
      email: data.email,
      baseUrl: updatedBaseUrl,
    };
    forgotPassword(payload, {
      onSuccess: () => {
        toast.success('Link sent successfully on Email');
      },
    });
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-background p-6 rounded-xl shadow-sm">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            name="email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
          />
          <Button type="submit" disabled={isForgotPasswordPending} className="w-full">
            {isForgotPasswordPending ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
