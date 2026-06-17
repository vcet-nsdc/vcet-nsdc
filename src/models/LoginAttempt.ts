import mongoose, { Schema } from 'mongoose';

export interface ILoginAttempt {
  identifier: string;
  count: number;
  lockedUntil?: Date;
  createdAt: Date;
}

const LoginAttemptSchema = new Schema<ILoginAttempt>({
  identifier: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  lockedUntil: { type: Date },
  // Window auto-resets: TTL removes the document 15 minutes after creation.
  createdAt: { type: Date, default: Date.now },
});

LoginAttemptSchema.index({ createdAt: 1 }, { expireAfterSeconds: 15 * 60 });

const LoginAttempt =
  (mongoose.models.LoginAttempt as mongoose.Model<ILoginAttempt>) ||
  mongoose.model<ILoginAttempt>('LoginAttempt', LoginAttemptSchema);

export default LoginAttempt;
