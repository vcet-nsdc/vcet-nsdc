/**
 * Events data with strong typing and validation
 * Centralized event management for better maintainability
 */

import type { Event } from '@/types';
import pasteventsdata from '../../public/staticdata/pasteventsdata.json';

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
    imagePath: '/assests/image.png',
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
 * Transform past events data from JSON to Event interface
 */
type PastEventJson = {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  about?: string;
  highlights?: string[];
  link?: string;
};

function transformPastEventsData(): Event[] {
  return pasteventsdata.events.map((event: PastEventJson) => {
    const baseEvent = {
      id: event.id,
      title: event.title,
      dateTime: `${event.date} • ${event.time}`,
      venue: 'VCET, Vasai',
      shortDescription: event.description,
      imagePath: '/assests/image.png', // Default image
      overview: event.about || event.description,
      highlights: event.highlights || [],
      awards: [],
      status: 'past' as const,
      category: 'competition' as const, // Default category
    };
    return event.link
      ? { ...baseEvent, link: event.link }
      : baseEvent;
  }) as Event[];
}

/**
 * Get past events (sorted by date, most recent first)
 */
export function getPastEvents(): Event[] {
  const pastEventsFromData = [...getEventsByStatus('past')];
  const pastEventsFromJSON = transformPastEventsData();
  
  return [...pastEventsFromData, ...pastEventsFromJSON].sort((a: Event, b: Event) => 
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
