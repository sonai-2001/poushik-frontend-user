'use client';

import { ReactNode } from 'react';
import { useFormContext, ControllerRenderProps } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField as ShadFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  children?: (props: { field: ControllerRenderProps<any, string> }) => ReactNode;
};

export function FormField({
  name,
  label,
  placeholder,
  description,
  type = 'text',
  children,
}: Props) {
  const { control } = useFormContext();

  return (
    <ShadFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {children ? (
              children({ field }) // render custom field
            ) : (
              <Input placeholder={placeholder || label} type={type} {...field} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
