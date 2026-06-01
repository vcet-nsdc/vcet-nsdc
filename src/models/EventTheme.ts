import mongoose, { Schema, Document, Types } from 'mongoose';

export type ThemeCategory =
  | 'hackathon'
  | 'workshop'
  | 'webinar'
  | 'bootcamp'
  | 'competition'
  | 'custom';

export type SectionType =
  | 'hero'
  | 'about'
  | 'schedule'
  | 'sponsors'
  | 'gallery'
  | 'faq'
  | 'register';

export interface IThemeSection {
  type: SectionType;
  enabled: boolean;
  order: number;
  config?: Record<string, unknown>;
}

export interface IEventTheme extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  category: ThemeCategory;
  layout: { sections: IThemeSection[] };
  isActive: boolean;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<IThemeSection>(
  {
    type: {
      type: String,
      enum: ['hero', 'about', 'schedule', 'sponsors', 'gallery', 'faq', 'register'],
      required: true,
    },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    config: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

const EventThemeSchema = new Schema<IEventTheme>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    category: {
      type: String,
      enum: ['hackathon', 'workshop', 'webinar', 'bootcamp', 'competition', 'custom'],
      default: 'custom',
    },
    layout: { sections: { type: [SectionSchema], default: [] } },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

EventThemeSchema.index({ isActive: 1 });

const EventTheme =
  (mongoose.models.EventTheme as mongoose.Model<IEventTheme>) ||
  mongoose.model<IEventTheme>('EventTheme', EventThemeSchema);

export default EventTheme;
