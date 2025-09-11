/**
 * Event Card Component
 * Individual event card with modal functionality
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Event } from '@/types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex h-72">
          {/* Image Section */}
          <div className="w-2/5 relative">
            <Image
              src={event.imagePath}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/60 to-fuchsia-800/60" />
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/25 text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/30">
                {event.category.toUpperCase()}
              </span>
            </div>
            <h3 className="absolute bottom-4 left-4 right-4 z-10 text-white text-xl font-bold">
              {event.title}
            </h3>
          </div>

          {/* Content Section */}
          <div className="w-3/5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                <span className="text-white text-sm font-medium">{event.dateTime}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
                <span className="text-white text-sm">{event.venue}</span>
              </div>
              <p className="text-white text-sm leading-relaxed mb-4">
                {event.shortDescription}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/70">Teams • Open to all</span>
                <div className="bg-fuchsia-100 text-fuchsia-700 text-xs px-2 py-1 rounded-full font-medium border border-fuchsia-300">
                  Awards: Trophy + Certificates
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-4 py-2 rounded-xl text-xs font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Read more
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              className="relative z-10 w-full max-w-2xl rounded-lg border border-white/10 bg-slate-900/90 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsModalOpen(false)}
                    className="text-white hover:text-gray-300"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Date & Time</p>
                      <p className="text-white font-medium">{event.dateTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Venue</p>
                      <p className="text-white font-medium">{event.venue}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-2">Overview</p>
                    <p className="text-white text-sm leading-relaxed">{event.overview}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Highlights</p>
                      <ul className="space-y-1">
                        {event.highlights.map((highlight, index) => (
                          <li key={index} className="text-white text-sm flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Awards</p>
                      <ul className="space-y-1">
                        {event.awards.map((award, index) => (
                          <li key={index} className="text-white text-sm flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
