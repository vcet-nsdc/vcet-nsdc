"use client"
import React, { useEffect, useState } from 'react'
import EventCard from '@/components/cards/EventCard'

// Shape expected from pastevents.json. Extra fields are ignored.
type JsonEvent = {
  id?: string
  title: string
  year?: string
  date?: string
  time?: string
  description?: string
  link?: string
  about?: string
  highlights?: string[]
  gallery?: string[] | { img: string; alt: string }[]
  inauguration?: string
  details?: {
    about?: string
    highlights?: string[]
    gallery?: string[] | { img: string; alt: string }[]
  }
}

const Past: React.FC = () => {
  const [events, setEvents] = useState<JsonEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/staticdata/pastevents.json', { cache: 'no-store' })
        const data = await res.json()
        const list: JsonEvent[] = Array.isArray(data) ? data : (data.events ?? [])
        setEvents(list)
      } catch (e) {
        console.error('Failed to load past events JSON', e)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10 text-white/80">Loading past events...</div>
    )
  }

  if (!events.length) {
    return (
      <div className="w-full flex justify-center py-10 text-white/60">No past events found.</div>
    )
  }

  return (
    <div className="font-body flex justify-center items-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center gap-16">
          {events.map((e, idx) => {
            const about = e.details?.about ?? e.about ?? ''
            const highlights = e.details?.highlights ?? e.highlights ?? []
            const galleryRaw = e.details?.gallery ?? e.gallery ?? []
            const galleryImages = (galleryRaw as any[]).map((g: any, i: number) =>
              typeof g === 'string' ? { img: g, alt: `${e.title} ${i + 1}` } : g
            )
            const dateTime = [e.date, e.time].filter(Boolean).join(' ')
            const shortDescription = e.description ?? ''
            const imagePath = galleryImages[0]?.img ?? '/img/events/carousel-images/event-img.png'

            return (
              <EventCard
                key={e.id ?? `${e.title}-${idx}`}
                title={e.title}
                dateTime={dateTime}
                dateString={e.date}
                timeString={e.time}
                venue={''}
                shortDescription={shortDescription}
                imagePath={imagePath}
                overview={about}
                highlights={highlights}
                itinerary={[]}
                awards={[]}
                galleryImages={galleryImages}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Past


