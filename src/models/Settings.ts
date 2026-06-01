import mongoose, { Schema, Document, Types } from 'mongoose';

export type SettingsScope = 'business' | 'technical';

export interface ISettings extends Document {
  _id: Types.ObjectId;
  scope: SettingsScope;
  data: Record<string, unknown>;
  updatedBy?: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    scope: { type: String, enum: ['business', 'technical'], required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Settings =
  (mongoose.models.Settings as mongoose.Model<ISettings>) ||
  mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
