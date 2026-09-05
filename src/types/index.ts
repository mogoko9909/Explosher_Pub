export type Destination = {
  id: string;
  city: string;
  country: string;
  rating: number;
  description: string;
  image: string;
};

export type ItineraryStopType = 'sight' | 'food' | 'hotel' | 'transport';

// Only 'glatt' and 'supervised' are genuinely kosher-certified. A food stop
// in an itinerary should never use anything else — vegetarian/vegan menus
// are not a substitute for supervision.
export type KosherLevel = 'glatt' | 'supervised';

export type ItineraryStop = {
  id: string;
  time: string;
  title: string;
  location: string;
  type: ItineraryStopType;
  note?: string;
  kosherLevel?: KosherLevel;
  kosherAuthority?: string;
  priceRange?: string;
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
