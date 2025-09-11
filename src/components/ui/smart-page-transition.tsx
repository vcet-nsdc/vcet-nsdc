/**
 * Smart Page Transition Component
 * Automatically applies different transitions based on route patterns
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

// ============================================================================
// TRANSITION CONFIGURATIONS
// ============================================================================

const transitionConfigs = {
  // Home page - smooth fade with slight scale
  '/': {
    variants: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      in: { opacity: 1, scale: 1, y: 0 },
      out: { opacity: 0, scale: 1.05, y: -20 },
    },
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
  
  // Events page - slide from right
  '/events': {
    variants: {
      initial: { x: 300, opacity: 0 },
      in: { x: 0, opacity: 1 },
      out: { x: -300, opacity: 0 },
    },
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  
  // Team page - slide from left
  '/team': {
    variants: {
      initial: { x: -300, opacity: 0 },
      in: { x: 0, opacity: 1 },
      out: { x: 300, opacity: 0 },
    },
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  
  // Contact page - scale up from center
  '/contact': {
    variants: {
      initial: { scale: 0.8, opacity: 0, y: 30 },
      in: { scale: 1, opacity: 1, y: 0 },
      out: { scale: 1.1, opacity: 0, y: -30 },
    },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.6,
    },
  },
  
  // Socials page - fade with rotation
  '/socials': {
    variants: {
      initial: { opacity: 0, rotateY: 90 },
      in: { opacity: 1, rotateY: 0 },
      out: { opacity: 0, rotateY: -90 },
    },
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
  
  // Default transition for other pages
  default: {
    variants: {
      initial: { opacity: 0, y: 20 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -20 },
    },
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};

// ============================================================================
// SMART PAGE TRANSITION COMPONENT
// ============================================================================

interface SmartPageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function SmartPageTransition({ children, className }: SmartPageTransitionProps) {
  const pathname = usePathname();
  
  // Get transition config for current route
  const config = transitionConfigs[pathname as keyof typeof transitionConfigs] || transitionConfigs.default;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={config.variants}
        transition={config.transition}
        className={className}
        style={{
          transformOrigin: 'center',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// ENHANCED PAGE TRANSITION WITH LOADING STATES
// ============================================================================

interface EnhancedPageTransitionProps {
  children: ReactNode;
  className?: string;
  showLoadingState?: boolean;
}

export function EnhancedPageTransition({ 
  children, 
  className,
  showLoadingState = false 
}: EnhancedPageTransitionProps) {
  const pathname = usePathname();
  
  const config = transitionConfigs[pathname as keyof typeof transitionConfigs] || transitionConfigs.default;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={config.variants}
        transition={config.transition}
        className={className}
        style={{
          transformOrigin: 'center',
        }}
      >
        {showLoadingState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// STAGGERED CONTENT TRANSITION
// ============================================================================

const staggerContainer = {
  initial: {},
  in: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  out: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const staggerItem = {
  initial: { y: 20, opacity: 0 },
  in: { y: 0, opacity: 1 },
  out: { y: -20, opacity: 0 },
};

interface StaggeredPageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function StaggeredPageTransition({ children, className }: StaggeredPageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={staggerContainer}
        className={className}
      >
        <motion.div variants={staggerItem}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
