/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CertificateForm } from '@/components/certificates/certificate-form'
// import { Award } from 'lucide-react'
import { saveCertificate, StoredCertificate } from '@/lib/certificate-storage'

interface CertificateData {
  id?: string
  name: string
  product: string
  email: string
  certificateNumber: string
  date: string
}

export default function CertificateGeneratePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const generateCertificateNumber = (): string => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `NSDC-${timestamp}-${random}`.toUpperCase()
  }

  const handleFormSubmit = async (data: { name: string; product: string; email: string }) => {
    setIsLoading(true)
    
    const certificateData: CertificateData = {
      ...data,
      certificateNumber: generateCertificateNumber(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    
    // Save certificate to storage
    const storedCertificate: StoredCertificate = {
      id: certificateData.certificateNumber,
      ...certificateData
    }
    
    await saveCertificate(storedCertificate)
    
    setIsLoading(false)
    
    // Show success message
    setFormSubmitted(true)
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
          {/* <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-white" />
          </div> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 mt-6 xl:mt-12">
            Fill your details
            </h1>
          {/* <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Fill your details
          </p> */}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {/* <Button
            onClick={() => router.push('/certificates/find')}
            variant="outline"
            className="bg-transparent border-purple-500 text-purple-200 hover:bg-purple-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Find Certificate
          </Button> */}
        </motion.div>

        {/* Main Content */}
        {formSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Attendance Marked Successfully</h2>
              {/* <p className="text-green-200 mb-6">
                Your certificate has been created and saved. You can now search for it using your email address.
              </p> */}
              {/* <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-white font-semibold">Certificate Number:</p>
                <p className="text-green-300 text-lg font-mono">{certificateData?.certificateNumber}</p>
              </div> */}
                  <div className="flex gap-4 justify-center">
                    {/* <Button
                      onClick={() => router.push('/certificates/find')}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    >
                      Find Certificate
                    </Button> */}
                {/*                 <Button
                  onClick={() => {
                    setFormSubmitted(false)
                  }}
                  variant="outline"
                  className="bg-transparent border-green-500 text-green-200 hover:bg-green-500/20"
                >
                  Generate Another
                </Button> */}
              </div>
            </div>
          </motion.div>
        ) : (
          <CertificateForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}
