import Image from 'next/image';
import Link from 'next/link';

export interface PublicEventView {
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  venue?: string;
  startsAt?: string | Date;
  endsAt?: string | Date;
  coverImage?: string;
  gallery?: string[];
  highlights?: string[];
  sponsors?: { name: string; logo?: string; tier?: string; url?: string }[];
  faqs?: { q: string; a: string }[];
  registration?: {
    enabled: boolean;
    fee?: number;
    currency?: string;
    opensAt?: string | Date;
    closesAt?: string | Date;
  };
}

export type SectionType = 'hero' | 'about' | 'schedule' | 'sponsors' | 'gallery' | 'faq' | 'register';

function fmt(date?: string | Date): string {
  if (!date) return '';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">{children}</section>
);

export function SectionRenderer({ type, event }: { type: SectionType; event: PublicEventView }) {
  switch (type) {
    case 'hero':
      return (
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md p-8 sm:p-14">
            {event.coverImage && (
              <div
                className="absolute inset-0 opacity-25 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.coverImage})` }}
                aria-hidden
              />
            )}
            <div className="relative z-10">
              <h1 className="font-heading text-4xl sm:text-6xl font-bold text-white mb-4">{event.title}</h1>
              {event.summary && <p className="text-white/70 text-lg max-w-2xl">{event.summary}</p>}
              {(event.venue || event.startsAt) && (
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
                  {event.startsAt && <span>{fmt(event.startsAt)}</span>}
                  {event.venue && <span>• {event.venue}</span>}
                </div>
              )}
            </div>
          </div>
        </section>
      );

    case 'about':
      if (!event.content && !(event.highlights && event.highlights.length)) return null;
      return (
        <Container>
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          {event.content && <p className="text-white/70 whitespace-pre-line leading-relaxed">{event.content}</p>}
          {event.highlights && event.highlights.length > 0 && (
            <ul className="mt-6 space-y-2">
              {event.highlights.map((h, i) => (
                <li key={i} className="text-white/70 flex gap-2">
                  <span className="text-purple-400">▹</span> {h}
                </li>
              ))}
            </ul>
          )}
        </Container>
      );

    case 'schedule':
      if (!event.startsAt && !event.endsAt) return null;
      return (
        <Container>
          <h2 className="text-2xl font-bold text-white mb-4">Schedule</h2>
          <div className="flex flex-wrap gap-6 text-white/70">
            {event.startsAt && (
              <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-white/40 uppercase">Starts</p>
                <p>{fmt(event.startsAt)}</p>
              </div>
            )}
            {event.endsAt && (
              <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-white/40 uppercase">Ends</p>
                <p>{fmt(event.endsAt)}</p>
              </div>
            )}
          </div>
        </Container>
      );

    case 'sponsors':
      if (!event.sponsors || event.sponsors.length === 0) return null;
      return (
        <Container>
          <h2 className="text-2xl font-bold text-white mb-4">Sponsors</h2>
          <div className="flex flex-wrap gap-6 items-center">
            {event.sponsors.map((s, i) => (
              <a key={i} href={s.url ?? '#'} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                {s.logo ? (
                  <Image src={s.logo} alt={s.name} width={120} height={60} unoptimized className="object-contain" />
                ) : (
                  <span className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">{s.name}</span>
                )}
              </a>
            ))}
          </div>
        </Container>
      );

    case 'gallery':
      if (!event.gallery || event.gallery.length === 0) return null;
      return (
        <Container>
          <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {event.gallery.map((src, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image src={src} alt={`${event.title} ${i + 1}`} fill unoptimized className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      );

    case 'faq':
      if (!event.faqs || event.faqs.length === 0) return null;
      return (
        <Container>
          <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
          <div className="space-y-4">
            {event.faqs.map((f, i) => (
              <div key={i} className="bg-black/30 border border-white/10 rounded-xl p-4">
                <p className="text-white font-medium">{f.q}</p>
                <p className="text-white/60 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      );

    case 'register':
      if (!event.registration?.enabled) return null;
      return (
        <Container>
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Register</h2>
            {event.registration.fee ? (
              <p className="text-white/70 mb-4">
                Fee: {event.registration.currency ?? 'INR'} {event.registration.fee}
              </p>
            ) : null}
            <Link
              href="/register"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              Register Now
            </Link>
          </div>
        </Container>
      );

    default:
      return null;
  }
}
