import mongoose, { Schema, Document, Types } from 'mongoose';

export type CmsType =
  | 'team'
  | 'faq'
  | 'sponsor'
  | 'announcement'
  | 'social'
  | 'page'
  | 'gallery';

export const CMS_TYPES: CmsType[] = ['team', 'faq', 'sponsor', 'announcement', 'social', 'page', 'gallery'];

export type CmsStatus = 'draft' | 'published';

export interface ICmsVersion {
  version: number;
  data: Record<string, unknown>;
  publishedAt: Date;
  publishedBy?: Types.ObjectId;
}

export interface ICmsContent extends Document {
  _id: Types.ObjectId;
  type: CmsType;
  key?: string;
  status: CmsStatus;
  order: number;
  data: Record<string, unknown>;
  version: number;
  versions: ICmsVersion[];
  publishedAt?: Date;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VersionSchema = new Schema<ICmsVersion>(
  {
    version: Number,
    data: { type: Schema.Types.Mixed },
    publishedAt: Date,
    publishedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: false }
);

const CmsContentSchema = new Schema<ICmsContent>(
  {
    type: { type: String, enum: CMS_TYPES, required: true },
    key: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    order: { type: Number, default: 0 },
    data: { type: Schema.Types.Mixed, default: {} },
    version: { type: Number, default: 0 },
    versions: { type: [VersionSchema], default: [] },
    publishedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

CmsContentSchema.index({ type: 1, status: 1, order: 1 });
CmsContentSchema.index({ type: 1, key: 1 });

const CmsContent =
  (mongoose.models.CmsContent as mongoose.Model<ICmsContent>) ||
  mongoose.model<ICmsContent>('CmsContent', CmsContentSchema);

export default CmsContent;
