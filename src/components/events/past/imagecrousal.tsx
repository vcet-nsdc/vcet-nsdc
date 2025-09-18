"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { X, ZoomIn } from "lucide-react"
import Image from "next/image"

interface ImageCarouselProps {
  images: string[]
  eventTitle: string
  isVisible: boolean
}

export function ImageCarousel({ images, eventTitle, isVisible }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isVisible && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsLoading(true) // Reset loading state for new media
      }, 5000) // Change media every 5 seconds (longer for videos)

      return () => clearInterval(interval)
    }
    return undefined
  }, [isVisible, images.length])

  useEffect(() => {
    if (isVisible) {
      setCurrentImageIndex(0)
      setIsLoading(true)
    }
  }, [isVisible])

  const handleMediaLoad = () => {
    setIsLoading(false)
  }

  const handleMediaError = (url: string) => {
    console.error('Media failed to load:', url)
    setIsLoading(false)
  }

  const handleMediaClick = () => {
    setIsModalOpen(true)
  }

  const isVideo = (url: string) => {
    return url.includes('.mov') || url.includes('.mp4') || url.includes('.webm') || url.includes('.avi')
  }

  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No media available</p>
      </div>
    )
  }

  return (
    <>
    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100/20 to-violet-100/20">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="w-full h-full flex items-center justify-center cursor-pointer group relative"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={handleMediaClick}
        >
          {isVideo(images[currentImageIndex] || '') ? (
            <video
              src={images[currentImageIndex] || ""}
              className="max-w-full max-h-full object-contain"
              controls
              muted
              loop
              playsInline
              onLoadedData={handleMediaLoad}
              onError={() => handleMediaError(images[currentImageIndex] || "")}
            />
          ) : (
            <Image
              src={images[currentImageIndex] || ""}
              alt={`${eventTitle} event image ${Number(currentImageIndex) + 1}`}
              className="max-w-full max-h-full object-contain"
              fill={false}
              width={800}
              height={600}
              onLoad={handleMediaLoad}
              onError={() => {
                handleMediaError(images[currentImageIndex] || "")
              }}
              loading="lazy"
              style={{ objectFit: "contain" }}
              unoptimized
            />
          )}
          
          {/* Click overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index)
              setIsLoading(true)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-purple-400 scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>

    {/* Modal for full-size view */}
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media content */}
            <div className="relative">
              {isVideo(images[currentImageIndex] || '') ? (
                <video
                  src={images[currentImageIndex]}
                  className="w-full h-full max-h-[90vh] object-contain"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <Image
                  src={images[currentImageIndex] || ""}
                  alt={`${eventTitle} event image ${currentImageIndex + 1}`}
                  className="w-full h-full max-h-[90vh] object-contain"
                  width={1200}
                  height={900}
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              )}
            </div>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex((prev) => (prev + 1) % images.length)
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
