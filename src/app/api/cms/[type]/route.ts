import { NextRequest } from 'next/server';
import { ok, fail, handleRouteError } from '@/server/http';
import { getPublishedByType } from '@/server/services/cmsService';
import { CMS_TYPES, type CmsType } from '@/models/CmsContent';

// Public: list published content items of a given type.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    const { type } = await params;
    if (!CMS_TYPES.includes(type as CmsType)) return fail('NOT_FOUND', 'Unknown content type', 404);
    const items = await getPublishedByType(type as CmsType);
    return ok(items);
  } catch (error) {
    return handleRouteError(error);
  }
}
