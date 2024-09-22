import { replaceMongoIdInObject } from '~/lib/convert-data';

import LessonModel from '../models/lesson';

export async function getLesson(lessonId: string) {
  const lesson = await LessonModel.findById(lessonId).lean();
  return replaceMongoIdInObject(lesson);
}
