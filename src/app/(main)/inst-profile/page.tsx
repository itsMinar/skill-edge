import Image from 'next/image';

import { MessageSquare, Presentation, Star, UsersRound } from 'lucide-react';

import { CourseCard } from '~/components/course-card';
import { SectionTitle } from '~/components/section-title';
import { courses } from '~/data';

export default function InstructorProfile() {
  return (
    <section id="categories" className="space-y-6 py-6 lg:py-12">
      <div className="container grid grid-cols-12 gap-y-8 lg:gap-x-8">
        {/* Instructor Info */}
        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="mb-6">
              <div className="mx-auto mb-5 h-36 w-36 overflow-hidden rounded-full">
                <Image
                  src="https://avatars.githubusercontent.com/u/75926025?v=4"
                  alt="Teacher Name"
                  className="h-full w-full rounded object-cover"
                  width={100}
                  height={100}
                />
              </div>

              <div>
                <h4 className="text-center text-xl lg:text-2xl">
                  Teacher Name
                </h4>
                <div className="mb-6 text-center text-sm font-medium text-gray-600">
                  Senior Software Engineer
                </div>
                <ul className="grid grid-cols-1 flex-wrap items-center gap-3 text-sm font-medium text-gray-600 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-2">
                  <li className="flex items-center space-x-3">
                    <Presentation className="w-4 text-gray-600" />
                    <div>10+ Courses</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <UsersRound className="w-4 text-gray-600" />
                    <div>2k+ Students</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MessageSquare className="w-4 text-gray-600" />
                    <div>1500+ Reviews</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="w-4 text-gray-600" />
                    <div>4.9 Average Rating</div>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs leading-[1.8] text-gray-600">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomized words which do not look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there is not anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend.
            </p>
          </div>
        </div>
        {/* Courses */}
        <div className="col-span-12 lg:col-span-8">
          <div>
            <SectionTitle className="mb-6">Courses</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
