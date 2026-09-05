export type Destination = {
  id: string;
  city: string;
  country: string;
  rating: number;
  description: string;
  image: string;
};

export type ItineraryStopType = 'sight' | 'food' | 'hotel' | 'transport';

export type ItineraryStop = {
  id: string;
  time: string;
  title: string;
  location: string;
  type: ItineraryStopType;
  note?: string;
  kosherBadge?: string;
  tag?: string;
};

export type ItineraryDay = {
  id: string;
  dayNumber: number;
  title: string;
  date: string;
  stops: ItineraryStop[];
};

export type TourStatus = 'upcoming' | 'active' | 'completed';

export type Tour = {
  id: string;
  title: string;
  city: string;
  country: string;
  status: TourStatus;
  image: string;
  startDate: string;
  endDate: string;
  travelers: number;
  overview: string;
  advisorNote: string;
  coordinates: { latitude: number; longitude: number };
  itinerary: ItineraryDay[];
};

export type UserProfile = {
  name: string;
  email: string;
  role: string;
};
