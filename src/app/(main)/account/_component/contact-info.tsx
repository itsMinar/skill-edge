'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { IUser } from '~/server/models/user';

// Define the Zod schema for validation
const schema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must be numeric')
    .optional(),
  socialMedia: z.record(z.string()).optional(),
});

// Extract type from schema
type FormData = z.infer<typeof schema>;

// Define the props type
type ContactInfoProps = {
  userInfo: IUser;
};

export function ContactInfo({ userInfo }: ContactInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: userInfo.phone,
      socialMedia: userInfo.socialMedia,
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      console.log('🚀 ~ onSubmit ~ data:', data);
      toast.success('Contact info updated successfully.');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      toast.error(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <h5 className="mb-4 text-lg font-semibold">Contact Info :</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label htmlFor="phone" className="mb-2 block">
              Phone No. :
            </Label>
            <Input
              {...register('phone')}
              id="phone"
              type="text"
              placeholder="Phone :"
            />
          </div>
          <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              {...register('socialMedia.website')}
              type="text"
              placeholder="Url :"
            />
          </div>
        </div>
        <Button type="submit" className="mt-5" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </div>
  );
}
