# Explosher

AI-powered kosher travel app — plan, browse, and manage tailor-made kosher culinary tours. Built with [Expo](https://expo.dev) (React Native + TypeScript), targeting Android (and iOS).

## Screens

- **Home** — personalized greeting, AI travel promo, featured destinations carousel, stats, CTA banner.
- **My Tours** — Upcoming / Active / Completed tabs with tour cards.
- **Tour Detail** — hero image, trip info, overview, advisor notes, and a day-by-day expandable itinerary with kosher-certification badges.
- **Map** — free map (Leaflet + OpenStreetMap, no API key or billing account) with a pin per tour destination, plus a linked list of tours below.
- **Contact** — WhatsApp deep-link composer, phone/availability info, quick-message chips.
- **Profile** — account details, sign out, app info.
- **Login** — sign in / sign up gate shown before the app, with a "Continue with Google" placeholder.

All content currently comes from local mock data in `src/data/` (destinations, tours, user, contact info) — swap these for real API calls when a backend is ready. Tour itineraries (Athens & Prague) are built from real kosher-certified venues — see **Tour data** below.

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

The first `eas build` also links this project to your Expo account (creates a project id, stored in `app.json` under `extra.eas.projectId` — commit that once it's added). This project is linked to the `mo9909s-team` account, project id `1a0a4ce2-458a-4fce-b055-ec7dd1fdc55e`.

**Important — a built APK is a snapshot, not a live app.** Code changes made after a build don't appear on an already-installed APK by themselves. Two ways to ship an update:
- **New APK**: re-run `eas build` and reinstall — required for any native-level change (new native dependency, app icon, permissions, `app.json` config).
- **Over-the-air (OTA) update**: for JS/content-only changes (screens, data, styling, logic) — see below.

### Pushing OTA updates (EAS Update)

`expo-updates` is installed and configured (`app.json`'s `updates.url` + `runtimeVersion`, and each `eas.json` build profile has a matching `channel`). This means:

- **Any APK built from now on** (via `eas build --profile preview`, etc.) can receive JS-only updates without reinstalling.
- **Builds made before this config was added do not** have update capability baked in — if your first APK was built before this, build one more APK; every build after that supports OTA.

To push an update after a JS/content-only change:

```bash
eas update --channel preview --message "Describe what changed"
```

Installed apps built with a matching channel fetch the new JS bundle automatically the next time they're opened (usually applied on the *next* app restart after that, not instantly mid-session). Use `--channel production` for the production build channel.

Bump `expo.version` in `app.json` whenever you make a **native** change (new native dependency, permission, icon) even if you also build a new APK — since `runtimeVersion` is tied to that version, this keeps EAS Update from ever serving a JS bundle to an APK whose native code doesn't match it.

## Before shipping

- **Backend**: hook up real destinations/tours/profile data and the WhatsApp/phone contact numbers to your production values in `src/data/`.

## Map (free, no API key)

The Map screen renders `react-native-webview` loading Leaflet + OpenStreetMap tiles — no Google Maps API key, no billing account, nothing to configure. (Google Maps Platform does give a monthly free credit, but requires a credit card on file even to use it; this avoids that entirely, and it's also what the app's original web version used.) `src/components/LeafletMap.tsx` builds the HTML/JS; `MapScreen.tsx` (native) uses it, `MapScreen.web.tsx` keeps the destination-list fallback for web builds.

## Login (mock only — read before relying on it)

`src/context/AuthContext.tsx` gates the app behind `LoginScreen`. **This is not real authentication yet**: it accepts any non-empty email/password, stores a session flag on-device (AsyncStorage), and does not verify identity or paying-user status against any server. "Continue with Google" is a placeholder (shows a "coming soon" alert). Anyone with the app can create a "session" by typing anything into the form.

To make this real and actually restrict the app to paying Explosher users, wire up a real backend — Firebase Auth is the natural fit (free tier, handles email/password + Google sign-in). That requires:
1. A Firebase project (you create it, free) — give me its config.
2. For Google sign-in specifically: registering this app's Android package name (`com.explosher.app`) and SHA-1 signing fingerprint in the Firebase/Google Cloud console.
3. Some way to mark a user as "paying" (a Firestore field, a subscription check via RevenueCat, etc.) — worth deciding based on how you actually sell access.

Ask any time you're ready to do this and have a Firebase project — it's a native-level change, so it'll need a fresh APK build (not just an OTA update) once wired up.

## Tour data (real venues)

Athens and Prague itineraries are built from real, verified kosher venue lists (restaurant name, cuisine, address, kosher certification, price range — see `src/data/restaurants.ts`). Only genuinely kosher-certified venues (`glatt` or `supervised` in `src/types/index.ts`'s `KosherLevel`) are used for meal stops — vegetarian/vegan-only or uncertified venues from the source lists are intentionally excluded from meals, since "vegetarian" is not a substitute for kosher supervision. Sightseeing stops (Acropolis, Prague Castle, Jewish Quarter sites, day trips, etc.) are real, well-known landmarks in each city. Update `src/data/tours.ts` / `restaurants.ts` directly, or swap for a real backend later.

## Project structure

```
src/
  components/   Reusable UI (cards, itinerary accordion, star rating, Leaflet map)
  context/      AuthContext (mock login/session gate)
  data/         Content data (destinations, tours, restaurants, user, contact info)
  navigation/   Bottom tabs + per-tab stacks
  screens/      One file per screen
  theme/        Colors, spacing, typography tokens
  types/        Shared TypeScript types
  utils/        Small helpers (date formatting)
```
