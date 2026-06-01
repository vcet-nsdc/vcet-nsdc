import { z } from 'zod';

const slug = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only');

const registrationSchema = z.object({
  enabled: z.boolean().optional(),
  opensAt: z.coerce.date().optional(),
  closesAt: z.coerce.date().optional(),
  formSchemaId: z.string().optional(),
  teamConfig: z.object({ min: z.number().int().min(1), max: z.number().int().min(1) }).optional(),
  fee: z.number().min(0).optional(),
  currency: z.string().optional(),
  requiresPayment: z.boolean().optional(),
  requiresApproval: z.boolean().optional(),
});

export const eventCreateSchema = z.object({
  title: z.string().min(1).max(200),
  slug,
  themeId: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  startsAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
  venue: z.string().max(200).optional(),
  summary: z.string().max(500).optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  registration: registrationSchema.optional(),
  sponsors: z
    .array(z.object({ name: z.string(), logo: z.string().optional(), tier: z.string().optional(), url: z.string().optional() }))
    .optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  highlights: z.array(z.string()).optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
