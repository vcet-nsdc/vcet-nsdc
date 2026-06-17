/**
 * Migrate team members from static JSON into the `cmscontents` collection as
 * published CMS content (type: 'team').
 *
 * Run: node --env-file=.env scripts/migrate-cms.mjs
 * Idempotent: upserts by `key` (team:<group>:<id>).
 *
 * NOTE: This does NOT delete the static BE.json/TE.json files. The Teams page
 * still reads them (dual-read). Switch the consumer to the CMS API and verify
 * parity before removing the static sources.
 */
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error('[migrate-cms] MONGODB_URI is not set.');
  process.exit(1);
}

const CmsSchema = new mongoose.Schema(
  {
    type: String,
    key: String,
    status: String,
    order: Number,
    data: Object,
    version: Number,
    versions: Array,
    publishedAt: Date,
  },
  { timestamps: true }
);
const CmsContent = mongoose.models.CmsContent || mongoose.model('CmsContent', CmsSchema);

async function readJson(relPath) {
  try {
    const raw = await readFile(new URL(relPath, import.meta.url), 'utf-8');
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.warn(`[migrate-cms] Could not read ${relPath}:`, err.message);
    return [];
  }
}

async function main() {
  await mongoose.connect(MONGODB_URI, { family: 4 });

  const heads = await readJson('../public/staticdata/BE.json');
  const deputys = await readJson('../public/staticdata/TE.json');

  const groups = [
    { group: 'heads', members: heads },
    { group: 'deputys', members: deputys },
  ];

  let processed = 0;
  for (const { group, members } of groups) {
    for (const m of members) {
      const data = {
        name: m.name,
        position: m.position,
        email: m.email ?? '',
        instagram: m.instagram ?? '',
        linkedin: m.linkedin ?? '',
        photo: m.photo ?? '',
        group,
      };
      const key = `team:${group}:${m.id}`;
      const now = new Date();
      await CmsContent.updateOne(
        { type: 'team', key },
        {
          $set: { type: 'team', key, status: 'published', order: m.id, data, publishedAt: now },
          $setOnInsert: { version: 1, versions: [{ version: 1, data, publishedAt: now }] },
        },
        { upsert: true }
      );
      processed += 1;
    }
  }

  console.log(`[migrate-cms] Processed ${processed} team members into CMS.`);
}

main()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('[migrate-cms] Failed:', err);
    mongoose.disconnect();
    process.exit(1);
  });
