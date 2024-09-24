import { replaceMongoIdInArray } from '~/lib/convert-data';

import EnrollmentModel from '../models/enrollment';

export async function getEnrollmentsForCourse(courseId: string) {
  const enrollments = await EnrollmentModel.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}

export async function enrollForCourse(
  courseId: string,
  userId: string,
  paymentMethod: string
) {
  const newEnrollment = {
    course: courseId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: 'not-started',
  };

  try {
    const response = await EnrollmentModel.create(newEnrollment);
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to enroll for course: ${errorMessage}`);
  }
}
