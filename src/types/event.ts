export interface AvailableTicket {
  id: number;
  event_id: number;
  status: string;
  type: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  availableTickets: AvailableTicket[];
}

export type GetEventsResponse = Event[];
