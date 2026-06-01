/**
 * Migrate hardcoded events into the `events` collection + seed a default theme.
 *
 * Run: node --env-file=.env scripts/migrate-events.mjs
 * Idempotent: events are upserted by slug; the default theme by slug.
 */
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error('[migrate-events] MONGODB_URI is not set.');
  process.exit(1);
}

const ThemeSchema = new mongoose.Schema(
  { name: String, slug: { type: String, unique: true }, description: String, category: String, layout: Object, isActive: Boolean },
  { timestamps: true }
);
const EventSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const Theme = mongoose.models.EventTheme || mongoose.model('EventTheme', ThemeSchema);
const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema);

const DEFAULT_THEME = {
  name: 'Standard Event',
  slug: 'standard-event',
  description: 'Default layout for general events.',
  category: 'custom',
  isActive: true,
  layout: {
    sections: [
      { type: 'hero', enabled: true, order: 0 },
      { type: 'about', enabled: true, order: 1 },
      { type: 'schedule', enabled: true, order: 2 },
      { type: 'gallery', enabled: true, order: 3 },
      { type: 'sponsors', enabled: true, order: 4 },
      { type: 'faq', enabled: true, order: 5 },
      { type: 'register', enabled: true, order: 6 },
    ],
  },
};

const UPCOMING = [
  {
    slug: 'code-o-fiesta-2025',
    title: 'Code\u2011o\u2011Fiesta',
    status: 'published',
    venue: 'VCET, Vasai',
    summary: 'A coding competition where participants build real-world software solutions and present them to judges.',
    content:
      "Code-o-Fiesta is a dynamic coding event designed to challenge and enhance participants' problem-solving abilities while applying their skills to real-life scenarios.",
    highlights: [
      'Pre-event problem statements focusing on real-world challenges.',
      'Teams build complete software/products before the event day.',
      'Evaluation on functionality, creativity, execution, and relevance.',
    ],
    startsAt: new Date('September 13, 2025 09:30'),
    registration: { enabled: false, fee: 0, currency: 'INR', requiresPayment: false, requiresApproval: true },
  },
];

function safeDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

async function main() {
  await mongoose.connect(MONGODB_URI, { family: 4 });

  const theme = await Theme.findOneAndUpdate(
    { slug: DEFAULT_THEME.slug },
    { $set: DEFAULT_THEME },
    { upsert: true, new: true }
  );
  console.log(`[migrate-events] Default theme ready: ${theme.slug}`);

  let past = [];
  try {
    const raw = await readFile(new URL('../public/staticdata/pasteventsdata.json', import.meta.url), 'utf-8');
    const json = JSON.parse(raw);
    past = (json.events ?? []).map((e) => ({
      slug: e.id,
      title: e.title,
      status: 'published',
      venue: 'VCET, Vasai',
      summary: e.description,
      content: e.about || e.description,
      highlights: e.highlights || [],
      startsAt: safeDate(`${e.date} ${e.time ?? ''}`.trim()),
      registration: { enabled: false, fee: 0, currency: 'INR', requiresPayment: false, requiresApproval: true },
    }));
  } catch (err) {
    console.warn('[migrate-events] Could not read pasteventsdata.json:', err.message);
  }

  const all = [...UPCOMING, ...past];
  let created = 0;
  for (const ev of all) {
    const res = await EventModel.updateOne(
      { slug: ev.slug },
      { $set: { ...ev, themeId: theme._id } },
      { upsert: true }
    );
    if (res.upsertedCount) created += 1;
  }

  console.log(`[migrate-events] Processed ${all.length} events (${created} newly created).`);
}

main()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('[migrate-events] Failed:', err);
    mongoose.disconnect();
    process.exit(1);
  });
