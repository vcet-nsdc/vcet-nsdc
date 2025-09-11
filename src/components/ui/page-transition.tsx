/**
 * Page Transition Component
 * Handles smooth transitions between pages using Framer Motion
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

// ============================================================================
// TRANSITION VARIANTS
// ============================================================================

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// ============================================================================
// SLIDE TRANSITIONS (for different page types)
// ============================================================================

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const slideTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

// ============================================================================
// FADE TRANSITIONS
// ============================================================================

const fadeVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const fadeTransition = {
  duration: 0.2,
  ease: 'easeInOut',
};

// ============================================================================
// SCALE TRANSITIONS
// ============================================================================

const scaleVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  in: {
    scale: 1,
    opacity: 1,
  },
  out: {
    scale: 1.1,
    opacity: 0,
  },
};

const scaleTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// ============================================================================
// PAGE TRANSITION WRAPPER
// ============================================================================

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// SLIDE TRANSITION WRAPPER
// ============================================================================

interface SlideTransitionProps {
  children: ReactNode;
  direction?: number;
  className?: string;
}

export function SlideTransition({ 
  children, 
  direction = 1, 
  className 
}: SlideTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        custom={direction}
        initial="initial"
        animate="in"
        exit="out"
        variants={slideVariants}
        transition={slideTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// FADE TRANSITION WRAPPER
// ============================================================================

interface FadeTransitionProps {
  children: ReactNode;
  className?: string;
}

export function FadeTransition({ children, className }: FadeTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeVariants}
        transition={fadeTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// SCALE TRANSITION WRAPPER
// ============================================================================

interface ScaleTransitionProps {
  children: ReactNode;
  className?: string;
}

export function ScaleTransition({ children, className }: ScaleTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={scaleVariants}
        transition={scaleTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// CUSTOM TRANSITION WRAPPER
// ============================================================================

interface CustomTransitionProps {
  children: ReactNode;
  variants: any;
  transition?: any;
  className?: string;
}

export function CustomTransition({ 
  children, 
  variants, 
  transition = pageTransition,
  className 
}: CustomTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// STAGGERED CHILDREN TRANSITION
// ============================================================================

const staggerContainer = {
  initial: {},
  in: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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
  initial: {
    y: 20,
    opacity: 0,
  },
  in: {
    y: 0,
    opacity: 1,
  },
  out: {
    y: -20,
    opacity: 0,
  },
};

interface StaggerTransitionProps {
  children: ReactNode;
  className?: string;
}

export function StaggerTransition({ children, className }: StaggerTransitionProps) {
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
