import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAuditLog extends Document {
  _id: Types.ObjectId;
  actorId?: Types.ObjectId;
  actorRole: string;
  action: string;
  resource: { type: string; id?: string };
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>({
  actorId: { type: Schema.Types.ObjectId, ref: 'User' },
  actorRole: { type: String, default: 'SYSTEM' },
  action: { type: String, required: true },
  resource: {
    type: new Schema({ type: String, id: String }, { _id: false }),
    required: true,
  },
  before: { type: Schema.Types.Mixed },
  after: { type: Schema.Types.Mixed },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ 'resource.type': 1, 'resource.id': 1 });
AuditLogSchema.index({ actorId: 1 });

const AuditLog =
  (mongoose.models.AuditLog as mongoose.Model<IAuditLog>) ||
  mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
