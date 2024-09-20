import { Document, Model, Schema, model, models } from 'mongoose';

// Enrollment interface
export interface IEnrollment extends Document {
  enrollment_date: Date;
  status: string;
  completion_date?: Date;
  method: string;
  course: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
}

// Enrollment schema
const EnrollmentSchema: Schema<IEnrollment> = new Schema({
  enrollment_date: {
    type: Date,
    required: [true, 'Enrollment date is required'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
  },
  completion_date: {
    type: Date,
    required: false,
  },
  method: {
    type: String,
    required: [true, 'Method is required'],
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
});

// Enrollment model
const EnrollmentModel =
  (models.Enrollment as Model<IEnrollment>) ||
  model<IEnrollment>('Enrollment', EnrollmentSchema);

export default EnrollmentModel;
