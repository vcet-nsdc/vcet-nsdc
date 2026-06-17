import { Types } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Settings, { type SettingsScope } from '@/models/Settings';

export async function getSettings(scope: SettingsScope): Promise<Record<string, unknown>> {
  await connectToDatabase();
  const doc = await Settings.findOne({ scope }).lean();
  return (doc?.data as Record<string, unknown>) ?? {};
}

export async function updateSettings(
  scope: SettingsScope,
  data: Record<string, unknown>,
  userId?: string
): Promise<Record<string, unknown>> {
  await connectToDatabase();
  const doc = await Settings.findOneAndUpdate(
    { scope },
    { $set: { data, updatedBy: userId ? new Types.ObjectId(userId) : undefined } },
    { upsert: true, new: true }
  ).lean();
  return (doc?.data as Record<string, unknown>) ?? {};
}
