import { Document, Model, Schema, model, models } from 'mongoose';

// Lesson interface
export interface ILesson extends Document {
  title: string;
  description?: string;
  duration: number;
  video_url?: string;
  active: boolean;
  slug: string;
  access: string;
  order: number;
}

// Lesson schema
const LessonSchema: Schema<ILesson> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    default: 0,
  },
  video_url: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: false,
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
  },
  access: {
    type: String,
    required: [true, 'Access type is required'],
    default: 'private',
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
  },
});

// Lesson model
const LessonModel =
  (models.Lesson as Model<ILesson>) || model<ILesson>('Lesson', LessonSchema);

export default LessonModel;
