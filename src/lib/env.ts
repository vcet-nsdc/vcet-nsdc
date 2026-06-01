import { z } from 'zod';

/**
 * Server-side environment variable validation.
 *
 * Fails fast at runtime if required secrets are missing or malformed, instead
 * of silently falling back to insecure defaults. Set SKIP_ENV_VALIDATION=1 for
 * Docker/CI builds that do not have secrets available at build time.
 */
const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  // Auth.js session signing secret. Generate with: openssl rand -base64 32
  AUTH_SECRET: z.string().min(16, 'AUTH_SECRET must be at least 16 characters'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  // Cloudinary (optional until media migration is run).
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;

  if (process.env.SKIP_ENV_VALIDATION === '1') {
    // Trust process.env without validation (build-time only).
    cached = process.env as unknown as Env;
    return cached;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }

  cached = parsed.data;
  return cached;
}
