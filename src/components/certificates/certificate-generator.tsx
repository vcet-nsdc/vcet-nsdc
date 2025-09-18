/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CertificateData {
  name: string
  product: string
  email: string
  certificateNumber: string
  date: string
}

interface CertificateGeneratorProps {
  certificateData: CertificateData
  onClose: () => void
  onDownload: (imageData: string) => void
  onShareLinkedIn: (imageData: string) => void
}

export function CertificateGenerator({ 
  certificateData, 
  onClose, 
  onDownload, 
  // onShareLinkedIn 
}: CertificateGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [imageData, setImageData] = useState<string>('')

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    generateCertificate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateData])

  const generateCertificate = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match the certificate template
    canvas.width = 1800
    canvas.height = 1600

    // Load the certificate template image
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      // Draw the certificate template
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Add dynamic content over the template
      
      // Certificate Number (top right area)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'right'
      ctx.fillText(`Certificate No: ${certificateData.certificateNumber}`, canvas.width - 50, 100)

      // Participant Name (center area, below "THIS IS TO CERTIFY THAT")
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 36px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(certificateData.name, canvas.width / 2, 600)

      // Product Name (in the sentence about displaying product)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      
      // Split the text to insert product name
      const baseText = "for Displaying"
      const productText = certificateData.product
      const endText = "in the TechX-Product Showcase Organized by the Department of Artificial Intelligence & Data Science in Association with VCET-NSDC on 19th September 2025."
      
      // Calculate text positioning
      const lineHeight = 30
      const startY = 700
      
      // Draw the text with product name inserted
      ctx.font = 'bold 20px Arial'
      ctx.fillText(baseText, canvas.width / 2, startY)
      
      ctx.font = 'bold 24px Arial'
      ctx.fillText(productText, canvas.width / 2, startY + lineHeight)
      
      ctx.font = 'bold 20px Arial'
      ctx.fillStyle = '#000000'
      ctx.fillText(endText, canvas.width / 2, startY + lineHeight * 2)

      // Date (bottom area)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`Date: ${certificateData.date}`, canvas.width / 2, 1400)

      // Convert canvas to image data
      const dataURL = canvas.toDataURL('image/png')
      setImageData(dataURL)
      setIsGenerating(false)
    }

    img.onerror = () => {
      console.error('Failed to load certificate template')
      setIsGenerating(false)
    }

    // Load the certificate template
    img.src = '/assests/final.png'
  }

  const handleDownload = () => {
    if (imageData) {
      onDownload(imageData)
    }
  }


  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full z-[9999] bg-black/70 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl max-w-[70vw] max-h-[50vh] w-full flex flex-col overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-6 mt-50">
            <h2 className="text-2xl font-bold text-center">Your Certificate is Ready!</h2>
            <p className="text-center text-purple-100 mt-2">
              Download or share your certificate
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {isGenerating ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating your certificate...</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center p-4">
                <img
                  src={imageData}
                  alt="Generated Certificate"
                  className="max-w-full max-h-[90vh]  h-auto rounded-lg shadow-xl border border-gray-200 object-contain"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={handleDownload}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Certificate
              </Button>
              {/* <Button
                onClick={handleShareLinkedIn}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share on LinkedIn
              </Button> */}
            </div>
          </div>

          {/* Hidden canvas for generation */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
