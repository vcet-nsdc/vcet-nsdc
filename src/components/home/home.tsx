import React from 'react'
import HeroSection from './Herosection'
import { AboutSection } from '@/components/sections/about-section'
import { StatsSection } from '@/components/sections/stats-section'
import { HighlightsSection } from '@/components/sections/highlights-section'
import { QuickLinksSection } from '@/components/sections/quick-links-section'
import { CTASection } from '@/components/sections/cta-section'

const home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <HighlightsSection />
      <QuickLinksSection />
      <CTASection />
    </div>
  )
}

export default home