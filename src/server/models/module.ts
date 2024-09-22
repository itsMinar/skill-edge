import { Document, Model, Schema, model, models } from 'mongoose';

// Module interface
export interface IModule extends Document {
  title: string;
  description?: string;
  active: boolean;
  slug: string;
  course: Schema.Types.ObjectId;
  lessonIds: Schema.Types.ObjectId[];
  order: number;
  duration: number;
}

// Module schema
const ModuleSchema: Schema<IModule> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
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
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course is required'],
    ref: 'Course',
  },
  lessonIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  order: {
    type: Number,
    required: [true, 'Order is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
});

// Module model
const ModuleModel =
  (models.Module as Model<IModule>) || model<IModule>('Module', ModuleSchema);

export default ModuleModel;
