import React from 'react'
import Image from 'next/image'
import Countdown from '@/components/ui/countdown'
import eventImg from '@/components/events/upcoming/event-img.png'
import HeroSection from './Herosection'
// import MarqueeSlider from '@/components/ui/marquee-slider'

const home = () => {
  return (
    <div>
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold">About NSDC @ VCET</h2>
            <div className="mx-auto mt-4 w-44">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <div className="mx-auto mt-1 h-0.5 w-20 bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur px-6 md:px-8 py-6 space-y-5 text-lg md:text-xl text-white/90 leading-relaxed shadow-lg">
              <p>
                The National Student Data Corps (NSDC) stands as a beacon of opportunity, ushering students into the vibrant world of data science within a nurturing community. With a keen eye towards empowering underserved institutions and students, NSDC offers a transformative journey filled with resources and support.
              </p>
              <p>
                At its heart lies the NSDC Founding Committee, a dynamic assembly of 24 luminaries hailing from academia, industry, and nonprofits. Their collaborative spirit fuels the creation of a pioneering platform, uniting diverse perspectives to craft a groundbreaking program in data science, set to redefine inclusivity and innovation.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold pt-10 text-center">Our Vision</h3>
            <div className="mx-auto mt-3 w-36">
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="mx-auto mt-1 h-0.5 w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 px-6 md:px-8 py-6 space-y-5 text-lg md:text-xl text-white/85 leading-relaxed shadow">
              <p>
                VCET-NSDC, the Professional Student Chapter, represents a gateway to the world of Data Science and Artificial Intelligence. It&apos;s not just a chapter; it is a community of learning and growth. This professional chapter is part of a global network of 650+ chapters! This gives our students wide exposure and the chance to communicate and collaborate globally.
              </p>
              <p>
                The main aim of VCET-NSDC is to foster budding AI Engineers by providing them the opportunities to learn, explore, collaborate and enhance their skills in the field of Artificial Intelligence and Data Science.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar (Horizontal) */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur px-6 md:px-10 py-6 shadow-lg">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <li className="space-y-1">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-400">50+</div>
              <div className="text-sm text-white/70">Team Members</div>
            </li>
            <li className="space-y-1">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-400">12+</div>
              <div className="text-sm text-white/70">Events</div>
            </li>
            <li className="space-y-1">
              <div className="text-4xl md:text-5xl font-extrabold text-purple-400">1k+</div>
              <div className="text-sm text-white/70">Participants</div>
            </li>
          </ul>
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

      {/* Upcoming Event block (Landing only) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Upcoming Event</h3>
              <p className="text-white/70 text-sm">Don&apos;t miss our next session</p>
            </div>
            <a href="/events" className="text-sm text-purple-300 underline-offset-2 hover:underline">See all</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">
            {/* Event preview card */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600/15 to-blue-600/15 p-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image src={eventImg} alt="Code-o-Fiesta" fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-purple-300">Upcoming</div>
                <div className="truncate text-lg font-semibold">Code‑o‑Fiesta</div>
                <div className="truncate text-sm text-white/70">September 13, 2025 • 9:30 AM • VCET, Vasai</div>
              </div>
              <a href="/events" className="ml-auto rounded-md border border-white/15 px-3 py-1.5 text-sm hover:border-white/30">Details</a>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center">
              <Countdown targetMonth={9} targetDay={13} />
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider */}
      {/* <section className="max-w-7xl mx-auto px-6 pb-24">
        <MarqueeSlider />
      </section> */}
    </div>
  )
}

export default home