/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, models, model } from 'mongoose'

const CertificateSchema = new Schema({
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  product: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },
  date: {
    type: String,
    required: true
  },
  imageData: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['generated', 'downloaded', 'shared'],
    default: 'generated'
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  shareCount: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(_doc: any, ret: Record<string, any>) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

// Index for efficient searching
CertificateSchema.index({ email: 1, certificateNumber: 1 })
CertificateSchema.index({ createdAt: -1 })

// Update the updatedAt field before saving
CertificateSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default models.Certificate || model('Certificate', CertificateSchema)
