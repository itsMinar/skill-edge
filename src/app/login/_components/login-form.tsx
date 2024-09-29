'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { credentialLogin } from '~/server/actions';

// Define Login schema for validation
const LoginSchema = z.object({
  email: z
    .string({ message: 'Email is Required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Password is Required' })
    .min(4, 'Password must be at least 6 characters'),
});

// Define types based on the Login schema
type LoginFormData = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  // Ensure onSubmit is properly typed
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setFormError(null);

    try {
      // Create a FormData object
      const formData = new FormData();

      // Append each key-value pair from the object to the FormData
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      const response = await credentialLogin(formData);

      if (!!response.error) {
        setFormError(response.error);
      } else {
        router.push('/courses');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      setFormError(errorMessage);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          {formError && (
            <div className="text-center text-red-500">{formError}</div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <br />
          <p>
            Register as{' '}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>{' '}
            or{' '}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
