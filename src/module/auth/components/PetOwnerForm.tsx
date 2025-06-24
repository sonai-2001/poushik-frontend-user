'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { FormField } from '@/commonComponets/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const petSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  type: z.string().min(1, 'Pet type is required'),
  breed: z.string().min(1, 'Pet breed is required'),
  image: z.any().refine((file) => file instanceof File && file.size > 0, {
    message: 'Image is required',
  }),
});

const formSchema = z.object({
  regToken: z.string(),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  pets: z.array(petSchema).min(1, 'At least one pet is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function PetOwnerForm({
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
      address: '',
      pets: [
        {
          name: '',
          type: '',
          breed: '',
          image: undefined,
        },
      ],
    },
  });

  const { control, handleSubmit, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pets',
  });

  const onFormSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append('regToken', data.regToken);
    formData.append('phone', data.phone);
    formData.append('address', data.address);

    // Prepare pets JSON and collect images
    const petsInfo = data.pets.map((pet) => ({
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
    }));

    formData.append('pets', JSON.stringify(petsInfo));

    data.pets.forEach((pet) => {
      formData.append('petImages', pet.image); // must be named exactly if API expects this
    });

    onSubmit(formData);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField name="phone" label="Phone Number" />
          <FormField name="address" label="Address" />

          {/* Pets */}
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border rounded-md p-4 space-y-2">
                <FormField name={`pets.${index}.name`} label={`Pet Name #${index + 1}`} />
                <FormField name={`pets.${index}.type`} label="Pet Type" />
                <FormField name={`pets.${index}.breed`} label="Pet Breed" />

                <FormField name={`pets.${index}.image`} label="Pet Image">
                  {() => (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue(`pets.${index}.image`, file, {
                            shouldValidate: true,
                          });
                        }
                      }}
                    />
                  )}
                </FormField>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => remove(index)}
                    className="mt-2"
                  >
                    Remove Pet
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  name: '',
                  type: '',
                  breed: '',
                  image: undefined,
                })
              }
            >
              Add Another Pet
            </Button>
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Submitting...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
