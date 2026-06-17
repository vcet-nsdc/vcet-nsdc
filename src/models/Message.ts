import mongoose, { Schema } from 'mongoose'

export interface IMessage {
  name: string;
  email: string;
  contact: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  contact: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

MessageSchema.index({ email: 1 })
MessageSchema.index({ createdAt: -1 })

const Message =
  (mongoose.models.Message as mongoose.Model<IMessage>) ||
  mongoose.model<IMessage>('Message', MessageSchema)

export default Message