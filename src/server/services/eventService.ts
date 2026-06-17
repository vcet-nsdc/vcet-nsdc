import { connectToDatabase } from '@/lib/mongodb';
import EventModel from '@/models/EventModel';
import type { EventStatus } from '@/models/EventModel';
import type { EventCreateInput, EventUpdateInput } from '@/server/validation/event';

export async function listPublishedEvents() {
  await connectToDatabase();
  return EventModel.find({ status: 'published' }).sort({ startsAt: -1 }).lean();
}

export async function getPublishedEventBySlug(slug: string) {
  await connectToDatabase();
  return EventModel.findOne({ slug: slug.toLowerCase(), status: 'published' })
    .populate('themeId')
    .lean();
}

export async function listAllEvents(status?: EventStatus) {
  await connectToDatabase();
  const filter = status ? { status } : {};
  return EventModel.find(filter).sort({ createdAt: -1 }).lean();
}

export async function getEventById(id: string) {
  await connectToDatabase();
  return EventModel.findById(id).lean();
}

export async function createEvent(data: EventCreateInput, userId?: string) {
  await connectToDatabase();
  const doc = await EventModel.create({ ...data, createdBy: userId, updatedBy: userId });
  return doc.toObject();
}

export async function updateEvent(id: string, data: EventUpdateInput, userId?: string) {
  await connectToDatabase();
  return EventModel.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
    { new: true, runValidators: true }
  ).lean();
}

export async function deleteEvent(id: string) {
  await connectToDatabase();
  const res = await EventModel.findByIdAndDelete(id).lean();
  return !!res;
}
