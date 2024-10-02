'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { UploadDropzone } from '~/components/file-upload';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Combobox } from '~/components/ui/combobox';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Textarea } from '~/components/ui/textarea';
import { cn } from '~/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!',
  }),
  date: z.date({ required_error: 'Date is required!' }),
  time: z.string({ required_error: 'Time is required!' }).min(1, {
    message: 'Time is required!',
  }),
  description: z.string().min(1, {
    message: 'Description is required!',
  }),
  thumbnail: z.string().min(1, {
    message: 'Thumbnail is required!',
  }),
  url: z.string().min(1, {
    message: 'Thumbnail is required!',
  }),
  quizSet: z.string().min(1, {
    message: 'Quiz Set is required!',
  }),
});

// Define types based on the Login schema
type FormData = z.infer<typeof formSchema>;

export default function AddLive() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      router.push(`/dashboard/lives`);
      toast.success('Live created');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
    }
    console.log(values);
  };

  return (
    <section className="py-8">
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
                    <FormLabel>Live Title</FormLabel>
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
              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <UploadDropzone />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        className="block"
                        disabled={isSubmitting}
                        placeholder="Select time"
                        {...field}
                        type="time"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* video url */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        className="block"
                        disabled={isSubmitting}
                        placeholder="Video URL"
                        {...field}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quizSet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Set</FormLabel>
                    <FormControl>
                      <Combobox
                        options={[
                          {
                            label: 'Reactive Accelerator Quizes',
                            value: '1',
                          },
                          {
                            label: 'Think In A Redux Way Quizes',
                            value: '2',
                          },
                        ]}
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
                    <FormLabel>Live Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Live overview"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a brief description of your live
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/dashboard/lives">
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
    </section>
  );
}
