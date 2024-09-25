import Image from 'next/image';

import { BookOpen } from 'lucide-react';

import { Badge } from '~/components/ui/badge';

export function EnrolledCourseCard() {
  return (
    <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Image
          src="/assets/images/courses/course_1.jpg"
          alt={'course'}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="line-clamp-2 text-lg font-medium group-hover:text-sky-700 md:text-base">
          Reactive Accelerator
        </div>
        <p className="text-xs text-muted-foreground">Development</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500">
            <div>
              <BookOpen className="w-4" />
            </div>
            <span>4 Chapters</span>
          </div>
        </div>
        <div className="mb-2 border-b pb-2">
          <div className="flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Total Modules: 10
            </p>
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Completed Modules <Badge>05</Badge>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Total Quizzes: 10
            </p>

            <p className="text-md font-medium text-slate-700 md:text-sm">
              Quiz taken <Badge>10</Badge>
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Mark from Quizzes
            </p>

            <p className="text-md font-medium text-slate-700 md:text-sm">50</p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-md font-medium text-slate-700 md:text-sm">
              Others
            </p>

            <p className="text-md font-medium text-slate-700 md:text-sm">50</p>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-md font-medium text-slate-700 md:text-sm">
            Total Marks
          </p>

          <p className="text-md font-medium text-slate-700 md:text-sm">100</p>
        </div>
      </div>
    </div>
  );
}
