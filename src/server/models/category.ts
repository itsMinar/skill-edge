import { Document, Model, Schema, model, models } from 'mongoose';

// Category interface
export interface ICategory extends Document {
  title: string;
  description?: string;
  thumbnail: string;
}

// Category schema
const CategorySchema: Schema<ICategory> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required'],
  },
});

// Category model
const CategoryModel =
  (models.Category as Model<ICategory>) ||
  model<ICategory>('Category', CategorySchema);

export default CategoryModel;
