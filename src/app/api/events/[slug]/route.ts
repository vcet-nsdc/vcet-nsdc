import { NextRequest } from 'next/server';
import { ok, fail, handleRouteError } from '@/server/http';
import { getPublishedEventBySlug } from '@/server/services/eventService';

// Public: fetch a single published event by slug.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await getPublishedEventBySlug(slug);
    if (!event) return fail('NOT_FOUND', 'Event not found', 404);
    return ok(event);
  } catch (error) {
    return handleRouteError(error);
  }
}
