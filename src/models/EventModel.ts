import mongoose, { Schema, Document, Types } from 'mongoose';

export type EventStatus = 'draft' | 'published' | 'archived';

export interface IEventSponsor {
  name: string;
  logo?: string;
  tier?: string;
  url?: string;
}

export interface IEventFaq {
  q: string;
  a: string;
}

export interface IEventDoc extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  themeId?: Types.ObjectId;
  status: EventStatus;
  startsAt?: Date;
  endsAt?: Date;
  venue?: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  gallery: string[];
  registration: {
    enabled: boolean;
    opensAt?: Date;
    closesAt?: Date;
    formSchemaId?: Types.ObjectId;
    teamConfig?: { min: number; max: number };
    fee: number;
    currency: string;
    requiresPayment: boolean;
    requiresApproval: boolean;
  };
  sponsors: IEventSponsor[];
  faqs: IEventFaq[];
  highlights: string[];
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEventDoc>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    themeId: { type: Schema.Types.ObjectId, ref: 'EventTheme' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    startsAt: { type: Date },
    endsAt: { type: Date },
    venue: { type: String },
    summary: { type: String },
    content: { type: String },
    coverImage: { type: String },
    gallery: { type: [String], default: [] },
    registration: {
      enabled: { type: Boolean, default: false },
      opensAt: { type: Date },
      closesAt: { type: Date },
      formSchemaId: { type: Schema.Types.ObjectId, ref: 'FormSchema' },
      teamConfig: {
        type: new Schema({ min: Number, max: Number }, { _id: false }),
        required: false,
      },
      fee: { type: Number, default: 0 },
      currency: { type: String, default: 'INR' },
      requiresPayment: { type: Boolean, default: false },
      requiresApproval: { type: Boolean, default: true },
    },
    sponsors: {
      type: [new Schema<IEventSponsor>({ name: String, logo: String, tier: String, url: String }, { _id: false })],
      default: [],
    },
    faqs: {
      type: [new Schema<IEventFaq>({ q: String, a: String }, { _id: false })],
      default: [],
    },
    highlights: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

EventSchema.index({ status: 1, startsAt: -1 });
EventSchema.index({ themeId: 1 });

const EventModel =
  (mongoose.models.Event as mongoose.Model<IEventDoc>) ||
  mongoose.model<IEventDoc>('Event', EventSchema);

export default EventModel;
