import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from '~/lib/convert-data';
import CategoryModel from '~/server/models/category';
import CourseModel from '~/server/models/course';
import ModuleModel from '~/server/models/module';
import TestimonialModel from '~/server/models/testimonial';
import UserModel from '~/server/models/user';

import { getEnrollmentsForCourse } from './enrollments';
import { getTestimonialsForCourse } from './testimonials';

export async function getCourseList() {
  const courses = await CourseModel.find({})
    .select([
      'title',
      'subtitle',
      'thumbnail',
      'modules',
      'price',
      'category',
      'instructor',
    ])
    .populate({
      path: 'category',
      model: CategoryModel,
    })
    .populate({
      path: 'instructor',
      model: UserModel,
    })
    .populate({
      path: 'testimonials',
      model: TestimonialModel,
    })
    .populate({
      path: 'modules',
      model: ModuleModel,
    })
    .lean();

  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id: string) {
  const course = await CourseModel.findById(id)
    .populate({
      path: 'category',
      model: CategoryModel,
    })
    .populate({
      path: 'instructor',
      model: UserModel,
    })
    .populate({
      path: 'testimonials',
      model: TestimonialModel,
      populate: {
        path: 'user',
        model: UserModel,
      },
    })
    .populate({
      path: 'modules',
      model: ModuleModel,
    })
    .lean();

  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId: string) {
  const courses = await CourseModel.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );

  const groupByCourses = Object.groupBy(
    enrollments.flat(),
    ({ course }) => course
  );

  const totalRevenue = courses.reduce((acc, currentCourse) => {
    return (
      acc +
      (groupByCourses[currentCourse._id.toString()]?.length || 0) *
        currentCourse.price
    );
  }, 0);

  const totalEnrollments = enrollments.reduce((total, currentValue) => {
    return total + currentValue.length;
  }, 0);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();

  const totalRating = totalTestimonials.reduce((acc, obj) => {
    return acc + obj.rating;
  }, 0);

  const avgRating =
    totalTestimonials.length > 0 ? totalRating / totalTestimonials.length : 0;

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
    totalRevenue,
  };
}
