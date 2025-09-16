"use client"
import React from 'react'
import { getPastEvents } from '@/data/events'
import PastEventCard from './PastEventCard'

const PastEvents: React.FC = () => {
  const pastEvents = getPastEvents()

  if (pastEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-white mb-2">No past events found</h3>
        <p className="text-white/70">Check back later for past events!</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Past Events</h2>
        <p className="text-white/70 text-lg">Explore our previous events and achievements</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvents.map((event) => (
          <PastEventCard 
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  )
}

export default PastEvents
