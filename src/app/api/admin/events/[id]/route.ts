import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { updateEvent, deleteEvent } from '@/server/services/eventService';
import { recordAudit } from '@/server/services/auditService';
import { eventUpdateSchema } from '@/server/validation/event';

// Admin: update an event.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requirePermission('event:update');
  if (guard.error) return guard.error;
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return fail('VALIDATION', parsed.error.issues.map((i) => i.message).join('; '), 422);
    }
    const event = await updateEvent(id, parsed.data, guard.ctx.userId);
    if (!event) return fail('NOT_FOUND', 'Event not found', 404);
    await recordAudit({
      actorId: guard.ctx.userId,
      actorRole: guard.ctx.role,
      action: 'event.update',
      resource: { type: 'event', id },
    });
    return ok(event);
  } catch (error) {
    return handleRouteError(error);
  }
}

// Admin: delete an event (Faculty only).
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requirePermission('event:delete');
  if (guard.error) return guard.error;
  try {
    const { id } = await params;
    const deleted = await deleteEvent(id);
    if (!deleted) return fail('NOT_FOUND', 'Event not found', 404);
    await recordAudit({
      actorId: guard.ctx.userId,
      actorRole: guard.ctx.role,
      action: 'event.delete',
      resource: { type: 'event', id },
    });
    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
