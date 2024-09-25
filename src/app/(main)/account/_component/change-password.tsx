'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { changePassword } from '~/server/actions/account';

// Define the Zod schema for password validation
const schema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Define type based on the schema
type FormData = z.infer<typeof schema>;

// Define the props type
type ChangePasswordProps = {
  email: string;
};

export function ChangePassword({ email }: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await changePassword(email, data.oldPassword, data.newPassword);
      toast.success('Password Updated successfully.');
    } catch (error) {
      toast.error(
        `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred.'}`
      );
    }
  };

  return (
    <div>
      <h5 className="mb-4 text-lg font-semibold">Change password :</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block" htmlFor="oldPassword">
              Old password :
            </Label>
            <Input
              {...register('oldPassword')}
              id="oldPassword"
              type="password"
              placeholder="Old password"
              className="mb-2"
            />
            {errors.oldPassword && (
              <span className="pl-2 text-red-600">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="newPassword">
              New password :
            </Label>
            <Input
              {...register('newPassword')}
              id="newPassword"
              type="password"
              placeholder="New password"
              className="mb-2"
            />
            {errors.newPassword && (
              <span className="pl-2 text-red-600">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="confirmPassword">
              Re-type New password :
            </Label>
            <Input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              placeholder="Re-type New password"
              className="mb-2"
            />
            {errors.confirmPassword && (
              <span className="pl-2 text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <Button disabled={isSubmitting} className="mt-5" type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Password Updating...
            </>
          ) : (
            'Update Password'
          )}
        </Button>
      </form>
    </div>
  );
}
