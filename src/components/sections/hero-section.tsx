/**
 * Hero Section Component
 * Main hero section with animations and call-to-action
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <Image
            src="https://ik.imagekit.io/nsdc2025vcet/white%20NSDC%20logo%20(1).png?updatedAt=1757382190110"
            alt="NSDC VCET Logo"
            width={200}
            height={200}
            className="mx-auto mb-4"
            priority
          />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          className="mb-6 w-full"
        >
          <h1 className="text-4xl md:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="text-balance">Artificial Intelligence & Data Science&apos;s</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              National Student Data Corps
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed text-pretty"
        >
          VCET&apos;s first Student Chapter for Data Visualization and Machine Learning
          <br />
          from the brand new branch of Artificial Intelligence & Data Science
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-purple-400 text-lg italic mb-12 font-medium"
        >
          &quot;Data beats emotions.&quot;
        </motion.blockquote>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex justify-center"
        >
          <Button className="flex items-center justify-center gap-2">
            <span>About Us</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
