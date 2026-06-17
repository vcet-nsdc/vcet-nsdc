import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { getSettings, updateSettings } from '@/server/services/settingsService';
import { recordAudit } from '@/server/services/auditService';
import type { Permission } from '@/config/permissions';
import type { SettingsScope } from '@/models/Settings';

function resolve(scope: string): { scope: SettingsScope; perm: Permission } | null {
  if (scope === 'business') return { scope: 'business', perm: 'settings:business' };
  if (scope === 'technical') return { scope: 'technical', perm: 'settings:technical' };
  return null;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ scope: string }> }) {
  const { scope } = await params;
  const r = resolve(scope);
  if (!r) return fail('NOT_FOUND', 'Unknown settings scope', 404);
  const guard = await requirePermission(r.perm);
  if (guard.error) return guard.error;
  try {
    return ok(await getSettings(r.scope));
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ scope: string }> }) {
  const { scope } = await params;
  const r = resolve(scope);
  if (!r) return fail('NOT_FOUND', 'Unknown settings scope', 404);
  const guard = await requirePermission(r.perm);
  if (guard.error) return guard.error;
  try {
    const body = await req.json();
    if (typeof body !== 'object' || body === null) {
      return fail('VALIDATION', 'Body must be an object of settings', 422);
    }
    const updated = await updateSettings(r.scope, body as Record<string, unknown>, guard.ctx.userId);
    await recordAudit({
      actorId: guard.ctx.userId,
      actorRole: guard.ctx.role,
      action: `settings.${r.scope}.update`,
      resource: { type: 'settings', id: r.scope },
    });
    return ok(updated);
  } catch (error) {
    return handleRouteError(error);
  }
}
