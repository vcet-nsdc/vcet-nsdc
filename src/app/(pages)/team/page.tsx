/**
 * Team Page
 * Display team members with proper organization
 */

import { Suspense } from 'react';
import { Metadata } from 'next';
import { TeamList } from '@/components/team/team-list';
import { SkeletonTeamCard } from '@/components/ui/loading';

// ============================================================================
// METADATA
// ============================================================================

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the dedicated team members behind NSDC VCET',
  openGraph: {
    title: 'Team | NSDC VCET',
    description: 'Meet the dedicated team members behind NSDC VCET',
    type: 'website',
  },
};

// ============================================================================
// TEAM PAGE COMPONENT
// ============================================================================

export default function TeamPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            The passionate individuals driving innovation in AI and Data Science at VCET
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonTeamCard />
              <SkeletonTeamCard />
              <SkeletonTeamCard />
            </div>
          }
        >
          <TeamList />
        </Suspense>
      </div>
    </main>
  );
}