import mongoose from 'mongoose';
import { requirePermission } from '@/lib/rbac';
import { ok, handleRouteError } from '@/server/http';
import { connectToDatabase } from '@/lib/mongodb';
import Registration from '@/models/Registration';
import EventModel from '@/models/EventModel';
import User from '@/models/User';
import CmsContent from '@/models/CmsContent';

// Developer/Faculty: system health snapshot.
export async function GET() {
  const guard = await requirePermission('system:health');
  if (guard.error) return guard.error;
  try {
    await connectToDatabase();
    const [registrations, events, users, content] = await Promise.all([
      Registration.estimatedDocumentCount(),
      EventModel.estimatedDocumentCount(),
      User.estimatedDocumentCount(),
      CmsContent.estimatedDocumentCount(),
    ]);
    return ok({
      db: { connected: mongoose.connection.readyState === 1 },
      counts: { registrations, events, users, content },
      uptimeSeconds: Math.round(process.uptime()),
      node: process.version,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
