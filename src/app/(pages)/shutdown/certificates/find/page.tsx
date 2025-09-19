"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CertificatePortal } from '@/components/certificates/certificate-portal'
import { Search } from 'lucide-react'
import { findCertificateByEmail, updateCertificateStatus } from '@/lib/certificate-storage'

interface CertificateData {
  id?: string
  name: string
  product: string
  email: string
  certificateNumber: string
  date: string
}

export default function CertificateSearchPage() {
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [certificateFound, setCertificateFound] = useState(false)
  const [certificateNotFound, setCertificateNotFound] = useState(false)

  const handleSearchCertificate = async (email: string) => {
    setIsLoading(true)
    setCertificateFound(false)
    setCertificateNotFound(false)
    
    // Search for certificate in storage
    const foundCertificate = await findCertificateByEmail(email)
    
    if (foundCertificate) {
      setCertificateData(foundCertificate)
      setCertificateFound(true)
    } else {
      setCertificateNotFound(true)
    }
    
    setIsLoading(false)
  }

  const handleDownload = async (imageData: string) => {
    try {
      // Track download in MongoDB
      if (certificateData?.id) {
        await updateCertificateStatus(certificateData.id, 'download', imageData)
      }

      // Download the certificate
      const link = document.createElement('a')
      link.download = `certificate-${certificateData?.certificateNumber}.png`
      link.href = imageData
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error tracking download:', error)
      // Still allow download even if tracking fails
      const link = document.createElement('a')
      link.download = `certificate-${certificateData?.certificateNumber}.png`
      link.href = imageData
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShareLinkedIn = async (imageData: string) => {
    try {
      // Track share in MongoDB
      if (certificateData?.id) {
        await updateCertificateStatus(certificateData.id, 'share', imageData)
      }

      // Create LinkedIn share URL
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
      window.open(linkedInUrl, '_blank')
    } catch (error) {
      console.error('Error tracking share:', error)
      // Still allow sharing even if tracking fails
      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
      window.open(linkedInUrl, '_blank')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Certificate
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Retrieve your existing certificate using your email address
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {/* <Button
            onClick={() => router.push('/certificates/generate')}
            variant="outline"
            className="bg-transparent border-blue-500 text-blue-200 hover:bg-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Generate Certificate
          </Button> */}
        </motion.div>

        {/* Certificate Portal */}
        <CertificatePortal
          onSearch={handleSearchCertificate}
          isLoading={isLoading}
          certificateFound={certificateFound}
          certificateNotFound={certificateNotFound}
          certificateData={certificateData}
          onDownload={handleDownload}
          onShareLinkedIn={handleShareLinkedIn}
          onCloseModal={() => {
            setCertificateFound(false)
            setCertificateNotFound(false)
          }}
        />
      </div>
    </div>
  )
}
