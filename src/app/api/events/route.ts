import { ok, handleRouteError } from '@/server/http';
import { listPublishedEvents } from '@/server/services/eventService';

// Public: list published events.
export async function GET() {
  try {
    const events = await listPublishedEvents();
    return ok(events);
  } catch (error) {
    return handleRouteError(error);
  }
}
