"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"
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
        className="modal-container bg-black/80 backdrop-blur-sm "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="modal-content-wrapper relative mt-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-card border border-border rounded-full hover:bg-muted transition-colors duration-200 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            className="bg-card border border-border rounded-lg w-full modal-content-inner"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border">
              <h3 className="text-2xl font-bold text-foreground">{event.title} — Event Details</h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Date & Time</h4>
                  <p className="text-muted-foreground">
                    {formatDate(event.date)} • {event.time}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Venue</h4>
                  <p className="text-muted-foreground">{event.venue}</p>
                </div>
              </div>

              <div className="mb-8">
                <ImageCarousel images={imagesToShow} eventTitle={event.title} isVisible={!!event} />
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-foreground mb-4">Overview</h4>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{event.description}</p>
                  {event.about && <p>{event.about}</p>}
                </div>
              </div>

              {event.highlights && event.highlights.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-4">Highlights</h4>
                    <ul className="space-y-3">
                      {event.highlights.slice(0, Math.ceil(event.highlights.length / 2)).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground mb-4">Awards</h4>
                    <ul className="space-y-3">
                      {event.highlights.slice(Math.ceil(event.highlights.length / 2)).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground border-0 shadow-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300"
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
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
