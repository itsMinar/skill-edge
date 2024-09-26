import { type ICategory } from '~/server/models/category';
import { type ICourse } from '~/server/models/course';
import { type IEnrollment } from '~/server/models/enrollment';
import { type ILesson } from '~/server/models/lesson';
import { type IModule } from '~/server/models/module';
import { type IQuiz } from '~/server/models/quiz';
import { type IQuizSet } from '~/server/models/quiz-set';
import { ITestimonial } from '~/server/models/testimonial';
import { type IUser } from '~/server/models/user';

export interface NavLink {
  title: string;
  href: string;
  disabled: boolean;
}

export interface SocialMediaEntry {
  platform: string;
  link: string;
}

export interface IModuleExtended extends Omit<IModule, 'course' | 'lessonIds'> {
  course: ICourse;
  lessonIds: ILesson[];
}

export interface IQuizSetExtended extends Omit<IQuizSet, 'quizIds'> {
  quizIds: IQuiz[];
}

export interface ITestimonialExtended
  extends Omit<ITestimonial, 'user' | 'courseId'> {
  user: IUser;
  courseId: ICourse;
}

export interface ICourseExtended
  extends Omit<
    ICourse,
    'modules' | 'category' | 'instructor' | 'quizSet' | 'testimonials'
  > {
  modules: IModuleExtended[];
  category: ICategory;
  instructor: IUser;
  quizSet: IQuizSetExtended;
  testimonials: ITestimonialExtended[];
}

export interface ICourseWithID extends ICourseExtended {
  id: string;
}

export interface IEnrollmentExtended extends Omit<IEnrollment, 'course'> {
  course: ICourse;
}
