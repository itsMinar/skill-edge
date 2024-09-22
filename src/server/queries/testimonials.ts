import { replaceMongoIdInArray } from '~/lib/convert-data';

import TestimonialModel from '../models/testimonial';

export async function getTestimonialsForCourse(courseId: string) {
  const testimonials = await TestimonialModel.find({
    courseId: courseId,
  }).lean();
  return replaceMongoIdInArray(testimonials);
}
