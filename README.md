# Explosher

AI-powered kosher travel app — plan, browse, and manage tailor-made kosher culinary tours. Built with [Expo](https://expo.dev) (React Native + TypeScript), targeting Android (and iOS).

## Screens

- **Home** — personalized greeting, AI travel promo, featured destinations carousel, stats, CTA banner.
- **My Tours** — Upcoming / Active / Completed tabs with tour cards.
- **Tour Detail** — hero image, trip info, overview, advisor notes, and a day-by-day expandable itinerary with kosher-certification badges.
- **Map** — map view with a pin per tour destination, plus a linked list of tours below.
- **Contact** — WhatsApp deep-link composer, phone/availability info, quick-message chips.
- **Profile** — account details and app info.

All content currently comes from local mock data in `src/data/` (destinations, tours, user, contact info) — swap these for real API calls when a backend is ready.

## Running on Android

```bash
npm install
npm run android   # opens in an Android emulator or connected device via Expo
```

Or scan the QR code from `npm start` in the **Expo Go** app on a physical Android phone.

### Building a real Android app (APK/AAB)

This project uses [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview   # APK for testing
eas build --platform android --profile production # AAB for Play Store
```

## Before shipping

- **Branding assets**: `assets/icon.png`, `assets/splash-icon.png`, `assets/android-icon-*.png`, and `assets/favicon.png` are currently Expo's default placeholders. Replace them with the real Explosher logo (the circular globe-and-food-icons mark) at the recommended Expo sizes.
- **Google Maps API key**: the Map screen uses `react-native-maps`, which needs a Google Maps API key for Android in production. Add it to `app.json` under `expo.android.config.googleMaps.apiKey`.
- **Backend**: hook up real destinations/tours/profile data and the WhatsApp/phone contact numbers to your production values in `src/data/`.

## Project structure

```
src/
  components/   Reusable UI (cards, itinerary accordion, star rating)
  data/         Mock data (destinations, tours, user, contact info)
  navigation/   Bottom tabs + per-tab stacks
  screens/      One file per screen
  theme/        Colors, spacing, typography tokens
  types/        Shared TypeScript types
  utils/        Small helpers (date formatting)
```
