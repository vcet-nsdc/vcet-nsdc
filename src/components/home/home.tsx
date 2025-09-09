import React from 'react'
import HeroSection from './Herosection'

const home = () => {
  return (
    <div>
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About NSDC @ VCET</h2>
            <p className="text-white/80 leading-relaxed">
              The National Student Data Corps (NSDC) at VCET fosters a vibrant community around
              Artificial Intelligence and Data Science. We organize hands-on workshops, invite
              industry speakers, and build impactful projects that sharpen data skills and inspire
              collaboration.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <dt className="text-3xl font-extrabold text-purple-400">30+</dt>
                <dd className="text-sm text-white/70">Core Members</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold text-purple-400">12+</dt>
                <dd className="text-sm text-white/70">Workshops</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold text-purple-400">1k+</dt>
                <dd className="text-sm text-white/70">Participants</dd>
              </div>
              <div>
                <dt className="text-3xl font-extrabold text-purple-400">24</dt>
                <dd className="text-sm text-white/70">Projects</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-8">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">What we do</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Events & Workshops',
              desc: 'Hands-on sessions in ML, data viz, and AI tools.',
            },
            {
              title: 'Projects & Hackathons',
              desc: 'Team up to ship real projects and compete together.',
            },
            {
              title: 'Community & Mentorship',
              desc: 'Peer learning, talks, and guidance from seniors.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6">
              <h4 className="text-xl font-semibold mb-2">{c.title}</h4>
              <p className="text-white/75 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl md:text-3xl font-semibold mb-6">Jump in</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: '/events', title: 'Explore Events', hint: 'See upcoming & past events' },
            { href: '/team', title: 'Meet the Team', hint: 'Know the people behind NSDC' },
            { href: '/contact', title: 'Get in Touch', hint: 'Reach out for collaborations' },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="block rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 hover:border-purple-400/60 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold mb-1">{card.title}</h4>
                  <p className="text-white/70 text-sm">{card.hint}</p>
                </div>
                <span className="text-purple-300">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to learn, build, and lead?</h3>
          <p className="text-white/80 mb-6">Join our next event or collaborate with us on a project.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/events" className="inline-block rounded-md bg-purple-500 hover:bg-purple-600 px-5 py-2 font-medium">Upcoming Events</a>
            <a href="/contact" className="inline-block rounded-md border border-white/20 hover:border-white/40 px-5 py-2 font-medium">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default home