import { replaceMongoIdInArray } from '~/lib/convert-data';

import CourseModel from '../models/course';
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

export async function getEnrollmentForUser(userId: string) {
  try {
    const enrollments = await EnrollmentModel.find({ student: userId })
      .populate({
        path: 'course',
        model: CourseModel,
      })
      .lean();
    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}

export async function hasEnrollmentForCourse(
  courseId: string,
  studentId: string
) {
  try {
    const enrollment = await EnrollmentModel.findOne({
      course: courseId,
      student: studentId,
    })
      .populate({
        path: 'course',
        model: CourseModel,
      })
      .lean();

    if (!enrollment) return false;

    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}
