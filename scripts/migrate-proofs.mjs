/**
 * Migrate base64 payment screenshots out of MongoDB into Cloudinary.
 *
 * Run: node --env-file=.env scripts/migrate-proofs.mjs
 * Add --purge to also remove the base64 `paymentScreenshot` after a successful
 * upload (only do this once you've verified + backed up the collection).
 *
 * Required env: MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * Idempotent: skips registrations that already have a paymentProof reference.
 */
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

const { MONGODB_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const PURGE = process.argv.includes('--purge');

if (!MONGODB_URI) { console.error('[migrate-proofs] MONGODB_URI not set.'); process.exit(1); }
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('[migrate-proofs] CLOUDINARY_* env vars not set.');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const RegistrationModel = mongoose.models.Registration || mongoose.model('Registration', new mongoose.Schema({}, { strict: false }));
const MediaAsset = mongoose.models.MediaAsset || mongoose.model('MediaAsset', new mongoose.Schema({}, { strict: false, timestamps: true }));

async function main() {
  await mongoose.connect(MONGODB_URI, { family: 4 });

  const regs = await RegistrationModel.find({
    paymentScreenshot: { $regex: '^data:' },
    paymentProof: { $exists: false },
  });

  console.log(`[migrate-proofs] ${regs.length} registrations to migrate${PURGE ? ' (purge enabled)' : ''}.`);

  let migrated = 0;
  for (const reg of regs) {
    try {
      const res = await cloudinary.uploader.upload(reg.paymentScreenshot, {
        folder: 'nsdc/proofs',
        resource_type: 'image',
      });
      const asset = await MediaAsset.create({
        provider: 'cloudinary',
        publicId: res.public_id,
        url: res.url,
        secureUrl: res.secure_url,
        type: 'image',
        width: res.width,
        height: res.height,
        bytes: res.bytes,
        folder: 'nsdc/proofs',
        refType: 'registration_proof',
        refId: reg._id,
      });
      reg.paymentProof = asset._id;
      if (PURGE) reg.paymentScreenshot = `cloudinary:${res.public_id}`;
      await reg.save();
      migrated += 1;
    } catch (err) {
      console.error(`[migrate-proofs] Failed for ${reg._id}:`, err.message);
    }
  }

  console.log(`[migrate-proofs] Migrated ${migrated}/${regs.length}.`);
}

main()
  .then(() => mongoose.disconnect())
  .catch((err) => { console.error('[migrate-proofs] Failed:', err); mongoose.disconnect(); process.exit(1); });
