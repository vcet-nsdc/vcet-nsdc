/**
 * Events data with strong typing and validation
 * Centralized event management for better maintainability
 */

import type { Event } from '@/types';

// ============================================================================
// EVENT DATA
// ============================================================================

export const events: readonly Event[] = [
  {
    id: 'code-o-fiesta-2025',
    title: 'Code‑o‑Fiesta',
    dateTime: 'September 13, 2025 • 9:30 AM',
    venue: 'VCET, Vasai',
    shortDescription: 'A coding competition where participants build real-world software solutions and present them to judges.',
    imagePath: '/components/events/upcoming/event-img.png',
    overview: 'Code-o-Fiesta is a dynamic coding event designed to challenge and enhance participants\' problem-solving abilities while applying their skills to real-life scenarios. Prior to the event, teams receive problem statements focused on developing innovative software or product solutions with practical applications. On the event day, participants showcase their completed projects to a panel of judges, making this competition both a test of technical expertise and a platform for meaningful innovation.',
    highlights: [
      'Pre-event problem statements focusing on real-world challenges.',
      'Teams build complete software/products before the event day.',
      'Initial Presentation Round: Teams present their developed products to judges.',
      'Evaluation Round: Judges assess solutions on functionality, creativity, execution, and relevance.',
      'A platform to apply coding skills beyond theory, fostering innovation and teamwork.',
    ],
    awards: [
      'Prizes and recognition for top-performing teams.',
      'Certificates for participants and winners.',
      'Potential opportunities for projects to gain further mentorship or exposure.',
    ],
    status: 'upcoming',
    category: 'competition',
  },
  {
    id: 'techx-product-showcase-2025',
    title: 'TechX Product Showcase 2025',
    dateTime: 'September 19, 2025 • 10:00 AM',
    venue: 'Labs 114 & 115, VCET, Vasai',
    shortDescription: 'A one-day product showcase highlighting cutting-edge technologies, bridging academic learning with industry exposure.',
    imagePath: '/components/events/upcoming/event-img.png',
    overview: 'TechX 2025 was a one-day Product Showcase event organized by the Department of Artificial Intelligence and Data Science at VCET on September 19, 2025. Guided by faculty coordinators Prof. Sejal Dmello, Prof. Bhavika Gharat, and Prof. Neha Raut, the event aimed to bridge academic learning with industry exposure.\n\nThe event brought together 35 students across 17 teams to exhibit projects infused with technical ingenuity and creative flair. Inaugurated by Principal Mr. Harish Vankudre and Dean of Academic Affairs Mr. Vikas Gupta, TechX emphasized the institution\'s commitment to innovation and collaboration. Industry partners like Edba Academy, Tech Cryptors, and DataMango showcased products including advanced drones, high-performance GPUs, and blockchain-based tools.\n\nThrough hands-on engagement, students enhanced their technical expertise, presentation skills, and professional communication, while also fostering holistic personal and professional growth.',
    highlights: [
      'Organized by the Department of Artificial Intelligence and Data Science, VCET.',
      'Featured 17 student teams showcasing innovative projects.',
      'Industry participation from Edba Academy, Tech Cryptors, DataMango, Zaplet, VM Protect, and Cosmic Spirit.',
      'Products included the DJI AIR3S drone, RTX 3090/3080 graphics cards, blockchain-based tools, and wireless video systems.',
      'Focused on enhancing technical, presentation, and communication skills through real-world exposure.',
    ],
    awards: [
      'Recognition for outstanding projects and presentations.',
      'Certificates of participation for all student teams.',
      'Special mention for innovative and industry-relevant solutions.',
    ],
    status: 'upcoming',
    category: 'showcase',
  },
] as const;

// ============================================================================
// EVENT UTILITIES
// ============================================================================

/**
 * Get events by status
 */
export function getEventsByStatus(status: Event['status']): readonly Event[] {
  return events.filter(event => event.status === status);
}

/**
 * Get events by category
 */
export function getEventsByCategory(category: Event['category']): readonly Event[] {
  return events.filter(event => event.category === category);
}

/**
 * Get event by ID
 */
export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

/**
 * Get upcoming events (sorted by date)
 */
export function getUpcomingEvents(): Event[] {
  return [...getEventsByStatus('upcoming')].sort((a: Event, b: Event) => 
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
}

/**
 * Get past events (sorted by date, most recent first)
 */
export function getPastEvents(): Event[] {
  return [...getEventsByStatus('past')].sort((a: Event, b: Event) => 
    new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );
}

/**
 * Get ongoing events
 */
export function getOngoingEvents(): readonly Event[] {
  return getEventsByStatus('ongoing');
}

// ============================================================================
// EVENT STATISTICS
// ============================================================================

export const eventStats = {
  total: events.length,
  upcoming: getEventsByStatus('upcoming').length,
  ongoing: getEventsByStatus('ongoing').length,
  past: getEventsByStatus('past').length,
  competitions: getEventsByCategory('competition').length,
  workshops: getEventsByCategory('workshop').length,
  showcases: getEventsByCategory('showcase').length,
  meetings: getEventsByCategory('meeting').length,
} as const;
