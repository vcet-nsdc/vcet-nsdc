"use client"

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image, { StaticImageData } from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageMovingCards } from '@/components/ui/image-moving-cards'

export interface EventCardProps {
  title: string
  // either provide dateTime or dateStart/dateEnd
  dateTime?: string
  dateStart?: string
  dateEnd?: string
  dateString?: string
  timeString?: string
  venue: string
  shortDescription: string
  imagePath: StaticImageData | string
  overview: string
  highlights: string[]
  itinerary: string[]
  awards: string[]
  galleryImages?: { img: string; alt: string }[]
  gallerySpeedSeconds?: number
}

const defaultGallery: { img: string; alt: string }[] = [
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 1' },
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 2' },
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 3' },
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 4' },
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 5' },
  { img: '/img/events/carousel-images/event-img.png', alt: 'Event Image 6' },
]

const EventCard: React.FC<EventCardProps> = ({
  title,
  dateTime,
  dateStart,
  dateEnd,
  venue,
  dateString,
  timeString,
  shortDescription,
  imagePath,
  overview,
  highlights,
  itinerary,
  awards,
  galleryImages,
  gallerySpeedSeconds,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const cardWrapperRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [modalPos, setModalPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  const images = galleryImages && galleryImages.length > 0 ? galleryImages : defaultGallery

  const prettyDateTime = React.useMemo(() => {
    const format = (d: Date) =>
      new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: true,
        
      }).format(d)

    if (dateTime) return dateTime
    if (!dateStart) return ''
    const start = new Date(dateStart)
    const end = dateEnd ? new Date(dateEnd) : undefined
    return end ? `${format(start)} — ${format(end)}` : format(start)
  }, [dateTime, dateStart, dateEnd])

  const prettyDate = React.useMemo(() => {
    if (dateString) return dateString
    if (dateStart) {
      try { return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(dateStart)) } catch { return dateStart }
    }
    return ''
  }, [dateString, dateStart])

  const prettyTime = React.useMemo(() => {
    if (timeString) return timeString
    if (dateStart) {
      try { return new Intl.DateTimeFormat('en-GB', { timeStyle: 'short', hour12: true }).format(new Date(dateStart)) } catch { return '' }
    }
    return ''
  }, [timeString, dateStart])

  const showEventBadges = React.useMemo(() => {
    const t = (title || '').toLowerCase()
    return (
      t.includes('oscillation') ||
      t.includes('vnps') ||
      t.includes('techblitz') ||
      t.includes('code o fiesta') ||
      t.includes('code-o-fiesta') ||
      t.includes('logo making')
    )
  }, [title])

  const showCompetitionTag = React.useMemo(() => {
    const t = (title || '').toLowerCase()
    return !(
      t.includes('techgazete') ||
      t.includes('techgazette') ||
      t.includes('seminar') ||
      t.includes('expert lecture') ||
      t.includes('inaugration') ||
      t.includes('inauguration')
    )
  }, [title])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageClick = (imageSrc: string) => {
    setZoomedImage(imageSrc);
  }

  const measureAndSetModalPos = () => {
    // Anchor modal to the visual center of the card in viewport coordinates
    const el = cardRef.current || cardWrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setModalPos({ top: centerY, left: centerX, width: rect.width })
  }

  const openModalAligned = () => {
    // Measure and open immediately at the card's current center
    measureAndSetModalPos()
    setIsModalOpen(true)
  }

  useEffect(() => {
    const wrapper = cardWrapperRef.current
    const overlay = overlayRef.current
    const card = cardRef.current

    const onEnter = () => {
      if (overlay && wrapper) {
        overlay.style.opacity = '1'
        wrapper.classList.add('is-tilted')
      }
    }
    const onMove = (ev: MouseEvent) => {
      if (!card || !wrapper) return
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect()
        const x = (ev.clientX - rect.left) / rect.width
        const y = (ev.clientY - rect.top) / rect.height
        const rotateY = (x - 0.5) * 20
        const rotateX = (0.5 - y) * 12
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
    }
    const onLeave = () => {
      if (overlay && wrapper && card) {
        overlay.style.opacity = '0'
        wrapper.classList.remove('is-tilted')
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'
      }
    }
    wrapper?.addEventListener('mouseenter', onEnter)
    wrapper?.addEventListener('mousemove', onMove)
    wrapper?.addEventListener('mouseleave', onLeave)

    return () => {
      wrapper?.removeEventListener('mouseenter', onEnter)
      wrapper?.removeEventListener('mousemove', onMove)
      wrapper?.removeEventListener('mouseleave', onLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  // Compute modal position aligned to the card
  useEffect(() => {
    const updatePos = () => {
      if (!isModalOpen) return
      measureAndSetModalPos()
    }
    updatePos()
    window.addEventListener('resize', updatePos)
    window.addEventListener('scroll', updatePos, { passive: true })
    return () => {
      window.removeEventListener('resize', updatePos)
      window.removeEventListener('scroll', updatePos)
    }
  }, [isModalOpen])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const body = document.body
    if (isModalOpen) {
      body.classList.add('modal-open')
    } else {
      body.classList.remove('modal-open')
    }
    return () => {
      body.classList.remove('modal-open')
    }
  }, [isModalOpen])

  return (
    <>
      <div ref={cardWrapperRef} className="event-card-wrapper w-full">
        <div ref={cardRef} className="event-card card-surface rounded-3xl cursor-pointer">
          <div className="flex h-72 card-content">
            <div ref={overlayRef} className="glass-pane" style={{ pointerEvents: 'none' }} />

            <div 
              className="w-2/5 relative shimmer flex flex-col items-center justify-center p-6 floating-element rounded-l-3xl overflow-hidden cursor-pointer"
              onClick={() => {
                const imageSrc = typeof imagePath === 'string' && imagePath
                  ? imagePath
                  : (imagePath as any)?.src ?? '/event-img.png'
                handleImageClick(imageSrc);
              }}
            >
              {(() => {
                const imageSrc = typeof imagePath === 'string' && imagePath
                  ? imagePath
                  : (imagePath as any)?.src ?? '/event-img.png'
                return (
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                )
              })()}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/60 to-fuchsia-800/60 z-[10]" style={{ pointerEvents: 'none' }} />

              {showCompetitionTag && (
                <div className="absolute top-4 left-4 z-[30]">
                  <span className="relative bg-white/25 text-white text-xs md:text-sm px-3 py-1.5 rounded-full font-heading tracking-wider border border-white/30 drop-shadow-md">COMPETITION</span>
                </div>
              )}
              <h3 className="relative z-[30] text-white text-2xl text-center leading-tight transform rotate-[-1deg] font-heading">{title}</h3>
              <div className="absolute bottom-4 right-4 z-[30]">
                <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-4 h-4 bg-white/80 rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-3/5 p-6 flex flex-col floating-element">
              <div 
                className="relative mb-4 rounded-xl overflow-hidden group h-24 cursor-pointer"
                onClick={() => {
                  const imageSrc = typeof imagePath === 'string' && imagePath
                    ? imagePath
                    : (imagePath as any)?.src ?? '/event-img.png'
                  handleImageClick(imageSrc);
                }}
              >
                {(() => {
                  const imageSrc = typeof imagePath === 'string' && imagePath
                    ? imagePath
                    : (imagePath as any)?.src ?? '/event-img.png'
                  return (
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/80 text-slate-900 text-[11px] sm:text-xs font-heading shadow inline-flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M16 3v4M8 3v4M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    {prettyDate || prettyDateTime}
                  </span>
                  {prettyTime && (
                    <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[11px] sm:text-xs font-heading shadow inline-flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" opacity="0.9"/>
                        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {prettyTime}
                    </span>
                  )}
                  {venue && (
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/70 text-white text-[11px] sm:text-xs font-heading shadow">
                      {venue}
                    </span>
                  )}
                </div>
                <p className="text-white/90 drop-shadow-sm text-xs leading-relaxed mb-4 font-body">{shortDescription}</p>
                <div className="flex items-center justify-between">
                  {showEventBadges ? (
                    <div className="flex items-center gap-3 attendee-icons">
                      <span className="text-[12px] sm:text-sm font-heading font-semibold text-white">Teams • Open to all</span>
                      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-semibold text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-heading border border-white/20">Awards: Trophy + Certificates</div>
                    </div>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={openModalAligned}
                    className="bg-gradient-to-r from-fuchsia-600 to-purple-700 text-white px-4 py-2 rounded-xl text-xs font-heading hover:shadow-lg hover:scale-105 transition-all duration-200 read-more-btn"
                    data-original="Read more"
                    aria-label="Read more"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted && isModalOpen && createPortal(
        <div id="modal-root" className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
            setIsModalOpen(false);
            setZoomedImage(null);
          }} />
          
          {/* Zoomed Image Overlay */}
          {zoomedImage && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              {/* Blurred Background */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
              
              {/* Zoomed Image Container */}
              <div className="relative w-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden bg-gradient-to-b from-violet-700 to-fuchsia-700 shadow-2xl">
                <button 
                  onClick={() => setZoomedImage(null)} 
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full p-2 hover:bg-black/70" 
                  aria-label="Close zoomed image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <img src={zoomedImage} alt="Zoomed Image" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          <div className="fixed inset-0 overflow-y-auto pointer-events-auto hide-scrollbar">
            <div className="min-h-full w-full p-6 md:p-8">
              <div className="relative mx-auto w-full max-w-5xl rounded-lg border border-white/10 shadow-2xl" style={{ backgroundColor: 'rgba(23, 10, 36, 0.7)', backdropFilter: 'blur(12px)' }}>
                {!zoomedImage && (
                  <button onClick={() => {
                    setIsModalOpen(false);
                    setZoomedImage(null);
                  }} className="absolute top-4 right-8 text-fuchsia-100 hover:text-white transition-colors z-20" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
                <div className="w-full p-6 text-left">

                  {(prettyDate || prettyTime || venue) && (
                    <div className="grid sm:grid-cols-3 gap-4 text-sm text-fuchsia-200 mb-4">
                      {prettyDate && (
                        <div className="space-y-1">
                          <p className="text-fuchsia-300 font-body">Date</p>
                          <p className="text-fuchsia-100 font-heading">{prettyDate}</p>
                        </div>
                      )}
                      {prettyTime && (
                        <div className="space-y-1">
                          <p className="text-fuchsia-300 font-body">Time</p>
                          <p className="text-fuchsia-100 font-heading">{prettyTime}</p>
                        </div>
                      )}
                      {venue && (
                        <div className="space-y-1">
                          <p className="text-fuchsia-300 font-body">Venue</p>
                          <p className="text-fuchsia-100 font-heading">{venue}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {overview && (
                    <div className="mb-4">
                      <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Overview</p>
                      <p className="text-fuchsia-100 text-sm leading-relaxed font-body">{overview}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {highlights && highlights.length > 0 && (
                      <div>
                        <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Highlights</p>
                        <ul className="space-y-1 list-disc list-inside">
                          {highlights.map((item, index) => (
                            <li key={index} className="text-fuchsia-100 text-sm font-body">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {awards && awards.length > 0 && (
                      <div>
                        <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Awards</p>
                        <ul className="space-y-1 list-disc list-inside">
                          {awards.map((item, index) => (
                            <li key={index} className="text-fuchsia-100 text-sm font-body">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {itinerary && itinerary.length > 0 && (
                      <div>
                        <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Itinerary</p>
                        <ul className="space-y-1 list-disc list-inside">
                          {itinerary.map((item, index) => (
                            <li key={index} className="text-fuchsia-100 text-sm font-body">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {images && images.length > 0 && (
                      <div className="col-span-full mt-4">
                        <div className="flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative">
                          <ImageMovingCards items={images} onImageClick={handleImageClick} speedSeconds={gallerySpeedSeconds ?? 35} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}


      <style jsx global>{`
        .event-card-wrapper { perspective: 1200px; position: relative; z-index: 20; transition: z-index 0s 0.6s; }
        .event-card-wrapper.is-tilted { z-index: 30; transition: z-index 0s 0s; }
        .event-card { transform-style: preserve-3d; transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .event-card-wrapper.is-tilted .event-card { transform: rotate3d(0.5, 1, 0, 15deg); box-shadow: rgba(0,0,0,0.30) 30px 50px 25px -40px, rgba(0,0,0,0.18) 0px 25px 30px 0px; }
        .event-card .card-content { position: relative; transform-style: preserve-3d; }
        .glass-pane { position: absolute; inset: 8px; border-radius: 20px; transform: translateZ(20px); transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.1s; }
        .event-card-wrapper.is-tilted .glass-pane { transform: translateZ(45px); }
        .event-card .floating-element { transform: translateZ(25px); transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s; transform-style: preserve-3d; }
        .event-card-wrapper.is-tilted .floating-element { transform: translateZ(60px); }
        .read-more-btn { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s; }
        .event-card-wrapper.is-tilted .read-more-btn { transform: translateZ(90px) scale(1.05); }
        .attendee-icons { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.3s; }
        .event-card-wrapper.is-tilted .attendee-icons { transform: translateZ(80px); }
        .card-surface { background: linear-gradient(180deg, #a78bfa 0%, #8b5cf6 45%, #7c3aed 100%); border: 1px solid rgba(139,92,246,0.35); box-shadow: 0 0 0 1px rgba(139,92,246,0.15), 0 10px 30px rgba(99,102,241,0.18); }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        /* Disable background scroll when modal is open */
        body.modal-open { overflow: hidden; overscroll-behavior: contain; touch-action: none; }
      `}</style>
    </>
  )
}

export default EventCard
