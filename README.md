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

This project uses [EAS Build](https://docs.expo.dev/build/introduction/); `eas.json` is already checked in with a `preview` profile that produces an installable **APK** (and a `production` profile for a Play Store **AAB**):

```bash
npm install -g eas-cli
eas login                                          # one-time, needs an expo.dev account (free)
eas build --platform android --profile preview     # APK for testing/sharing
eas build --platform android --profile production  # AAB for Play Store
```

The first `eas build` also links this project to your Expo account (creates a project id, stored in `app.json` under `extra.eas.projectId` — commit that once it's added).

**Important — a built APK is a snapshot, not a live app.** Code changes made after a build don't appear on an already-installed APK by themselves. Two ways to ship an update:
- **New APK**: re-run `eas build` and reinstall — required for any native-level change (new native dependency, app icon, permissions, `app.json` config).
- **Over-the-air (OTA) update**: for JS/content-only changes (screens, data, styling, logic), set up [EAS Update](https://docs.expo.dev/eas-update/introduction/) (`eas update:configure`, then `eas update` after each change) — installed apps fetch the new JS bundle automatically next time they open, no reinstall needed.

## Before shipping

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
