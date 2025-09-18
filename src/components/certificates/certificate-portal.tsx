/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Search, Download, X } from 'lucide-react'

interface CertificateData {
  id?: string
  name: string
  product: string
  email: string
  certificateNumber: string
  date: string
}

interface CertificatePortalProps {
  onSearch: (email: string) => void
  isLoading?: boolean
  certificateFound?: boolean
  certificateNotFound?: boolean
  certificateData?: CertificateData | null
  onDownload?: (imageData: string) => void
  onShareLinkedIn?: (imageData: string) => void
  onCloseModal?: () => void
}

export function CertificatePortal({ 
  onSearch, 
  isLoading = false, 
  certificateFound = false, 
  certificateNotFound = false, 
  certificateData,
  onDownload, 
  // onShareLinkedIn,
  onCloseModal 
}: CertificatePortalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [imageData, setImageData] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Generate certificate when certificate data is available
  React.useEffect(() => {
    if (certificateFound && certificateData) {
      generateCertificate()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateFound, certificateData])

  // Prevent body scrolling when modal is open
  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  const generateCertificate = async () => {
    if (!certificateData) return
    
    setIsGenerating(true)
    setShowModal(true)
    
    // Create canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match the certificate template
    canvas.width = 2400  // Increased to accommodate larger image
    canvas.height = 1600

    // Load the certificate template image
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      // Draw the certificate template with custom width
      // You can modify these values to change the image size:
      const imageWidth = 2400   // Change this to resize width (currently 1800px - wider)
      const imageHeight = 1600  // Change this to resize height (currently 1600px)
      
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight)

      // Add dynamic content over the template
      
      // Certificate Number (top right area)
      ctx.fillStyle = '#000000'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'right'
      ctx.fillText(`Certificate No: ${certificateData.certificateNumber}`, canvas.width - 400, 50)

      // Combined Name and Product (side by side on same line)
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      
      // Create combined text
      const productText = `(${certificateData.product})`
      const combinedText = `${certificateData.name} ${productText}`
      
      // Set fixed font size to 90px
      const finalFontSize = 90
      
      // Draw the combined text centered
      ctx.font = `bold ${finalFontSize}px "monsterrat"`
      ctx.fillText(combinedText, canvas.width / 2, 825)
      
     
      // Date (bottom area)
     
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
    if (imageData && onDownload) {
      onDownload(imageData)
    }
  }


  const closeModal = () => {
    setShowModal(false)
    setImageData('')
    if (onCloseModal) {
      onCloseModal()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    onSearch(email)
  }

  const handleInputChange = (value: string) => {
    setEmail(value)
    if (error) {
      setError('')
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
      <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Get Your Certificate</CardTitle>
          <CardDescription className="text-blue-200">
            Enter your email to retrieve your certificate
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => handleInputChange(e.target.value)}
                className={`bg-blue-900/30 border-blue-500/50 text-white placeholder-blue-300 focus:border-blue-400 ${
                  error ? 'border-red-500' : ''
                }`}
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Certificate
                </div>
              )}
            </Button>
          </form>

          {certificateFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 bg-green-900/20 border border-green-500/30 rounded-lg"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-200 mb-2">Certificate Found!</h3>
                <p className="text-green-200 text-sm mb-2">
                  Your certificate is being generated and will appear in a moment.
                </p>
                <p className="text-green-300 text-xs">
                  Please wait while we prepare your certificate...
                </p>
              </div>
            </motion.div>
          )}

          {certificateNotFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 bg-red-900/20 border border-red-500/30 rounded-lg"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-200 mb-2">Certificate Not Found</h3>
                <p className="text-red-200 text-sm mb-4">
                  No certificate found for this email address. Please make sure you have generated a certificate first.
                </p>
                <p className="text-red-300 text-xs">
                  Go back to Step 1 to generate a new certificate.
                </p>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>

    {/* Certificate Modal */}
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-[9999] bg-black/70 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={closeModal}
        >
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl max-w-[90vw] max-h-[90vh] w-full flex flex-col overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-6">
              <h2 className="text-2xl font-bold text-center">Your Certificate is Ready!</h2>
              <p className="text-center text-purple-100 mt-2">
                Download or share your certificate
              </p>
            </div>

            {/* Certificate Preview */}
            <div className="flex-1 overflow-y-auto bg-white/80">
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
                    className="max-w-full max-h-[70vh] w-auto h-auto rounded-lg shadow-xl border border-gray-200 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-fuchsia-600 border-t border-gray-200 flex-shrink-0">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
