/**
 * Highlights Section Component
 * Showcase what the organization does
 */

export function HighlightsSection() {
  const highlights = [
    {
      title: 'Events & Workshops',
      description: 'Hands-on sessions in ML, data viz, and AI tools.',
    },
    {
      title: 'Projects & Hackathons',
      description: 'Team up to ship real projects and compete together.',
    },
    {
      title: 'Community & Mentorship',
      description: 'Peer learning, talks, and guidance from seniors.',
    },
  ] as const;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-8">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6">What we do</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6"
          >
            <h4 className="text-xl font-semibold mb-2">{highlight.title}</h4>
            <p className="text-white/75 text-sm leading-relaxed">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
