---
title: Android Setup
description: Configure runtime location permissions and interpret Android mock-location checks.
sidebar:
  order: 4
---

## Requirements

- Android 7+ (API 24) baseline from the plugin
- Runtime `ACCESS_FINE_LOCATION` or `ACCESS_COARSE_LOCATION` in your host app
- Google Play policy review if you block users solely based on developer options

## Permissions

The plugin merges coarse/fine location permissions into your app manifest. Request them at runtime before calling `analyze()`.

## What Android Checks Cover

- `Location.isMock` / legacy mock provider flags
- Developer options and USB debugging state
- Installed packages such as `com.imyfone.anytoandroid`
- Legacy mock-location permission holders on older Android versions
- Emulator fingerprints and impossible movement heuristics

## Open Developer Settings

```typescript
await MockLocationDetector.openDeveloperSettings();
```

This opens development settings when available. Apps cannot change the values for the user.

## Example

```typescript
import { MockLocationDetector } from '@capgo/capacitor-mock-location-detector';

const result = await MockLocationDetector.analyze({
  requestLocationSample: true,
  additionalMockAppPackages: ['com.example.internal.mockgps'],
});
```
