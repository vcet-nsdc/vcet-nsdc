import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { getPagination, paginated, handleRouteError } from '@/server/http';
import { listAudit } from '@/server/services/auditService';

// Admin: paginated, filterable audit log (both roles can read).
export async function GET(req: NextRequest) {
  const guard = await requirePermission('audit:read');
  if (guard.error) return guard.error;
  try {
    const sp = new URL(req.url).searchParams;
    const pagination = getPagination(sp, 50);
    const { items, total } = await listAudit(
      {
        action: sp.get('action') ?? undefined,
        resourceType: sp.get('resourceType') ?? undefined,
        actorId: sp.get('actorId') ?? undefined,
      },
      pagination
    );
    return paginated(items, total, pagination);
  } catch (error) {
    return handleRouteError(error);
  }
}
