import { events } from "@/data/events";
import { EventItem } from "@/types/events";

const now = () => new Date();

export const isOngoing = (e: EventItem) => {
  const start = new Date(e.dateStart);
  const end = new Date(e.dateEnd ?? e.dateStart);
  const t = now();
  return t >= start && t <= end;
};

export const isUpcoming = (e: EventItem) => new Date(e.dateStart) > now();
export const isPast = (e: EventItem) => new Date(e.dateEnd ?? e.dateStart) < now();

export const getUpcomingEvents = (): EventItem[] =>
  events
    .filter(isUpcoming)
    .sort((a, b) => +new Date(a.dateStart) - +new Date(b.dateStart));

export const getOngoingEvents = (): EventItem[] =>
  events.filter(isOngoing);

export const getPastEvents = (): EventItem[] =>
  events
    .filter(isPast)
    .sort((a, b) => +new Date(b.dateStart) - +new Date(a.dateStart));
