/**
 * Stats Section Component
 * Display key statistics about the organization
 */

'use client';

import { motion } from 'framer-motion';
import { STATS } from '@/lib/constants';

export function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1
    }
  }

  const counterVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1
    }
  }
  return (
    <motion.section 
      className="max-w-6xl mx-auto px-6 pb-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
    >
      <motion.div 
        className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur px-6 md:px-10 py-6 shadow-lg"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.ul 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center"
          variants={containerVariants}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          <motion.li 
            className="space-y-1"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="text-4xl md:text-5xl font-extrabold text-purple-400"
              variants={counterVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {STATS.teamMembers}+
            </motion.div>
            <motion.div 
              className="text-sm text-white/70"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Team Members
            </motion.div>
          </motion.li>
          <motion.li 
            className="space-y-1"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="text-4xl md:text-5xl font-extrabold text-purple-400"
              variants={counterVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {STATS.events}+
            </motion.div>
            <motion.div 
              className="text-sm text-white/70"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Events
            </motion.div>
          </motion.li>
          <motion.li 
            className="space-y-1"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="text-4xl md:text-5xl font-extrabold text-purple-400"
              variants={counterVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {STATS.participants}+
            </motion.div>
            <motion.div 
              className="text-sm text-white/70"
              variants={itemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Participants
            </motion.div>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.section>
  );
}
