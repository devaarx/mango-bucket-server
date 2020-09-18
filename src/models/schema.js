import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// user schema
export const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  type: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false }
});
