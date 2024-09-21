import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, ArrowRightIcon, BookOpen } from 'lucide-react';

import { SectionTitle } from '~/components/section-title';
import { Button, buttonVariants } from '~/components/ui/button';
import { formatPrice } from '~/lib/format-price';
import { cn } from '~/lib/utils';
import { getCategories } from '~/server/queries/categories';
import { getCourseList } from '~/server/queries/courses';

export default async function HomePage() {
  const courses = await getCourseList();
  const categories = await getCategories();

  return (
    <>
      <section className="grainy space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container relative isolate flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <span className="rounded-2xl border bg-muted px-4 py-1.5 text-sm font-medium shadow-lg">
            Hey, Welcome
          </span>
          <h1 className="font-heading text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Learn Today, Lead Tomorrow.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            “You don’t understand anything until you learn it more than one
            way.”
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/courses"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Explore Now
            </Link>
            <Link
              href=""
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                })
              )}
            >
              Become An Instructor
            </Link>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section
        id="categories"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="flex items-center justify-between">
          <SectionTitle>Categories</SectionTitle>

          <Link
            href={''}
            className="flex items-center gap-1 text-sm font-medium hover:opacity-80"
          >
            Browse All <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto grid grid-cols-2 justify-center gap-4 md:grid-cols-3 2xl:grid-cols-4">
          {categories.map((category) => {
            return (
              <Link
                href={`/categories/${category.id}`}
                key={category.id}
                className="relative overflow-hidden rounded-lg border bg-background p-2 transition-all duration-500 ease-in-out hover:scale-105"
              >
                <div className="flex flex-col items-center justify-between gap-4 rounded-md p-6">
                  <Image
                    src={`/assets/images/categories/${category.thumbnail}`}
                    alt={category.title}
                    width={100}
                    height={100}
                  />
                  <h3 className="font-bold">{category.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="container space-y-6 md:py-12 lg:py-24">
        <div className="flex items-center justify-between">
          <SectionTitle>Courses</SectionTitle>
          <Link
            href={''}
            className="flex items-center gap-1 text-sm font-medium hover:opacity-80"
          >
            Browse All <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={`/assets/images/courses/${course.thumbnail}`}
                    alt={course.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <div className="line-clamp-2 text-lg font-medium group-hover:text-sky-700 md:text-base">
                    {course.title}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {course.category.title}
                  </p>
                  <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                      <div>
                        <BookOpen className="w-4" />
                      </div>
                      <span>{course.modules.length} Chapters</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-md font-medium text-slate-700 md:text-sm">
                      {formatPrice(49)}
                    </p>

                    <Button
                      variant="ghost"
                      className="h-7 gap-1 text-xs text-sky-700"
                    >
                      Enroll
                      <ArrowRight className="w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
