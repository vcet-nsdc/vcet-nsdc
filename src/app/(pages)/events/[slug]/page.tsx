import { notFound } from 'next/navigation';
import { getPublishedEventBySlug } from '@/server/services/eventService';
import { SectionRenderer, type PublicEventView, type SectionType } from '@/components/events/dynamic/SectionRenderer';

const DEFAULT_SECTIONS: SectionType[] = ['hero', 'about', 'schedule', 'gallery', 'sponsors', 'faq', 'register'];

interface ThemeSection {
  type: SectionType;
  enabled: boolean;
  order: number;
}

export default async function DynamicEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getPublishedEventBySlug(slug);
  if (!event) notFound();

  const ev = event as unknown as PublicEventView & {
    themeId?: { layout?: { sections?: ThemeSection[] } };
  };

  const themeSections = ev.themeId?.layout?.sections;
  const sections: SectionType[] =
    themeSections && themeSections.length > 0
      ? themeSections
          .filter((s) => s.enabled)
          .sort((a, b) => a.order - b.order)
          .map((s) => s.type)
      : DEFAULT_SECTIONS;

  return (
    <main className="min-h-full w-full pt-24 pb-20">
      {sections.map((type, i) => (
        <SectionRenderer key={`${type}-${i}`} type={type} event={ev} />
      ))}
    </main>
  );
}
