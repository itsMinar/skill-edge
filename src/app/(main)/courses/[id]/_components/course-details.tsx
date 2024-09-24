import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { formatDate } from '~/lib/format-date';
import { ICourseWithID } from '~/types';

import { CourseCurriculum } from './course-curriculum';
import { CourseInstructor } from './course-instructor';
import { CourseOverview } from './course-overview';

type CourseDetailsProps = {
  course: ICourseWithID;
};

export function CourseDetails({ course }: CourseDetailsProps) {
  const lastModifiedDate = formatDate(course.modifiedOn);

  return (
    <section className="py-8 md:py-12 lg:py-24">
      <div className="container">
        <span className="inline-block rounded-full bg-success px-4 py-0.5 text-xs font-medium text-white">
          {course.category.title}
        </span>
        <h3 className="mt-3 text-2xl font-bold md:text-3xl lg:text-4xl 2xl:text-5xl">
          {course.title}
        </h3>
        <p className="mt-3 text-sm text-gray-600">{course?.subtitle}</p>
        {/*  */}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:gap-20">
          <div className="flex items-center gap-2">
            <Image
              className="h-[40px] w-[40px] rounded-full"
              src={course.instructor.profilePicture as string}
              alt={course.instructor.firstName}
              width={40}
              height={40}
            />
            <p className="font-bold">
              {`${course.instructor.firstName} ${course.instructor.lastName}`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-success">Last Updated: </span>
            <span>{lastModifiedDate}</span>
          </div>
        </div>

        {/* Tab */}
        <div className="my-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="my-6 grid w-full max-w-[768px] grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <CourseOverview
                description={course.description}
                learning={course.learning as string[]}
              />
            </TabsContent>
            <TabsContent value="curriculum">
              <CourseCurriculum course={course} />
            </TabsContent>
            <TabsContent value="instructor">
              <CourseInstructor instructor={course.instructor} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
