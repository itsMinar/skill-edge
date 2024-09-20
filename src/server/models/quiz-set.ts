import { Document, Model, Schema, model, models } from 'mongoose';

// QuizSet interface
export interface IQuizSet extends Document {
  title: string;
  description?: string;
  slug?: string;
  quizIds: Schema.Types.ObjectId[];
  active: boolean;
}

// QuizSet schema
const QuizSetSchema: Schema<IQuizSet> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  quizIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  active: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: false,
  },
});

// QuizSet model
const QuizSetModel =
  (models.QuizSet as Model<IQuizSet>) ||
  model<IQuizSet>('QuizSet', QuizSetSchema);

export default QuizSetModel;
