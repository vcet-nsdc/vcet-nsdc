import mongoose, { Schema, models, model } from 'mongoose'

const MessageSchema = new Schema({
  name: String,
  email: String,
  contact: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
})

export default models.Message || model('Message', MessageSchema)