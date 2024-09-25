import { Document, Model, Schema, model, models } from 'mongoose';

export interface AssessmentOption {
  option: string;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface Assessment {
  quizId: Schema.Types.ObjectId;
  options: AssessmentOption[];
  attempted: boolean;
}

// Assessment interface
export interface IAssessment extends Document {
  assessments: Assessment[];
  otherMarks: number;
}

// Assessment schema
const AssessmentSchema: Schema<IAssessment> = new Schema({
  assessments: {
    type: [
      {
        quizId: { type: Schema.Types.ObjectId, required: true, ref: 'Quiz' },
        options: [
          {
            option: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
            isSelected: { type: Boolean, required: true },
          },
        ],
        attempted: { type: Boolean, required: true },
      },
    ],
    required: [true, 'Assessments are required'],
  },
  otherMarks: {
    type: Number,
    required: [true, 'Other marks are required'],
  },
});

// Assessment model
const AssessmentModel =
  (models.Assessment as Model<IAssessment>) ||
  model<IAssessment>('Assessment', AssessmentSchema);

export default AssessmentModel;
