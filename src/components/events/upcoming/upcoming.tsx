"use client"
import React from 'react'
import EventCard from '@/components/cards/EventCard'
import { getUpcomingEvents } from '@/utils/events'

const Upcoming: React.FC = () => {
  const list = getUpcomingEvents()
  
  return (
    <div className="font-body min-h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-20 md:pt-40">
        <div className="flex flex-col items-center gap-16">
          {list.map((e) => (
            <EventCard key={e.id} {...e} gallerySpeedSeconds={16} />
          ))}
        </div>
      </div>
     
    </div>
  )
}

export default Upcoming