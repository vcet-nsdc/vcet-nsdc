import mongoose, { Schema, Document, Types } from 'mongoose';

export type MediaType = 'image' | 'video' | 'pdf';
export type MediaRefType =
  | 'registration_proof'
  | 'event_cover'
  | 'gallery'
  | 'sponsor'
  | 'certificate'
  | 'cms';

export interface IMediaAsset extends Document {
  _id: Types.ObjectId;
  provider: 'cloudinary';
  publicId: string;
  url: string;
  secureUrl: string;
  type: MediaType;
  width?: number;
  height?: number;
  bytes?: number;
  folder?: string;
  uploadedBy?: Types.ObjectId;
  refType?: MediaRefType;
  refId?: Types.ObjectId;
  createdAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>({
  provider: { type: String, default: 'cloudinary' },
  publicId: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  secureUrl: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'pdf'], default: 'image' },
  width: { type: Number },
  height: { type: Number },
  bytes: { type: Number },
  folder: { type: String },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  refType: {
    type: String,
    enum: ['registration_proof', 'event_cover', 'gallery', 'sponsor', 'certificate', 'cms'],
  },
  refId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
});

MediaAssetSchema.index({ refType: 1, refId: 1 });

const MediaAsset =
  (mongoose.models.MediaAsset as mongoose.Model<IMediaAsset>) ||
  mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema);

export default MediaAsset;
