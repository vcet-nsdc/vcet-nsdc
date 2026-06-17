import { connectToDatabase } from '@/lib/mongodb';
import LoginAttempt from '@/models/LoginAttempt';

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

function norm(identifier: string): string {
  return identifier.toLowerCase().trim();
}

/** True if the identifier is currently locked out from logging in. */
export async function isLockedOut(identifier: string): Promise<boolean> {
  await connectToDatabase();
  const doc = await LoginAttempt.findOne({ identifier: norm(identifier) }).lean();
  return !!(doc?.lockedUntil && new Date(doc.lockedUntil) > new Date());
}

/** Record a failed attempt; locks the identifier once MAX_ATTEMPTS is reached. */
export async function recordFailedAttempt(identifier: string): Promise<void> {
  await connectToDatabase();
  const id = norm(identifier);
  const doc = await LoginAttempt.findOneAndUpdate(
    { identifier: id },
    { $inc: { count: 1 }, $setOnInsert: { createdAt: new Date() } },
    { upsert: true, new: true }
  );
  if (doc && doc.count >= MAX_ATTEMPTS && !doc.lockedUntil) {
    doc.lockedUntil = new Date(Date.now() + LOCK_MS);
    await doc.save();
  }
}

/** Clear attempts after a successful login. */
export async function clearAttempts(identifier: string): Promise<void> {
  await connectToDatabase();
  await LoginAttempt.deleteOne({ identifier: norm(identifier) });
}
