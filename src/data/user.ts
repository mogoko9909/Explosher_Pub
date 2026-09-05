import { UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: 'Menachem Gold',
  email: 'mogoko9909@gmail.com',
  role: 'User',
};

export const stats = [
  { id: 'destinations', label: 'Destinations', value: '25+', icon: 'globe-outline', color: '#0F1B3D' },
  { id: 'venues', label: 'Kosher Venues', value: '500+', icon: 'restaurant-outline', color: '#F5811F' },
  { id: 'tours', label: 'Tours Created', value: '1.2K', icon: 'airplane-outline', color: '#D6303C' },
  { id: 'years', label: 'Years Active', value: '5+', icon: 'calendar-outline', color: '#0F1B3D' },
] as const;

export const contactInfo = {
  phone: '+972-50-569-0881',
  availability: 'Sun – Fri, 9:00 – 18:00 (IST)',
  quickMessages: [
    "I'd like to plan a new tour",
    'I have a question about my tour',
    'I need help with Shabbat arrangements',
    'Can you recommend a kosher destination?',
  ],
};
