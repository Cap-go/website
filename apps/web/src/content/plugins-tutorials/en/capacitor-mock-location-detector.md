---
locale: en
---
# Using @capgo/capacitor-mock-location-detector

Detect simulated GPS locations using layered, App Store-safe checks on iOS and Android.

## Install

```bash
bun add @capgo/capacitor-mock-location-detector
bunx cap sync
```

## What This Plugin Exposes

- `analyze` - Run all available checks and return a scored composite result.
- `runCheck` - Execute one named detection layer.
- `getCapabilities` - Discover supported checks on the current platform.
- `startMonitoring` / `stopMonitoring` - Periodic analysis with events.
- `openDeveloperSettings` - Guide users to disable developer or mock tooling.

## Example Usage

```typescript
import { MockLocationDetector } from '@capgo/capacitor-mock-location-detector';

const result = await MockLocationDetector.analyze({
  requestLocationSample: true,
  minDetectedChecks: 1,
});

if (result.isSimulated) {
  console.warn('Possible GPS spoofing detected', result.checks);
}

await MockLocationDetector.openDeveloperSettings();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-mock-location-detector/
- Docs: /docs/plugins/mock-location-detector/
