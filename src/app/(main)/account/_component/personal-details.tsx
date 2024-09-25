'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { updateUserInfo } from '~/server/actions/account';
import { IUser } from '~/server/models/user';

// Define the Zod schema for validation
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  designation: z.string().optional(),
  bio: z.string().optional(),
});

// Extract type from schema
type FormData = z.infer<typeof schema>;

// Define the props type
type PersonalDetailsProps = {
  userInfo: IUser;
};

export function PersonalDetails({ userInfo }: PersonalDetailsProps) {
  // Initialize the form with default values - userInfo
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      designation: userInfo.designation,
      bio: userInfo.bio,
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      await updateUserInfo(userInfo.email, data as IUser);
      toast.success('User details updated successfully.');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
      <h5 className="mb-4 text-lg font-semibold">Personal Detail :</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Label htmlFor="firstName" className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              className="mb-2"
              placeholder="First Name"
              id="firstName"
              {...register('firstName')}
            />
            {errors.firstName && (
              <span className="pl-2 text-red-600">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="lastName" className="mb-2 block">
              Last Name : <span className="pl-2 text-red-600">*</span>
            </Label>
            <Input
              type="text"
              className="mb-2"
              placeholder="Last Name"
              id="lastName"
              {...register('lastName')}
            />
            {errors.lastName && (
              <span className="pl-2 text-red-600">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="mb-2 block">
              Your Email : <span className="pl-2 text-red-600">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              disabled
              defaultValue={userInfo.email}
            />
          </div>
          <div>
            <Label htmlFor="designation" className="mb-2 block">
              Designation :
            </Label>
            <Input
              type="text"
              id="designation"
              placeholder="Designation"
              {...register('designation')}
            />
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label htmlFor="bio" className="mb-2 block">
              Bio :
            </Label>
            <Textarea id="bio" placeholder="Bio" {...register('bio')} />
          </div>
        </div>
        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </div>
  );
}
