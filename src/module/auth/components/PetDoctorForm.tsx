'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  regToken: z.string(),
  phone: z.string().min(1),
  clinicName: z.string().min(1),
  clinicAddress: z.string().min(1),
  specialization: z.string().min(1),
  licenseNumber: z.string().min(1),
  licenseDocument: z.custom<File>((file) => file instanceof File && file.size > 0, {
    message: 'License document is required',
  }),
  images: z.custom<File[]>(
    (files) => Array.isArray(files) && files.every((f) => f instanceof File),
    {
      message: 'At least one clinic image is required',
    },
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function PetDoctorForm({
  regToken,
  onSubmit,
  isPending = false,
}: {
  regToken: string;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regToken,
      phone: '',
      clinicName: '',
      clinicAddress: '',
      specialization: '',
      licenseNumber: '',
      licenseDocument: undefined,
      images: [],
    },
  });

  const { setValue, handleSubmit } = form;

  const onFormSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append('regToken', data.regToken);
    formData.append('phone', data.phone);
    formData.append('clinicName', data.clinicName);
    formData.append('clinicAddress', data.clinicAddress);
    formData.append('specialization', data.specialization);
    formData.append('licenseNumber', data.licenseNumber);
    formData.append('licenseDocument', data.licenseDocument);

    (data.images as File[]).forEach((file) => {
      formData.append('images', file);
    });

    onSubmit(formData);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Phone */}
          <FormField name="phone" label="Phone Number" />

          {/* Clinic Name */}
          <FormField name="clinicName" label="Clinic Name" />

          {/* Clinic Address */}
          <FormField name="clinicAddress" label="Clinic Address" />

          {/* Specialization */}
          <FormField name="specialization" label="Specialization" />

          {/* License Number */}
          <FormField name="licenseNumber" label="License Number" />

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

          {/* Images */}
          <FormField name="images" label="Clinic Images">
            {({ field }) => (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files); // ✅ properly update RHF value
                  }}
                />
                {field.value?.length > 0 && (
                  <ul className="text-sm mt-2 list-disc pl-4">
                    {field.value.map((file: File, index: number) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </>
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
