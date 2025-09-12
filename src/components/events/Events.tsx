"use client"
import React from 'react'
import Upcoming from './upcoming/upcoming'
import Ongoing from './ongoing/ongoing'
import Past from './past/past'

const Events = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 space-y-16">
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">Ongoing Events</h2>
        <Ongoing />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">Upcoming Events</h2>
        <Upcoming />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">Past Events</h2>
        <Past />
      </section>

      {/* Page-level floating button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Events