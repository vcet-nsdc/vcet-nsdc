"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { User, Package, Mail, Award } from 'lucide-react'

interface CertificateFormData {
  name: string
  product: string
  email: string
}

interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => void
  isLoading?: boolean
}

export function CertificateForm({ onSubmit, isLoading = false }: CertificateFormProps) {
  const [formData, setFormData] = useState<CertificateFormData>({
    name: '',
    product: '',
    email: ''
  })

  const [errors, setErrors] = useState<Partial<CertificateFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<CertificateFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.product.trim()) {
      newErrors.product = 'Product name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof CertificateFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-br from-purple-900/20 to-fuchsia-900/20 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          {/* <CardTitle className="text-2xl font-bold text-white">Generate Certificate</CardTitle> */}
          <CardDescription className="text-purple-200">
            Fill in your details to mark Attendance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`bg-purple-900/30 border-purple-500/50 text-white placeholder-purple-300 focus:border-purple-400 ${
                  errors.name ? 'border-red-500' : ''
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product" className="text-purple-200 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Product Name
              </Label>
              <Input
                id="product"
                type="text"
                placeholder="Enter product name"
                value={formData.product}
                onChange={(e) => handleInputChange('product', e.target.value)}
                className={`bg-purple-900/30 border-purple-500/50 text-white placeholder-purple-300 focus:border-purple-400 ${
                  errors.product ? 'border-red-500' : ''
                }`}
                disabled={isLoading}
              />
              {errors.product && (
                <p className="text-red-400 text-sm">{errors.product}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`bg-purple-900/30 border-purple-500/50 text-white placeholder-purple-300 focus:border-purple-400 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Certificate...
                </div>
              ) : (
                'Generate Certificate'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

