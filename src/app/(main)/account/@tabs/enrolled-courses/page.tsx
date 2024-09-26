import { redirect } from 'next/navigation';

import { auth } from '~/server/auth';
import { getEnrollmentForUser } from '~/server/queries/enrollments';
import { getUserByEmail } from '~/server/queries/users';

import { EnrolledCourseCard } from '../../_component/enrolled-course-card';

export default async function EnrolledCourses() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const loggedInUser = await getUserByEmail(session.user.email);

  const enrolledCourses = await getEnrollmentForUser(loggedInUser.id);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {enrolledCourses && enrolledCourses.length > 0 ? (
        enrolledCourses.map((enrollment) => (
          <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
        ))
      ) : (
        <div>No enrollment available!</div>
      )}
    </div>
  );
}
