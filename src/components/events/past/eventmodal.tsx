"use client"

import { motion, AnimatePresence } from "framer-motion"
import {  X } from "lucide-react"
import { ImageCarousel } from "./imagecrousal"

interface Event {
  id: string
  title: string
  year: string
  date: string
  time: string
  venue: string
  description: string
  about: string
  highlights: string[]
  gallery: string[]
  link: string
}

interface EventModalProps {
  event: Event | null
  onClose: () => void
  stockImages: string[]
}

export function EventModal({ event, onClose, stockImages }: EventModalProps) {
  if (!event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const imagesToShow = event.gallery && event.gallery.length > 0 ? event.gallery : stockImages

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full mt-20 max-w-4xl max-h-[80vh] rounded-lg border border-white/10 modal-smooth-scroll"
          style={{ backgroundColor: 'rgba(23, 10, 36, 0.7)', backdropFilter: 'blur(12px)' }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-8 text-fuchsia-100 hover:text-white transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
              <div className="p-6 text-left">
              <h3 className="text-fuchsia-100 text-lg font-heading mb-4">
                {event.title} — Event Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-fuchsia-200 mb-4">
                <div className="space-y-1">
                  <p className="text-fuchsia-300 font-body">Date & Time</p>
                  <p className="text-fuchsia-100 font-heading">
                    {formatDate(event.date)} • {event.time}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-fuchsia-300 font-body">Venue</p>
                  <p className="text-fuchsia-100 font-heading">{event.venue}</p>
                </div>
              </div>

              <div className="mb-8">
                <ImageCarousel images={imagesToShow} eventTitle={event.title} isVisible={!!event} />
              </div>

              <div className="mb-4">
                <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Overview</p>
                <div className="space-y-2 text-fuchsia-100 text-sm leading-relaxed font-body">
                  <p>{event.description}</p>
                  {event.about && <p>{event.about}</p>}
                </div>
              </div>

              {event.highlights && event.highlights.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-6 mb-4">
                  <div>
                    <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Highlights</p>
                    <ul className="space-y-1 list-disc list-inside">
                      {event.highlights.slice(0, Math.ceil(event.highlights.length / 2)).map((highlight, index) => (
                        <li key={index} className="text-fuchsia-100 text-sm font-body">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Awards</p>
                    <ul className="space-y-1 list-disc list-inside">
                      {event.highlights.slice(Math.ceil(event.highlights.length / 2)).map((highlight, index) => (
                        <li key={index} className="text-fuchsia-100 text-sm font-body">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* <div className="flex justify-center pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-4 py-2 rounded-xl text-xs font-heading hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Event Details
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div> */}
              </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
