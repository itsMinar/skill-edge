import { replaceMongoIdInArray } from '~/lib/convert-data';

import EnrollmentModel from '../models/enrollment';

export async function getEnrollmentsForCourse(courseId: string) {
  const enrollments = await EnrollmentModel.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}
