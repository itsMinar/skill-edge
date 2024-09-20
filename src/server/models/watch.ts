import { Document, Model, Schema, model, models } from 'mongoose';

// Watch interface
export interface IWatch extends Document {
  state: string;
  created_at: Date;
  modified_at: Date;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  module: Schema.Types.ObjectId;
  lastTime: number;
}

// Watch schema
const WatchSchema: Schema<IWatch> = new Schema({
  state: {
    type: String,
    required: [true, 'State is required'],
    default: 'started',
  },
  created_at: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now(),
  },
  modified_at: {
    type: Date,
    required: [true, 'Modification date is required'],
    default: Date.now(),
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  lastTime: {
    type: Number,
    required: [true, 'Last time is required'],
    default: 0,
  },
});

// Watch model
const WatchModel =
  (models.Watch as Model<IWatch>) || model<IWatch>('Watch', WatchSchema);

export default WatchModel;
