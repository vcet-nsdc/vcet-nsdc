import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import CmsContent, { type CmsType, type ICmsVersion } from '@/models/CmsContent';

function makeVersion(version: number, data: Record<string, unknown>, by?: Types.ObjectId): ICmsVersion {
  const entry: ICmsVersion = { version, data, publishedAt: new Date() };
  if (by) entry.publishedBy = by;
  return entry;
}

function toObjectId(id?: string): Types.ObjectId | undefined {
  return id ? new Types.ObjectId(id) : undefined;
}

export async function getPublishedByType(type: CmsType) {
  await connectToDatabase();
  return CmsContent.find({ type, status: 'published' }).sort({ order: 1, createdAt: 1 }).lean();
}

export async function listByType(type: CmsType) {
  await connectToDatabase();
  return CmsContent.find({ type }).sort({ order: 1, createdAt: 1 }).lean();
}

export interface UpsertDraftInput {
  type: CmsType;
  id?: string;
  key?: string;
  order?: number;
  data: Record<string, unknown>;
}

export async function upsertDraft(input: UpsertDraftInput, userId?: string) {
  await connectToDatabase();
  const by = toObjectId(userId);

  if (input.id) {
    return CmsContent.findByIdAndUpdate(
      input.id,
      {
        data: input.data,
        status: 'draft',
        updatedBy: by,
        ...(input.key !== undefined ? { key: input.key } : {}),
        ...(input.order !== undefined ? { order: input.order } : {}),
      },
      { new: true }
    ).lean();
  }

  const doc = await CmsContent.create({
    type: input.type,
    key: input.key,
    data: input.data,
    order: input.order ?? 0,
    status: 'draft',
    createdBy: by,
    updatedBy: by,
  });
  return doc.toObject();
}

export async function publishContent(id: string, userId?: string) {
  await connectToDatabase();
  const doc = await CmsContent.findById(id);
  if (!doc) return null;
  const by = toObjectId(userId);
  doc.version += 1;
  doc.versions.push(makeVersion(doc.version, doc.data, by));
  doc.status = 'published';
  doc.publishedAt = new Date();
  if (by) doc.updatedBy = by;
  await doc.save();
  return doc.toObject();
}

export async function rollbackContent(id: string, version: number, userId?: string) {
  await connectToDatabase();
  const doc = await CmsContent.findById(id);
  if (!doc) return null;
  const snapshot = doc.versions.find((v) => v.version === version);
  if (!snapshot) return null;
  const by = toObjectId(userId);
  doc.data = snapshot.data;
  doc.version += 1;
  doc.versions.push(makeVersion(doc.version, snapshot.data, by));
  doc.status = 'published';
  doc.publishedAt = new Date();
  if (by) doc.updatedBy = by;
  await doc.save();
  return doc.toObject();
}

export async function removeContent(id: string) {
  await connectToDatabase();
  return !!(await CmsContent.findByIdAndDelete(id).lean());
}
