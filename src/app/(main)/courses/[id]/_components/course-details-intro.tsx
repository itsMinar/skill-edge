import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { EnrollCourse } from '~/components/enroll-course';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { auth } from '~/server/auth';
import { hasEnrollmentForCourse } from '~/server/queries/enrollments';
import { getUserByEmail } from '~/server/queries/users';
import { ICourseWithID } from '~/types';

type CourseDetailsIntroProps = {
  course: ICourseWithID;
};

export async function CourseDetailsIntro({ course }: CourseDetailsIntroProps) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const loggedInUser = await getUserByEmail(session.user.email);
  const hasEnrollment = await hasEnrollmentForCourse(
    course.id,
    loggedInUser.id
  );

  return (
    <div className="grainy overflow-x-hidden">
      <section className="pt-12 sm:pt-16">
        <div className="container">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="px-6 font-inter text-lg text-gray-600">
                {course?.subtitle}
              </h1>
              <p className="font-pj mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                <span className="relative inline-flex sm:inline">
                  <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg filter"></span>
                  <span className="relative">{course?.title}</span>
                </span>
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {hasEnrollment ? (
                  <Link href="#" className={cn(buttonVariants({ size: 'lg' }))}>
                    Access Course
                  </Link>
                ) : (
                  <EnrollCourse courseId={course.id} />
                )}

                <Link
                  href=""
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' })
                  )}
                >
                  See Intro
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 pb-12">
            <div className="relative">
              <div className="absolute inset-0 h-2/3"></div>
              <div className="relative mx-auto">
                <div className="lg:mx-auto lg:max-w-3xl">
                  <Image
                    className="w-full rounded-lg"
                    width={768}
                    height={463}
                    src={course?.thumbnail as string}
                    alt={course?.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
