import { replaceMongoIdInArray } from '~/lib/convert-data';
import { getCourseDetails } from '~/server/queries/courses';

import { CourseDetails } from './_components/course-details';
import { CourseDetailsIntro } from './_components/course-details-intro';
import { Testimonials } from './_components/testimonials';

type SingleCoursePageProps = {
  params: {
    id: string;
  };
};

export default async function SingleCoursePage({
  params: { id },
}: SingleCoursePageProps) {
  const course = await getCourseDetails(id);

  return (
    <>
      <CourseDetailsIntro course={course} />

      <CourseDetails course={course} />

      {course.testimonials && course.testimonials.length > 0 && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course.testimonials)}
        />
      )}

      {/* <RelatedCourses /> */}
    </>
  );
}
