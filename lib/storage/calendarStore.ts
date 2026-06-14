import { getItem, setItem } from "./localStore";
import type { StoredCalendarEvent } from "./types";

const CALENDAR_EVENTS_KEY = "calendar-events";

export function getCalendarEvents(fallback: StoredCalendarEvent[] = []) {
  return sortEvents(getItem<StoredCalendarEvent[]>(CALENDAR_EVENTS_KEY, fallback));
}

export function addCalendarEvent(
  event: Omit<StoredCalendarEvent, "createdAt"> &
    Partial<Pick<StoredCalendarEvent, "createdAt">>,
) {
  const nextEvent: StoredCalendarEvent = {
    ...event,
    createdAt: event.createdAt ?? new Date().toISOString(),
  };
  const nextEvents = sortEvents([...getCalendarEvents(), nextEvent]);

  setItem(CALENDAR_EVENTS_KEY, nextEvents);

  return nextEvent;
}

export function saveCalendarEvents(events: StoredCalendarEvent[]) {
  const nextEvents = sortEvents(events);

  setItem(CALENDAR_EVENTS_KEY, nextEvents);

  return nextEvents;
}

export function removeCalendarEvent(id: string) {
  const nextEvents = getCalendarEvents().filter((event) => event.id !== id);

  setItem(CALENDAR_EVENTS_KEY, nextEvents);

  return nextEvents;
}

export function getEventsByDate(date: string) {
  return getCalendarEvents().filter((event) => event.date === date);
}

function sortEvents(events: StoredCalendarEvent[]) {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }

    return a.time.localeCompare(b.time, "ko");
  });
}
