"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Event } from '@/types'

interface PastEventCardProps {
  event: Event
}

const PastEventCard: React.FC<PastEventCardProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
        onClick={openModal}
      >
        <div className="relative mb-4">
          <Image
            src={event.imagePath}
            alt={event.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
            Past Event
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {event.title}
          </h3>
          
          <div className="flex items-center text-white/70 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.dateTime}</span>
          </div>
          
          <div className="flex items-center text-white/70 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue}</span>
          </div>

          <p className="text-white/80 text-sm line-clamp-3">
            {event.shortDescription}
          </p>

          {event.link && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/30 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(event.link, '_blank')
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Event
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={event.imagePath}
                    alt={event.title}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Past Event
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-white/80">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{event.dateTime}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
                  <p className="text-white/80 leading-relaxed">{event.overview}</p>
                </div>

                {event.highlights && event.highlights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-white/80">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.awards && event.awards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Awards & Recognition</h3>
                    <ul className="space-y-2">
                      {event.awards.map((award, index) => (
                        <li key={index} className="flex items-start text-white/80">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.link && (
                  <div className="pt-4">
                    <Button
                      onClick={() => window.open(event.link, '_blank')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Event Details
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PastEventCard
