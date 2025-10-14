/**
 * Call-to-Action Section Component
 * Encourages user engagement
 */

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to learn, build, and lead?</h3>
        <p className="text-white/80 mb-6">Join our next event or collaborate with us on a project.</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/events"
            className="inline-block rounded-md bg-purple-500 hover:bg-purple-600 px-5 py-2 font-medium transition-colors"
          >
            Upcoming Events
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-md border border-white/20 hover:border-white/40 px-5 py-2 font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
