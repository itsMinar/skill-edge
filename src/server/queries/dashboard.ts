import { auth } from '~/server/auth';
import { Assessment } from '~/server/models/assessment';
import { type IEnrollment } from '~/server/models/enrollment';
import { type ITestimonial } from '~/server/models/testimonial';

import { getCourseDetails, getCourseDetailsByInstructor } from './courses';
import { getAReport } from './reports';
import { getUserByEmail, getUserDetails } from './users';

// Constants for identifying the data type
export const COURSE_DATA = 'course';
export const ENROLLMENT_DATA = 'enrollment';
export const REVIEW_DATA = 'review';

// Create a union type for the dataType parameter
type IDataType =
  | typeof COURSE_DATA
  | typeof ENROLLMENT_DATA
  | typeof REVIEW_DATA;

interface ITestimonialData extends ITestimonial {
  studentName?: string;
}

interface IEnrollmentData extends IEnrollment {
  studentName?: string;
  studentEmail?: string;
  progress?: number;
  quizMark?: number;
}

const populateReviewData = async (reviews: ITestimonialData[]) => {
  const populatedReviews = await Promise.all(
    reviews.map(async (review) => {
      const student = await getUserDetails(review?.user.toString());
      review['studentName'] = `${student?.firstName} ${student?.lastName}`;
      return review;
    })
  );

  return populatedReviews;
};

const populateEnrollmentData = async (enrollments: IEnrollmentData[]) => {
  const populatedEnrollments = await Promise.all(
    enrollments.map(async (enrollment) => {
      // Update Student Information
      const student = await getUserDetails(enrollment?.student.toString());
      enrollment['studentName'] = `${student?.firstName} ${student?.lastName}`;
      enrollment['studentEmail'] = student?.email;

      // Update Quiz and Progress Info
      const filter = {
        course: enrollment?.course.toString(),
        student: enrollment?.student.toString(),
      };

      const report = await getAReport(filter);

      enrollment['progress'] = 0;
      enrollment['quizMark'] = 0;

      if (report) {
        // Calculate progress
        const course = await getCourseDetails(enrollment?.course.toString());
        const totalModules = course?.modules?.length;
        const totalCompletedModules = report?.totalCompletedModules?.length;
        const progress = (totalCompletedModules / totalModules) * 100;
        enrollment['progress'] = progress;

        // Calculate Quiz Marks
        const quizzes: Assessment[] = report?.quizAssessment?.assessments;
        const quizzesTaken = quizzes.filter((q) => q.attempted);
        const totalCorrect = quizzesTaken
          .map((quiz) => {
            const item = quiz.options;
            return item.filter((o) => {
              return o.isCorrect === true && o.isSelected === true;
            });
          })
          .filter((elem) => elem.length > 0)
          .flat();
        const marksFromQuizzes = totalCorrect.length * 5;
        enrollment['quizMark'] = marksFromQuizzes;
      }
      return enrollment;
    })
  );

  return populatedEnrollments;
};

export async function getInstructorDashboardData(dataType: IDataType) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error('Please login first');
    }

    const instructor = await getUserByEmail(session.user.email);
    const data = await getCourseDetailsByInstructor(instructor?.id, true);

    switch (dataType) {
      case COURSE_DATA:
        return data?.courses;
      case REVIEW_DATA:
        return populateReviewData(data?.reviews as ITestimonialData[]);
      case ENROLLMENT_DATA:
        return populateEnrollmentData(data?.enrollments as IEnrollmentData[]);

      default:
        return data;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error: ${errorMessage}`);
  }
}
