import mongoose, { Schema } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

/**
 * MongoDB-backed fixed-window rate limiter.
 *
 * Uses time-bucketed keys so each request is a single atomic upsert+increment,
 * which is correct across multiple serverless instances (shared DB state) and
 * requires no Redis. Expired buckets are auto-removed by a TTL index.
 */
interface IRateLimit {
  key: string;
  count: number;
  expiresAt: Date;
}

const RateLimitSchema = new Schema<IRateLimit>({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});

// TTL index — Mongo removes the document once expiresAt passes.
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimitModel =
  (mongoose.models.RateLimit as mongoose.Model<IRateLimit>) ||
  mongoose.model<IRateLimit>('RateLimit', RateLimitSchema);

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export interface RateLimitOptions {
  /** Logical name of the limited action, e.g. "register". */
  name: string;
  /** Max requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/**
 * Returns a 429 NextResponse if the caller has exceeded the limit, otherwise null.
 */
export async function rateLimit(
  req: NextRequest,
  { name, limit, windowMs }: RateLimitOptions
): Promise<NextResponse | null> {
  try {
    await connectToDatabase();

    const ip = getClientIp(req);
    const bucket = Math.floor(Date.now() / windowMs);
    const key = `${name}:${ip}:${bucket}`;
    const expiresAt = new Date((bucket + 1) * windowMs);

    const doc = await RateLimitModel.findOneAndUpdate(
      { key },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
      { upsert: true, new: true }
    ).lean();

    if (doc && doc.count > limit) {
      const retryAfter = Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    return null;
  } catch {
    // Fail open: never block legitimate traffic because the limiter errored.
    return null;
  }
}
