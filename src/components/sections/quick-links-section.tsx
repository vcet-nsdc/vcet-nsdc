/**
 * Quick Links Section Component
 * Navigation to key pages
 */

import Link from 'next/link';

export function QuickLinksSection() {
  const quickLinks = [
    { href: '/events', title: 'Explore Events', hint: 'See upcoming & past events' },
    { href: '/team', title: 'Meet the Team', hint: 'Know the people behind NSDC' },
    { href: '/contact', title: 'Get in Touch', hint: 'Reach out for collaborations' },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6">Jump in</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="block rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 hover:border-purple-400/60 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-semibold mb-1">{link.title}</h4>
                <p className="text-white/70 text-sm">{link.hint}</p>
              </div>
              <span className="text-purple-300">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
