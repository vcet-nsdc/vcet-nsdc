"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface ImageCarouselProps {
  images: string[]
  eventTitle: string
  isVisible: boolean
}

export function ImageCarousel({ images, eventTitle, isVisible }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (isVisible && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 3000) // Change image every 3 seconds

      return () => clearInterval(interval)
    }
  }, [isVisible, images.length])

  useEffect(() => {
    if (isVisible) {
      setCurrentImageIndex(0)
    }
  }, [isVisible])

  if (!images || images.length === 0) {
    return (
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  return (
    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${eventTitle} event image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-accent scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  )
}
