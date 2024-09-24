import { type ICategory } from '~/server/models/category';
import { type ICourse } from '~/server/models/course';
import { type ILesson } from '~/server/models/lesson';
import { type IModule } from '~/server/models/module';
import { type IQuiz } from '~/server/models/quiz';
import { type IQuizSet } from '~/server/models/quiz-set';
import { type ITestimonial } from '~/server/models/testimonial';
import { type IUser } from '~/server/models/user';

export type NavLink = {
  title: string;
  href: string;
  disabled: boolean;
};

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
