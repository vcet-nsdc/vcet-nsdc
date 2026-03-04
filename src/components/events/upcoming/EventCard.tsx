"use client"
import { useEffect, useRef, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
// import eventImg from './event-img.png' // Make sure this path is correct
import { AnimatePresence, motion } from 'framer-motion'

interface EventCardProps {
  title: string
  dateTime: string
  venue: string
  shortDescription: string
  imagePath: string | StaticImageData
  overview: string
  highlights: string[]
  awards: string[]
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  dateTime,
  venue,
  shortDescription,
  imagePath,
  overview,
  highlights,
  awards,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const cardWrapperRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)

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

  useEffect(() => {
    if (typeof document === 'undefined') return

    if (isModalOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isModalOpen])

  return (
    <>
      <div ref={cardWrapperRef} className="event-card-wrapper w-full ">
        <div ref={cardRef} className="event-card card-surface rounded-3xl cursor-pointer">
          <div className="flex h-72 card-content">
            <div className="glass-pane" />

            <div className="w-2/5 relative shimmer flex flex-col items-center justify-center p-6 floating-element rounded-l-3xl overflow-hidden">
              <Image
                src={imagePath || '/assests/image.png'}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 z-0"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/60 to-fuchsia-800/60 z-[10]" />

              <div className="absolute top-4 left-4 z-[30]">
                <span className="relative bg-white/25 text-white text-xs md:text-sm px-3 py-1.5 rounded-full font-heading tracking-wider border border-white/30 drop-shadow-md">COMPETITION</span>
              </div>
              <h3 className="relative z-[30] text-white text-2xl text-center leading-tight transform rotate-[-1deg] font-heading">{title}</h3>
              <div className="absolute bottom-4 right-4 z-[30]">
                <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center border border-white/20">
                  <div className="w-4 h-4 bg-white/80 rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-3/5 p-6 flex flex-col floating-element">
              <div className="relative mb-4 rounded-xl overflow-hidden group h-24">
                <Image src={imagePath || '/assests/image.png'} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full" />
                  <span className="text-white text-sm font-heading">{dateTime}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="text-white text-sm font-heading">{venue}</span>
                </div>
                <p className="text-white text-xs leading-relaxed mb-4 font-body">{shortDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 attendee-icons">
                    <span className="text-[11px] text-white font-body">Teams • Open to all</span>
                    <div className="bg-fuchsia-100 text-fuchsia-700 text-[10px] px-2 py-1 rounded-full font-heading border border-fuchsia-300">Awards: Trophy + Certificates</div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
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

      <AnimatePresence>
        {isModalOpen && (
          <div
            id="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-20 rounded-3xl "
            // onClick={() => setIsModalOpen(false)} // Removed to prevent closing by clicking outside
          >
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative z-10 w-full max-w-2xl rounded-lg border border-white/10"
              style={{ maxHeight: '85vh' }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-8 text-fuchsia-100 hover:text-white transition-colors z-20"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div 
                className="w-full p-6 text-left modal-content rounded-md h-[85vh]" 
                style={{ backgroundColor: 'rgba(23, 10, 36, 0.7)', backdropFilter: 'blur(12px)' }}
              >
                <h3 className="text-fuchsia-100 text-lg font-heading mb-4">
                  {title} — Event Details
                </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm text-fuchsia-200 mb-4">
                    <div className="space-y-1">
                      <p className="text-fuchsia-300 font-body">Date & Time</p>
                      <p className="text-fuchsia-100 font-heading">{dateTime}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-fuchsia-300 font-body">Venue</p>
                      <p className="text-fuchsia-100 font-heading">{venue}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Overview</p>
                    <p className="text-fuchsia-100 text-sm leading-relaxed font-body">{overview}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Highlights</p>
                      <ul className="space-y-1 list-disc list-inside">
                        {highlights.map((item, index) => (
                          <li key={index} className="text-fuchsia-100 text-sm font-body">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-fuchsia-300 text-sm mb-1.5 font-body">Awards</p>
                      <ul className="space-y-1 list-disc list-inside">
                        {awards.map((item, index) => (
                          <li key={index} className="text-fuchsia-100 text-sm font-body">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EventCard
