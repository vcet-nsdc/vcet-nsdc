import { NextRequest } from 'next/server';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { listByType, upsertDraft } from '@/server/services/cmsService';
import { validateCmsData } from '@/server/validation/cms';
import { CMS_TYPES, type CmsType } from '@/models/CmsContent';

function resolveType(type: string): CmsType | null {
  return CMS_TYPES.includes(type as CmsType) ? (type as CmsType) : null;
}

// Admin: list all content (incl. drafts) of a type.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const guard = await requirePermission('cms:read');
  if (guard.error) return guard.error;
  try {
    const { type } = await params;
    const t = resolveType(type);
    if (!t) return fail('NOT_FOUND', 'Unknown content type', 404);
    return ok(await listByType(t));
  } catch (error) {
    return handleRouteError(error);
  }
}

// Admin: create or update a draft content item.
export async function POST(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const guard = await requirePermission('cms:write');
  if (guard.error) return guard.error;
  try {
    const { type } = await params;
    const t = resolveType(type);
    if (!t) return fail('NOT_FOUND', 'Unknown content type', 404);

    const body = await req.json();
    const parsed = validateCmsData(t, body?.data);
    if (!parsed.success) {
      return fail('VALIDATION', parsed.error.issues.map((i) => i.message).join('; '), 422);
    }

    const item = await upsertDraft(
      { type: t, id: body?.id, key: body?.key, order: body?.order, data: parsed.data },
      guard.ctx.userId
    );
    return ok(item, body?.id ? 200 : 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
