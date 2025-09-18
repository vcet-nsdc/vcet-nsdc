"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Award, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Certificate() {
  const router = useRouter()
  
  // Time-based access control
  const [accessMode, setAccessMode] = useState<'form' | 'search' | 'both'>('form')

  // Check current time and set access mode
  useEffect(() => {
    const checkAccessMode = () => {
      const now = new Date()
      const currentHour = now.getHours()
      
      // Morning: 6 AM - 12 PM (form only)
      if (currentHour >= 6 && currentHour < 12) {
        setAccessMode('form')
      }
      // Afternoon: 12 PM - 6 PM (search only)
      else if (currentHour >= 12 && currentHour < 18) {
        setAccessMode('search')
      }
      // Evening: 6 PM - 6 AM (both available)
      else {
        setAccessMode('both')
      }
    }

    checkAccessMode()
    // Check every minute
    const interval = setInterval(checkAccessMode, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Certificate Portal
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Generate your personalized certificates or retrieve existing ones
          </p>
        </motion.div>


        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-r from-indigo-800/30 to-purple-800/30 backdrop-blur-sm rounded-2xl p-6 border border-indigo-500/30 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4 text-center">How it works</h2>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Generate Certificate</h3>
                <p className="text-purple-200 text-sm">Fill out the form to create your certificate</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Search & Download</h3>
                <p className="text-blue-200 text-sm">Use your email to find and download your certificate</p>
              </div>
            </div>
          </motion.div>

          {/* Access Mode Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-r from-amber-800/30 to-orange-800/30 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/30 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">
                  {accessMode === 'form' && '📝 Certificate Generation Open'}
                  {accessMode === 'search' && '🔍 Certificate Search Open'}
                  {accessMode === 'both' && '✅ All Features Available'}
                </span>
              </div>
              
              {/* Admin Controls - Only visible in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-transparent border-white/30 text-white hover:bg-white/10"
                    onClick={() => setAccessMode('form')}
                  >
                    Form Only
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-transparent border-white/30 text-white hover:bg-white/10"
                    onClick={() => setAccessMode('search')}
                  >
                    Search Only
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-transparent border-white/30 text-white hover:bg-white/10"
                    onClick={() => setAccessMode('both')}
                  >
                    Both
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Cards */}
          <div className={`grid gap-8 ${accessMode === 'both' ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
            {/* Generate Certificate Card - Show only when form access is allowed */}
            {(accessMode === 'form' || accessMode === 'both') && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-800/30 to-fuchsia-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 cursor-pointer"
                onClick={() => router.push('/certificates/generate')}
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Step 1: Generate Certificate</h3>
                  <p className="text-purple-200 mb-6">
                    Create a new certificate by providing your details
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white">
                    Create Certificate
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Get Certificate Card - Show only when search access is allowed */}
            {(accessMode === 'search' || accessMode === 'both') && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-800/30 to-cyan-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 cursor-pointer"
                onClick={() => router.push('/certificates/search')}
              >
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Step 2: Get Certificate</h3>
                  <p className="text-blue-200 mb-6">
                    Retrieve your existing certificate using your email
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Find Certificate
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}