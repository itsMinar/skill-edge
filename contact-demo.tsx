'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { IUser } from '~/server/models/user';

const socialPlatforms = ['facebook', 'github', 'twitter', 'linkedin'] as const;

// Define the Zod schema for validation
const schema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must be numeric')
    .optional(),
  socialMedia: z.record(
    z.enum(socialPlatforms),
    z.string().url('Must be a valid URL')
  ),
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
    formState: { errors, isSubmitting, defaultValues },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: userInfo.phone,
      socialMedia: {
        github: 'https://facebook.com/agun-bhai',
      },
    },
  });

  const [socialMediaFields, setSocialMediaFields] = useState<string[]>([
    defaultValues?.socialMedia as string,
  ]);
  const watchSocialMedia = watch('socialMedia');

  const addSocialMediaField = () => {
    setSocialMediaFields([...socialMediaFields, '']);
  };

  const removeSocialMediaField = (index: number) => {
    const updatedFields = [...socialMediaFields];
    const removedPlatform = updatedFields[index];
    updatedFields.splice(index, 1);

    setSocialMediaFields(updatedFields);

    // Remove the corresponding social media entry from form values
    const updatedSocialMedia = watchSocialMedia as Record<string, string>;

    // Ensure that we only delete if the platform exists
    if (removedPlatform && updatedSocialMedia[removedPlatform]) {
      delete updatedSocialMedia[removedPlatform];
      setValue('socialMedia', updatedSocialMedia);
    }
  };

  // const removeSocialMediaField = (index: number) => {
  //   const updatedFields = socialMediaFields.filter((_, i) => i !== index);
  //   setSocialMediaFields(updatedFields);

  //   // Remove the corresponding social media entry
  //   const updatedSocialMedia = { ...watchSocialMedia };
  //   delete updatedSocialMedia[Object.keys(updatedSocialMedia)[index]];
  //   setValue('socialMedia', updatedSocialMedia);
  // };

  const handlePlatformChange = (newPlatform: string, index: number) => {
    const updatedSocialMedia = { ...watchSocialMedia } as Record<
      string,
      string
    >;

    // Get the old platform key using the index
    const oldKey = Object.keys(updatedSocialMedia)[index];

    // If the new platform already exists in the object, we should handle it appropriately
    if (updatedSocialMedia[newPlatform] && newPlatform !== oldKey) {
      toast.error(`${newPlatform} already exists!`);
      return;
    }

    // Preserve the old value
    const oldValue = updatedSocialMedia[oldKey] || '';

    // Remove the old key and set the new key with the preserved value
    delete updatedSocialMedia[oldKey];
    updatedSocialMedia[newPlatform] = oldValue;

    // Update form values
    setValue('socialMedia', updatedSocialMedia);
  };

  // const handlePlatformChange = (value: string, index: number) => {
  //   const updatedSocialMedia = { ...watchSocialMedia };
  //   const oldKey = Object.keys(updatedSocialMedia)[index];
  //   const oldValue = updatedSocialMedia[oldKey] || '';
  //   delete updatedSocialMedia[oldKey];
  //   updatedSocialMedia[value] = oldValue;
  //   setValue('socialMedia', updatedSocialMedia);
  // };

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
              type="number"
              placeholder="Phone :"
            />
          </div>
          {/* <div>
            <Label className="mb-2 block">Website :</Label>
            <Input
              {...register('socialMedia.website')}
              type="text"
              placeholder="Url :"
            />
          </div> */}

          {socialMediaFields.map((_, index) => {
            const platformKey = Object.keys(watchSocialMedia)[index] || '';
            return (
              <div key={index} className="space-y-2">
                <Label>Social Media {index + 1}</Label>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(value) =>
                      handlePlatformChange(value, index)
                    }
                    value={platformKey}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialPlatforms.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    {...register(`socialMedia.${platformKey}`)}
                    placeholder="Link"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeSocialMediaField(index)}
                    className="px-2"
                  >
                    <X />
                  </Button>
                </div>
                {errors.socialMedia && errors.socialMedia[platformKey] && (
                  <p className="text-sm text-red-500">
                    {errors.socialMedia[platformKey]?.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex gap-4">
          <Button type="button" variant="outline" onClick={addSocialMediaField}>
            Add Social Media
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
