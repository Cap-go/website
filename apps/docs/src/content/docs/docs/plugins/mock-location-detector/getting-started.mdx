---
title: Getting Started
description: "Install @capgo/capacitor-mock-location-detector and run layered GPS spoofing checks."
sidebar:
  order: 2
---

## Install

```bash
bun add @capgo/capacitor-mock-location-detector
bunx cap sync
```

## Import

```typescript
import { MockLocationDetector } from '@capgo/capacitor-mock-location-detector';
```

## Recommended Flow

```typescript
const result = await MockLocationDetector.analyze({
  requestLocationSample: true,
  minDetectedChecks: 1,
});

if (result.isSimulated) {
  console.warn('Possible GPS spoofing detected', result.riskScore, result.checks);
}
```

## Run One Check

```typescript
const mockFlag = await MockLocationDetector.runCheck({
  check: 'system_mock_flag',
});
```

## Monitor Continuously

```typescript
await MockLocationDetector.addListener('locationIntegrityChanged', (event) => {
  console.log('Integrity changed', event.confidence, event.checks);
});

await MockLocationDetector.startMonitoring({ intervalMs: 30000 });
```

## Guide Users To Settings

Apps cannot disable developer mode or mock location automatically. Open settings instead:

```typescript
await MockLocationDetector.openDeveloperSettings();
```

## Platform Setup

- iOS: [iOS setup](/docs/plugins/mock-location-detector/ios/)
- Android: [Android setup](/docs/plugins/mock-location-detector/android/)

## Source Of Truth

This page follows the plugin's `src/definitions.ts`. Re-run docgen upstream when the public API changes.
