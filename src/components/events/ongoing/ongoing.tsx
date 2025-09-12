"use client"
import React from 'react'
import EventCard from '@/components/cards/EventCard'
import { getOngoingEvents } from '@/utils/events'

const Ongoing: React.FC = () => {
  const list = getOngoingEvents()
  return (
    <div className="font-body min-h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-20 md:pt-40">
        <div className="flex flex-col items-center gap-16">
          {list.map((e) => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ongoing