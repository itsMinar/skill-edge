'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!',
  }),
  description: z.string().min(1, {
    message: 'Description is required!',
  }),
});

// Define types based on the Login schema
type FormData = z.infer<typeof formSchema>;

export default function AddCourse() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { isSubmitting, errors } = form.formState;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      console.log('🚀 ~ SubmitHandler ~ values:', values);
      router.push(`/dashboard/courses/${1}`);
      toast.success('Course created');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      form.setError('root', { message: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
      <div className="w-[536px] max-w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-8"
          >
            {/* title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Reactive Accelerator'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Course overview"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a brief description of your course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errors.root && (
              <p className="text-sm font-medium text-destructive">
                {errors.root.message}
              </p>
            )}

            <div className="flex items-center gap-x-2">
              <Link href="/dashboard/courses">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
