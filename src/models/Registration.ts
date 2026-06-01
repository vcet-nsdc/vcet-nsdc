import mongoose, { Schema, Document, Types } from 'mongoose';

export type RegistrationStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted';
export type PaymentStatus = 'submitted' | 'verified' | 'rejected';

export interface IRegistration extends Document {
  eventId?: Types.ObjectId;
  squadName: string;
  domain: string;
  leader: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
  };
  members: {
    fullName: string;
    email: string;
  }[];
  transactionId: string;
  paymentScreenshot: string;
  // Cloudinary reference (Phase 8). Coexists with base64 during migration.
  paymentProof?: Types.ObjectId;
  payment: {
    status: PaymentStatus;
    verifiedBy?: Types.ObjectId;
    verifiedAt?: Date;
    note?: string;
  };
  status: RegistrationStatus;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  certificateEligible: boolean;
  createdAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
  squadName: { type: String, required: true },
  domain: { type: String, required: true },
  leader: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college: { type: String, required: true },
  },
  members: [
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
    }
  ],
  transactionId: { type: String, required: true },
  paymentScreenshot: { type: String, required: true },
  paymentProof: { type: Schema.Types.ObjectId, ref: 'MediaAsset' },
  payment: {
    status: { type: String, enum: ['submitted', 'verified', 'rejected'], default: 'submitted' },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: { type: Date },
    note: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'waitlisted'], default: 'pending' },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
  certificateEligible: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

RegistrationSchema.index({ domain: 1, createdAt: -1 });
RegistrationSchema.index({ status: 1, createdAt: -1 });
RegistrationSchema.index({ 'leader.email': 1 });
RegistrationSchema.index({ eventId: 1, status: 1 });
RegistrationSchema.index({ 'payment.status': 1 });

const Registration = (mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema)) as mongoose.Model<IRegistration>;
export default Registration;
