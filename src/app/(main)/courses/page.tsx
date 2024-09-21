import { CourseCard } from '~/components/course-card';
import { getCourseList } from '~/server/queries/courses';

import { ActiveFilters } from './_components/active-filters';
import { FilterCourse } from './_components/filter-course';
import { FilterCourseMobile } from './_components/filter-course-mobile';
import { SearchCourse } from './_components/search-course';
import { SortCourse } from './_components/sort-course';

export default async function CoursesPage() {
  const courses = await getCourseList();

  return (
    <section
      id="courses"
      className="container space-y-6 py-6 dark:bg-transparent"
    >
      <h2 className="text-xl font-medium md:text-2xl">All Courses</h2>
      <div className="flex flex-col items-baseline justify-between gap-4 border-b border-gray-200 pb-6 lg:flex-row">
        <SearchCourse />

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse />
          {/* Filter Menus For Mobile */}
          <FilterCourseMobile />
        </div>
      </div>

      {/* active filters */}
      <ActiveFilters
        filter={{
          categories: ['development'],
          price: ['free'],
          sort: '',
        }}
      />
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <FilterCourse />
          {/* Course grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-3 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
