import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { listAllEvents, createEvent } from '@/server/services/eventService';
import { eventCreateSchema } from '@/server/validation/event';
import type { EventStatus } from '@/models/EventModel';

// Admin: list all events (any status).
export async function GET(req: NextRequest) {
  const guard = await requirePermission('event:update');
  if (guard.error) return guard.error;
  try {
    const status = new URL(req.url).searchParams.get('status') as EventStatus | null;
    const events = await listAllEvents(status ?? undefined);
    return ok(events);
  } catch (error) {
    return handleRouteError(error);
  }
}

// Admin: create an event.
export async function POST(req: NextRequest) {
  const guard = await requirePermission('event:create');
  if (guard.error) return guard.error;
  try {
    const body = await req.json();
    const parsed = eventCreateSchema.safeParse(body);
    if (!parsed.success) {
      return fail('VALIDATION', parsed.error.issues.map((i) => i.message).join('; '), 422);
    }
    const event = await createEvent(parsed.data, guard.ctx.userId);
    return ok(event, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
