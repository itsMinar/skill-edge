import { Document, Model, Schema, model, models } from 'mongoose';

// Report interface
export interface IReport extends Document {
  totalCompletedLessons?: Schema.Types.ObjectId[];
  totalCompletedModules?: Schema.Types.ObjectId[];
  course: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  quizAssessment?: Schema.Types.ObjectId;
  completion_date?: Date;
}

// Report schema
const ReportSchema: Schema<IReport> = new Schema({
  totalCompletedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: false,
    },
  ],
  totalCompletedModules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: false,
    },
  ],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizAssessment: {
    type: Schema.Types.ObjectId,
    ref: 'Assessment',
    required: false,
  },
  completion_date: {
    type: Date,
    required: false,
  },
});

// Report model
const ReportModel =
  (models.Report as Model<IReport>) || model<IReport>('Report', ReportSchema);

export default ReportModel;
