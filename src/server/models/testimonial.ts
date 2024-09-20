import { Document, Model, Schema, model, models } from 'mongoose';

// Testimonial interface
export interface ITestimonial extends Document {
  content: string;
  user: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  rating: number;
}

// Testimonial schema
const TestimonialSchema: Schema<ITestimonial> = new Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
  },
});

// Testimonial model
const TestimonialModel =
  (models.Testimonial as Model<ITestimonial>) ||
  model<ITestimonial>('Testimonial', TestimonialSchema);

export default TestimonialModel;
