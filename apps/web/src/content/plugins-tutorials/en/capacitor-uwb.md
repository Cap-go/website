---
locale: en
---
# Using @capgo/capacitor-uwb

Capacitor plugin for Ultra-Wideband (UWB) ranging on iOS and Android.

## Install

```bash
bun add @capgo/capacitor-uwb
bunx cap sync
```

## What This Plugin Exposes

- `isAvailable` - Check whether UWB is supported and currently available.
- `getDiscoveryToken` - Get the local Nearby Interaction discovery token on iOS.
- `startPeerSession` - Start an iOS peer ranging session.
- `startControllerSession` - Start an Android controller session and return shareable parameters.
- `startControleeSession` - Start an Android controlee session from controller parameters.
- `stopSession` - Stop the active ranging session.

## Example Usage

### Check availability

```typescript
import { CapacitorUwb } from '@capgo/capacitor-uwb';

const availability = await CapacitorUwb.isAvailable();
```

### iOS peer ranging

```typescript
const { discoveryToken } = await CapacitorUwb.getDiscoveryToken();

await CapacitorUwb.startPeerSession({
  peerDiscoveryToken: '<peer-token-base64>',
});
```

### Android controller / controlee

```typescript
const controller = await CapacitorUwb.startControllerSession();

await CapacitorUwb.startControleeSession({
  rangingParameters: controller.rangingParameters,
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-uwb/
- Docs: /docs/plugins/uwb/

## Keep going from Using @capgo/capacitor-uwb

If you are using **Using @capgo/capacitor-uwb** to plan native plugin work, connect it with [@capgo/capacitor-uwb](/docs/plugins/uwb/) for the implementation detail in @capgo/capacitor-uwb, [Getting Started](/docs/plugins/uwb/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
