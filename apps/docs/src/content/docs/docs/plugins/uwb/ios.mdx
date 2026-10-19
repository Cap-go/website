---
title: iOS Setup
description: Configure Apple Nearby Interaction for UWB peer ranging in Capacitor apps.
sidebar:
  order: 3
---

## iOS native system used

On iOS, this plugin uses **Nearby Interaction** from the `NearbyInteraction` framework.

## Requirements

- iOS 15+
- Physical device with UWB hardware
- Nearby Interaction capability enabled in Xcode

## Xcode setup

1. Open your iOS app target in Xcode.
2. Go to **Signing & Capabilities**.
3. Click **+ Capability** and add **Nearby Interaction**.
4. Add a usage description to `Info.plist`:

```xml
<key>NSNearbyInteractionUsageDescription</key>
<string>This app uses Ultra Wideband to measure distance to nearby devices.</string>
```

## Client flow

```typescript
import { CapacitorUwb } from '@capgo/capacitor-uwb';

const { discoveryToken } = await CapacitorUwb.getDiscoveryToken();

await CapacitorUwb.startPeerSession({
  peerDiscoveryToken: '<peer-token-base64>',
  isCameraAssistanceEnabled: false,
});
```

Share each device's `discoveryToken` with the other peer using your own transport layer. The plugin does not perform discovery or networking for you.

## Events

- `rangingUpdate` emits distance and direction updates when available.
- `sessionStateChanged` emits lifecycle states such as `running`, `suspended`, `invalidated`, and `peerDisconnected`.

## Notes

- `getDiscoveryToken()` and `startPeerSession()` are iOS-only APIs.
- Camera assistance is available on iOS 16+ when supported by the device.
