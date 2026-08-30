import type { GetEventsResponse } from '../types/event.ts';

export const getEvents = async (): Promise<GetEventsResponse> => {
  const response = await fetch('/events');

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  return response.json();
};
