import Link from 'next/link';

import { CircleCheck } from 'lucide-react';

import { Button } from '~/components/ui/button';

export default function EnrollSuccessPage() {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-6 text-center">
        <CircleCheck className="h-32 w-32 rounded-full bg-success p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! You Enrollment was Successful
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/courses/66549c99b2aaa1cc3461fc9a">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
