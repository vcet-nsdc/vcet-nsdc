import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
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
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
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
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);
