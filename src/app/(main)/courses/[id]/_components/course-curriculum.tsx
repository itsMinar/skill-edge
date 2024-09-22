import { BookCheck, Clock10 } from 'lucide-react';

import { Accordion } from '~/components/ui/accordion';
import { type ICategory } from '~/server/models/category';
import { IModule } from '~/server/models/module';
import { IQuizSet } from '~/server/models/quiz-set';
import { ITestimonial } from '~/server/models/testimonial';
import { type IUser } from '~/server/models/user';

import { CourseModule } from './course-module';

type CourseCurriculumProps = {
  course: {
    title: string;
    subtitle?: string;
    description: string;
    thumbnail?: string;
    modules: IModule[];
    price: number;
    active: boolean;
    category: ICategory;
    instructor: IUser;
    quizSet: IQuizSet;
    testimonials: ITestimonial[];
    learning?: string[];
    createdOn: Date;
    modifiedOn: Date;
  };
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

      {/* contents */}
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
