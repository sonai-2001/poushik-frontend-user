'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { authService } from '@/api/hooks/auth/hooks';
import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useZodForm } from '@/hooks/useZodForm';

const schema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function ResetPasswordForm({ token }: { token: string }) {
  const form = useZodForm(schema);

  const { mutate: resetPassword, isPending: isResetPasswordPending } =
    authService.useResetPassHook();
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    const payload = {
      newPassword: data.newPassword,
      authToken: token,
    };

    // You can now call your reset password API here
    console.log('Reset Payload:', payload);
    resetPassword(payload, {
      onSuccess: () => {
        toast.success('Password reset successfully');
        router.push('/auth/login');
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
        />
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your new password"
        />
        <Button type="submit" disabled={isResetPasswordPending} className="w-full">
          {isResetPasswordPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
}
