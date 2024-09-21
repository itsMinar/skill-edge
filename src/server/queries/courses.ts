import { replaceMongoIdInArray } from '~/lib/convert-data';
import CategoryModel from '~/server/models/category';
import CourseModel from '~/server/models/course';
import ModuleModel from '~/server/models/module';
import TestimonialModel from '~/server/models/testimonial';
import UserModel from '~/server/models/user';

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
