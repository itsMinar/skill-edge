import { getCourseDetails } from '~/server/queries/courses';
import { getInstructorDashboardData } from '~/server/queries/dashboard';

import { type IEnrollmentColumn, columns } from './_components/columns';
import { DataTable } from './_components/data-table';

type EnrollmentsPageProps = {
  params: {
    courseId: string;
  };
};

export default async function EnrollmentsPage({
  params: { courseId },
}: EnrollmentsPageProps) {
  const course = await getCourseDetails(courseId);
  const enrollments = await getInstructorDashboardData('enrollment');

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={enrollments as IEnrollmentColumn[]} />
    </div>
  );
}
