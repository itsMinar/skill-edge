import { Document, Model, Schema, model, models } from 'mongoose';

// TODO: options will be modified
// Quiz interface
export interface IQuiz extends Document {
  title: string;
  description?: string;
  explanations?: string;
  slug?: string;
  options: string[];
  mark: number;
}

// Quiz schema
const QuizSchema: Schema<IQuiz> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  explanations: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  options: {
    type: [String],
    required: [true, 'Options are required'],
  },
  mark: {
    type: Number,
    required: [true, 'Mark is required'],
    default: 5,
  },
});

// Quiz model
const QuizModel =
  (models.Quiz as Model<IQuiz>) || model<IQuiz>('Quiz', QuizSchema);

export default QuizModel;
