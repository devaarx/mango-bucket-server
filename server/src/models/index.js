import mongoose from 'mongoose';
import { UserSchema } from './schema';

// user model
export const User = mongoose.model('User', UserSchema);
