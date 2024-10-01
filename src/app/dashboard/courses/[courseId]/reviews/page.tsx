import { getCourseDetails } from '~/server/queries/courses';
import { getInstructorDashboardData } from '~/server/queries/dashboard';

import { type IReviewColumn, columns } from './_components/columns';
import { DataTable } from './_components/data-table';

type ReviewsPageProps = {
  params: {
    courseId: string;
  };
};

export default async function ReviewsPage({
  params: { courseId },
}: ReviewsPageProps) {
  const course = await getCourseDetails(courseId);
  const reviews = await getInstructorDashboardData('review');

  return (
    <div className="p-6">
      <h2>{course?.title}</h2>
      <DataTable columns={columns} data={reviews as IReviewColumn[]} />
    </div>
  );
}
