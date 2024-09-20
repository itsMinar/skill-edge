import { Document, Model, Schema, model, models } from 'mongoose';

// TODO: assessments will be modified
// Assessment interface
export interface IAssessment extends Document {
  assessments: string[];
  otherMarks: number;
}

// Assessment schema
const AssessmentSchema: Schema<IAssessment> = new Schema({
  assessments: {
    type: [String],
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
