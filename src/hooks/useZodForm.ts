import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { ZodType, TypeOf } from 'zod';

export function useZodForm<T extends ZodType<any, any, any>>(
  schema: T,
  options?: Omit<UseFormProps<TypeOf<T>>, 'resolver'>,
): UseFormReturn<TypeOf<T>> {
  return useForm<TypeOf<T>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
