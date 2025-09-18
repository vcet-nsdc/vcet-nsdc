/**
 * Events List Component
 * Server component that displays all events
 */

import { getUpcomingEvents } from '@/data/events';
import EventCard from './upcoming/EventCard';

export async function EventsList() {
  const events = getUpcomingEvents();

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
        <p className="text-white/70">Check back later for upcoming events!</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 relative z-10">
      <div className="absolute  text-white text-3xl font-bold z-10" style={{ fontFamily: 'Dosis, sans-serif' }}>
        Upcoming Event
      </div>
      {events.map((event) => (
        <EventCard 
          key={event.id}
          title={event.title}
          dateTime={event.dateTime}
          venue={event.venue}
          shortDescription={event.shortDescription}
          imagePath={event.imagePath}
          overview={event.overview}
          highlights={[...event.highlights]}
          awards={[...event.awards]}
        />
      ))}
    </div>
  );
}
