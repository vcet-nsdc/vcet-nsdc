/**
 * Team Page
 * Display team members with proper organization
 */

import { Metadata } from 'next';
import Teams from '@/components/team/Teams';

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
    <main className="min-h-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Teams />
      </div>
    </main>
  );
}
