'use client';

import { ArrowRight } from 'lucide-react';

import { Button, buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { createCheckoutSession } from '~/server/actions/stripe';

type EnrollCourseProps = {
  asLink?: boolean;
};

export const EnrollCourse = ({ asLink = false }: EnrollCourseProps) => {
  const formAction = async (data: FormData) => {
    const { url } = await createCheckoutSession(data);
    window.location.assign(url as string);
  };

  return (
    <form action={formAction}>
      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="h-7 gap-1 text-xs text-sky-700"
        >
          Enroll
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button type="submit" className={cn(buttonVariants({ size: 'lg' }))}>
          Enroll Now
        </Button>
      )}
    </form>
  );
};
