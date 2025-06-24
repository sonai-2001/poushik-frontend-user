'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const sellerSchema = z.object({
  regToken: z.string(),
  phone: z.string().min(1, 'Phone is required'),
  storeName: z.string().min(1, 'Store name is required'),
  storeAddress: z.string().min(1, 'Store address is required'),
  businessLicense: z.string().min(1, 'Business license is required'),
  licenseDocument: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: 'License document is required',
  }),
  images: z.custom<File[]>(
    (files) => Array.isArray(files) && files.every((f) => f instanceof File),
    {
      message: 'At least one image is required',
    },
  ),
});

type SellerFormValues = z.infer<typeof sellerSchema>;

export function PetSellerForm({
  regToken,
  onSubmit,
  isPending = false,
}: {
  regToken: string;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
}) {
  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      regToken,
      phone: '',
      storeName: '',
      storeAddress: '',
      businessLicense: '',
      licenseDocument: undefined as unknown as File,
      images: [] as File[],
    },
  });

  const { setValue, handleSubmit } = form;

  const onFormSubmit = (data: SellerFormValues) => {
    const formData = new FormData();
    formData.append('regToken', data.regToken);
    formData.append('phone', data.phone);
    formData.append('storeName', data.storeName);
    formData.append('storeAddress', data.storeAddress);
    formData.append('businessLicense', data.businessLicense);
    formData.append('licenseDocument', data.licenseDocument);

    data.images.forEach((file) => {
      formData.append('images', file);
    });

    onSubmit(formData);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField name="phone" label="Phone" />
          <FormField name="storeName" label="Store Name" />
          <FormField name="storeAddress" label="Store Address" />
          <FormField name="businessLicense" label="Business License Number" />

          {/* License Document */}
          <FormField name="licenseDocument" label="License Document">
            {() => (
              <Input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue('licenseDocument', file, { shouldValidate: true });
                  }
                }}
              />
            )}
          </FormField>

          {/* Store Images */}
          <FormField name="images" label="Store Images">
            {() => (
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  setValue('images', files, { shouldValidate: true });
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
