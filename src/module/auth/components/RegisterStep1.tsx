'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['pet-owner', 'pet-doctor', 'seller']),
  profileImage: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: 'Profile image is required',
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function Step1Form({
  onSubmit,
  isPending = false,
}: {
  onSubmit: (data: FormValues) => void;
  isPending?: boolean;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      role: 'pet-owner',
    },
  });

  const { handleSubmit, setValue } = form;

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField name="fullName" label="Full Name" />
          <FormField name="email" label="Email" type="email" />
          <FormField name="password" label="Password" type="password" />
          <FormField name="role" label="Role">
            {({ field }) => (
              <select {...field} className="w-full border rounded px-2 py-2 text-sm">
                <option value="pet-owner">Pet Owner</option>
                <option value="pet-doctor">Pet Doctor</option>
                <option value="seller">Pet Seller</option>
              </select>
            )}
          </FormField>
          <FormField name="profileImage" label="Profile Image">
            {() => (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue('profileImage', file, { shouldValidate: true });
                  }
                }}
              />
            )}
          </FormField>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Submitting...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
