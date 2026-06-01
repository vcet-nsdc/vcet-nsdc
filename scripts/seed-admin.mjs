/**
 * One-time bootstrap for the first Faculty Admin.
 *
 * Run with Node's built-in env file loader (no extra deps):
 *   node --env-file=.env scripts/seed-admin.mjs
 *
 * Required env vars (in .env):
 *   MONGODB_URI
 *   SEED_ADMIN_EMAIL
 *   SEED_ADMIN_PASSWORD   (min 8 chars)
 *   SEED_ADMIN_NAME       (optional, defaults to "Faculty Admin")
 *
 * Idempotent: if a user with SEED_ADMIN_EMAIL already exists, it is left
 * untouched. After bootstrapping, manage all admins from the dashboard.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { MONGODB_URI, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;
const SEED_ADMIN_NAME = process.env.SEED_ADMIN_NAME || 'Faculty Admin';

function fail(msg) {
  console.error(`\n[seed-admin] ${msg}\n`);
  process.exit(1);
}

if (!MONGODB_URI) fail('MONGODB_URI is not set.');
if (!SEED_ADMIN_EMAIL) fail('SEED_ADMIN_EMAIL is not set.');
if (!SEED_ADMIN_PASSWORD || SEED_ADMIN_PASSWORD.length < 8) {
  fail('SEED_ADMIN_PASSWORD is not set or is shorter than 8 characters.');
}

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    passwordHash: String,
    role: String,
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
    createdBy: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function main() {
  await mongoose.connect(MONGODB_URI, { family: 4 });
  const email = SEED_ADMIN_EMAIL.toLowerCase().trim();

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`[seed-admin] User "${email}" already exists (role: ${existing.role}). No changes made.`);
    return;
  }

  const passwordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
  await User.create({
    name: SEED_ADMIN_NAME,
    email,
    passwordHash,
    role: 'FACULTY_ADMIN',
    isActive: true,
  });

  console.log(`[seed-admin] Created Faculty Admin "${email}".`);
}

main()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('[seed-admin] Failed:', err);
    mongoose.disconnect();
    process.exit(1);
  });
