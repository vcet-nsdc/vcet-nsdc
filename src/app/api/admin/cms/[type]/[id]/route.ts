import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { publishContent, rollbackContent, removeContent } from '@/server/services/cmsService';
import { recordAudit } from '@/server/services/auditService';

// Admin: publish or roll back a content item.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requirePermission('cms:publish');
  if (guard.error) return guard.error;
  try {
    const { id } = await params;
    const body = await req.json();
    const action = body?.action;

    if (action === 'publish') {
      const item = await publishContent(id, guard.ctx.userId);
      if (!item) return fail('NOT_FOUND', 'Content not found', 404);
      await recordAudit({
        actorId: guard.ctx.userId,
        actorRole: guard.ctx.role,
        action: 'cms.publish',
        resource: { type: 'cms', id },
      });
      return ok(item);
    }

    if (action === 'rollback') {
      const version = Number(body?.version);
      if (!Number.isFinite(version)) return fail('VALIDATION', 'A numeric "version" is required', 422);
      const item = await rollbackContent(id, version, guard.ctx.userId);
      if (!item) return fail('NOT_FOUND', 'Content or version not found', 404);
      await recordAudit({
        actorId: guard.ctx.userId,
        actorRole: guard.ctx.role,
        action: 'cms.rollback',
        resource: { type: 'cms', id },
      });
      return ok(item);
    }

    return fail('VALIDATION', 'action must be "publish" or "rollback"', 422);
  } catch (error) {
    return handleRouteError(error);
  }
}

// Admin: delete a content item.
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requirePermission('cms:write');
  if (guard.error) return guard.error;
  try {
    const { id } = await params;
    const deleted = await removeContent(id);
    if (!deleted) return fail('NOT_FOUND', 'Content not found', 404);
    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
