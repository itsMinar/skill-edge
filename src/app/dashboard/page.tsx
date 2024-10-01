import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { formatPrice } from '~/lib/format-price';
import { auth } from '~/server/auth';
import { getCourseDetailsByInstructor } from '~/server/queries/courses';
import { getUserByEmail } from '~/server/queries/users';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) redirect('/login');

  const instructor = await getUserByEmail(session.user.email);

  if (instructor.role !== 'instructor') redirect('/account');

  const courseStats = await getCourseDetailsByInstructor(instructor.id);

  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseStats.courses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseStats.enrollments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(courseStats.totalRevenue as number)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
