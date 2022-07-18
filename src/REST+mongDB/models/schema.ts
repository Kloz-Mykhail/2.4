import mongoose from 'mongoose';
import { User } from '../types';

const { Schema } = mongoose;

const userSchema = new Schema<User>({
  login: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  items: [
    {
      id: { type: Number, required: true },
      text: { type: String, required: true },
      checked: { type: Boolean, required: true },
    },
  ],
});

export default mongoose.model<User>('User', userSchema);
