import { BookCheck, Clock10 } from 'lucide-react';

import { Accordion } from '~/components/ui/accordion';
import { ICourseWithID } from '~/types';

import { CourseModule } from './course-module';

type CourseCurriculumProps = {
  course: ICourseWithID;
};

export function CourseCurriculum({ course }: CourseCurriculumProps) {
  const totalDuration = course?.modules.reduce((acc, obj) => {
    return acc + obj.duration;
  }, 0);

  return (
    <>
      <div className="mb-6 mt-4 flex flex-wrap items-center justify-center gap-x-5 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <BookCheck className="h-4 w-4" />
          {course?.modules?.length} Chapters
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="h-4 w-4" />
          {(totalDuration / 60).toPrecision(2)} Hours
        </span>
      </div>

      <Accordion
        defaultValue={['item-1', 'item-2', 'item-3']}
        type="multiple"
        className="w-full"
      >
        {course.modules &&
          course.modules.length > 0 &&
          course.modules.map((module) => (
            <CourseModule key={module._id as string} module={module} />
          ))}
      </Accordion>
    </>
  );
}
