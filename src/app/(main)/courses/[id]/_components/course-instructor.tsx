/* eslint-disable @next/next/no-img-element */
import { MessageSquare, Presentation, Star, UsersRound } from 'lucide-react';

import { IUser } from '~/server/models/user';
import { getCourseDetailsByInstructor } from '~/server/queries/courses';

type CourseInstructorProps = {
  instructor: IUser;
};

export async function CourseInstructor({ instructor }: CourseInstructorProps) {
  const courseDetailsByInstructor = await getCourseDetailsByInstructor(
    instructor._id as string
  );

  return (
    <div className="rounded-md bg-gray-50 p-8">
      <div className="mb-8 md:flex md:gap-x-5">
        <div className="mb-5 h-[310px] w-[270px] max-w-full flex-none rounded md:mb-0">
          <img
            src={instructor.profilePicture}
            alt={instructor.firstName}
            className="h-full w-full rounded object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">
              {`${instructor.firstName} ${instructor.lastName}`}
            </h4>
            <div className="mb-6 font-medium text-gray-600">
              {instructor.designation}
            </div>
            <ul className="list space-y-4">
              <li className="flex items-center gap-3">
                <Presentation className="text-gray-600" />
                {courseDetailsByInstructor.courses}{' '}
                {courseDetailsByInstructor.courses > 1 ? 'Courses' : 'Course'}
              </li>
              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>
                  {courseDetailsByInstructor.enrollments}{' '}
                  {courseDetailsByInstructor.enrollments > 1
                    ? 'Students Learned'
                    : 'Student Learned'}
                </div>
              </li>
              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>
                  {courseDetailsByInstructor.reviews}{' '}
                  {courseDetailsByInstructor.reviews > 1 ? 'Reviews' : 'Review'}
                </div>
              </li>
              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>{courseDetailsByInstructor.ratings} Average Rating</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{instructor.bio}</p>
    </div>
  );
}
