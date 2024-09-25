'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
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
import {
  convertSocialMediaToArray,
  convertSocialMediaToObject,
} from '~/lib/convert-data';
import { updateUserInfo } from '~/server/actions/account';
import { IUser } from '~/server/models/user';

const socialPlatforms = ['facebook', 'github', 'twitter', 'linkedin'] as const;

// Define the Zod schema for validation
const schema = z.object({
  phone: z.string().optional(),
  socialMedia: z.array(
    z.object({
      platform: z.string().min(1, 'Platform is required'),
      link: z.string().url('Must be a valid URL'),
    })
  ),
});

// Extract type from schema
type FormData = z.infer<typeof schema>;

// Define the props type
type ContactInfoProps = {
  userInfo: IUser;
};

export function ContactInfo({ userInfo }: ContactInfoProps) {
  // convert the socialMediaObject to an Array
  const defaultSocialMediaValue = convertSocialMediaToArray(
    userInfo.socialMedia as Record<string, string>
  );

  // Initialize the form with default values - userInfo
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: userInfo.phone,
      socialMedia: defaultSocialMediaValue,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialMedia',
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    const socialMediaObject = convertSocialMediaToObject(data.socialMedia);

    const dataToUpdate = {
      phone: data.phone,
      socialMedia: socialMediaObject,
    };

    try {
      await updateUserInfo(userInfo.email, dataToUpdate as IUser);
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

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Label>Social Media {index + 1}</Label>
              <div className="flex gap-2">
                <Select
                  {...register(`socialMedia.${index}.platform`)}
                  defaultValue={field.platform}
                  onValueChange={(value) => {
                    setValue(`socialMedia.${index}.platform`, value, {
                      shouldValidate: true,
                    });
                  }}
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
                  {...register(`socialMedia.${index}.link`)}
                  placeholder="Link"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="px-2"
                >
                  <X />
                </Button>
              </div>
              {errors.socialMedia?.[index]?.platform && (
                <p className="text-sm text-red-500">
                  {errors.socialMedia[index]?.platform?.message}
                </p>
              )}
              {errors.socialMedia?.[index]?.link && (
                <p className="text-sm text-red-500">
                  {errors.socialMedia[index]?.link?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ platform: '', link: '' })}
          >
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
