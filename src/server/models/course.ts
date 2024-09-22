import { Document, Model, Schema, model, models } from 'mongoose';

// Course interface
export interface ICourse extends Document {
  title: string;
  subtitle?: string;
  description: string;
  thumbnail?: string;
  modules: Schema.Types.ObjectId[];
  price: number;
  active: boolean;
  category: Schema.Types.ObjectId;
  instructor: Schema.Types.ObjectId;
  quizSet: Schema.Types.ObjectId;
  testimonials: Schema.Types.ObjectId[];
  learning?: string[];
  createdOn: Date;
  modifiedOn: Date;
}

// Course schema
const CourseSchema: Schema<ICourse> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  subtitle: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  thumbnail: {
    type: String,
    required: false,
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Module',
    },
  ],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 0,
  },
  active: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  quizSet: {
    type: Schema.Types.ObjectId,
    ref: 'QuizSet',
  },
  testimonials: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Testimonial',
    },
  ],
  learning: {
    type: [String],
    required: false,
  },
  createdOn: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now(),
  },
  modifiedOn: {
    type: Date,
    required: [true, 'Modification date is required'],
    default: Date.now(),
  },
});

// Course model
const CourseModel =
  (models.Course as Model<ICourse>) || model<ICourse>('Course', CourseSchema);

export default CourseModel;
