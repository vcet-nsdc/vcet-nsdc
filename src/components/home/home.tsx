/**
 * Home Page
 * Main landing page with hero section and key information
 */

import { Suspense } from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { StatsSection } from '@/components/sections/stats-section';
import { HighlightsSection } from '@/components/sections/highlights-section';
import { QuickLinksSection } from '@/components/sections/quick-links-section';
import { CTASection } from '@/components/sections/cta-section';
import { APP_CONFIG } from '@/lib/constants';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Home',
  description: APP_CONFIG.description,
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: 'website',
  },
};

// ============================================================================
// HOME PAGE COMPONENT
// ============================================================================

export default function HomePage() {
  return (
    <main className="min-h-full">
      {/* Hero Section */}
      <Suspense fallback={<div className="h-screen" />}>
        <HeroSection />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<div className="h-96" />}>
        <AboutSection />
      </Suspense>

      {/* Stats Section */}
      <Suspense fallback={<div className="h-32" />}>
        <StatsSection />
      </Suspense>

      {/* Highlights Section */}
      <Suspense fallback={<div className="h-96" />}>
        <HighlightsSection />
      </Suspense>

      {/* Quick Links Section */}
      <Suspense fallback={<div className="h-96" />}>
        <QuickLinksSection />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<div className="h-64" />}>
        <CTASection />
      </Suspense>


    </main>
  );
}
