import { z } from 'zod';
import type { CmsType } from '@/models/CmsContent';

/**
 * Per-type content schemas. CMS writes are validated against these before
 * being stored, so malformed content can never reach the database.
 */
export const cmsSchemas = {
  team: z.object({
    name: z.string().min(1),
    position: z.string().min(1),
    email: z.string().email().or(z.literal('')).optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    photo: z.string().optional(),
  }),
  faq: z.object({ q: z.string().min(1), a: z.string().min(1) }),
  sponsor: z.object({
    name: z.string().min(1),
    logo: z.string().optional(),
    tier: z.string().optional(),
    url: z.string().optional(),
  }),
  announcement: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    active: z.boolean().optional(),
  }),
  social: z.object({ platform: z.string().min(1), url: z.string().min(1), icon: z.string().optional() }),
  page: z.object({ title: z.string().min(1), body: z.string() }),
  gallery: z.object({ title: z.string().optional(), images: z.array(z.string()) }),
} satisfies Record<CmsType, z.ZodTypeAny>;

export function validateCmsData(type: CmsType, data: unknown) {
  return cmsSchemas[type].safeParse(data);
}
