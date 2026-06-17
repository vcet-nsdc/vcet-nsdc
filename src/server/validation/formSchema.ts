import { z } from 'zod';
import type { IFormField } from '@/models/FormSchema';

/**
 * Build a Zod validator dynamically from a stored FormSchema's field list.
 * Used by the dynamic registration engine so each event validates submissions
 * against its own configured form — without hand-written schemas.
 */
export function buildZodFromFields(fields: IFormField[]): z.ZodObject<z.ZodRawShape> {
  const shape: z.ZodRawShape = {};

  for (const field of fields) {
    let base: z.ZodTypeAny;
    switch (field.type) {
      case 'email':
        base = z.string().email();
        break;
      case 'number':
        base = z.coerce.number();
        break;
      case 'checkbox':
        base = z.coerce.boolean();
        break;
      case 'select':
        base = field.options && field.options.length > 0 ? z.enum(field.options as [string, ...string[]]) : z.string();
        break;
      case 'phone':
        base = z.string().regex(/^[0-9+\-\s()]{6,20}$/, 'Invalid phone number');
        break;
      default:
        base = z.string();
    }

    if (field.validation && (field.type === 'text' || field.type === 'textarea')) {
      if (typeof field.validation.min === 'number') base = (base as z.ZodString).min(field.validation.min);
      if (typeof field.validation.max === 'number') base = (base as z.ZodString).max(field.validation.max);
    }

    shape[field.key] = field.required ? base : base.optional();
  }

  return z.object(shape);
}
