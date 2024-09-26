import { getInstructorDashboardData } from '~/server/queries/dashboard';

import { type ICourseColumn, columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export default async function CoursesPage() {
  const courses = await getInstructorDashboardData('course');

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses as ICourseColumn[]} />
    </div>
  );
}
