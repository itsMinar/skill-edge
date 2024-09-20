import { Document, Model, Schema, model, models } from 'mongoose';

// Report interface
export interface IReport extends Document {
  totalCompletedLessons: string[];
  totalCompletedModules: string[];
  course: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  quizAssessment: Schema.Types.ObjectId;
  completion_date?: Date;
}

// Report schema
const ReportSchema: Schema<IReport> = new Schema({
  totalCompletedLessons: {
    type: [String],
    required: [true, 'Total completed lessons are required'],
  },
  totalCompletedModules: {
    type: [String],
    required: [true, 'Total completed modules are required'],
  },
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
