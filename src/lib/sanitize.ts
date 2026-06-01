/**
 * Input sanitization helpers.
 *
 * These fields are plain text (names, emails, messages) that must never be
 * stored containing HTML/script markup. We strip tags and control characters
 * and cap length to prevent stored-XSS and abuse.
 *
 * NOTE: Full HTML sanitization with DOMPurify is introduced in the CMS phase,
 * where rich text is actually stored and rendered. Plain-text fields do not
 * need (and should not carry) a heavyweight HTML sanitizer dependency.
 */

const TAG_REGEX = /<\/?[^>]+(>|$)/g;
const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;

/**
 * Sanitize a single plain-text value: strip HTML tags and control chars, trim,
 * and enforce a maximum length.
 */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(TAG_REGEX, '')
    .replace(CONTROL_CHARS_REGEX, '')
    .trim()
    .slice(0, maxLength);
}

/** Sanitize and normalize an email-like value. */
export function sanitizeEmail(value: unknown): string {
  return sanitizeText(value, 254).toLowerCase();
}
