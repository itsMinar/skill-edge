import { Document, Model, Schema, model, models } from 'mongoose';

// User interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
  role: string;
  bio?: string;
  socialMedia?: Record<string, string>;
  profilePicture?: string;
  designation?: string;
}

// User schema
const UserSchema: Schema<IUser> = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
  bio: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: Object,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  designation: {
    type: String,
    required: false,
  },
});

// User model
const UserModel =
  (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default UserModel;
