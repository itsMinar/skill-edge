import { Tv } from 'lucide-react';

import { cn } from '~/lib/utils';
import { getLesson } from '~/server/queries/lessons';

type CourseLessonProps = {
  lessonId: string;
};

export async function CourseLesson({ lessonId }: CourseLessonProps) {
  const lesson = await getLesson(lessonId);

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-x-2 text-sm font-[500] text-slate-500 transition-all hover:text-slate-600'
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn('text-slate-500')} />
        {lesson.title}
      </div>
    </button>
  );
}
