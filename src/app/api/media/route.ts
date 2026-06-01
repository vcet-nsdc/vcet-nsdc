import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requirePermission } from '@/lib/rbac';
import { ok, fail, handleRouteError } from '@/server/http';
import { recordAsset } from '@/server/services/mediaService';

const recordSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().min(1),
  secureUrl: z.string().min(1),
  type: z.enum(['image', 'video', 'pdf']).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  bytes: z.number().optional(),
  folder: z.string().optional(),
  refType: z.enum(['registration_proof', 'event_cover', 'gallery', 'sponsor', 'certificate', 'cms']).optional(),
  refId: z.string().optional(),
});

// Admin: persist metadata for a media asset uploaded to Cloudinary.
export async function POST(req: NextRequest) {
  const guard = await requirePermission('media:upload');
  if (guard.error) return guard.error;
  try {
    const parsed = recordSchema.safeParse(await req.json());
    if (!parsed.success) {
      return fail('VALIDATION', parsed.error.issues.map((i) => i.message).join('; '), 422);
    }
    const asset = await recordAsset(parsed.data, guard.ctx.userId);
    return ok(asset, 201);
  } catch (error) {
    return handleRouteError(error);
  }
}
