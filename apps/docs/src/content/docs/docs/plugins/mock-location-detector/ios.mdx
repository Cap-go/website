---
title: iOS Setup
description: Configure location permissions and optional spoof-app URL scheme probes on iOS.
sidebar:
  order: 3
---

## Requirements

- iOS 15+ for `CLLocationSourceInformation.isSimulatedBySoftware`
- Location permission in your host app
- Physical device recommended for realistic GPS sampling

## Info.plist

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We verify your location has not been spoofed.</string>
```

Optional URL schemes for companion spoof apps you want to detect with `canOpenURL`:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>anyto</string>
  <string>imyfone-anyto</string>
  <string>igo</string>
  <string>igomarkto</string>
  <string>fakegps</string>
  <string>mockgps</string>
  <string>pokeep</string>
</array>
```

You can also pass extra schemes at runtime through `additionalMockAppUrlSchemes`.

## Developer Mode Reality Check

Apple does not provide a public API to read the iOS Developer Mode toggle. This plugin uses indirect heuristics such as debugger attachment and development provisioning indicators. Treat them as risk signals, not proof.

Tools like iMyFone AnyTo often rely on Developer Mode and companion apps distributed outside the App Store. Combine native checks with server-side fraud rules.

## Example

```typescript
import { MockLocationDetector } from '@capgo/capacitor-mock-location-detector';

const result = await MockLocationDetector.analyze({
  requestLocationSample: true,
  additionalMockAppUrlSchemes: ['anyto', 'pokeep'],
});
```
