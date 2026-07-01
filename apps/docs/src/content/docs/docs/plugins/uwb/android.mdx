---
title: Android Setup
description: Configure Jetpack UWB controller and controlee sessions in Capacitor apps.
sidebar:
  order: 4
---

## Android native system used

On Android, this plugin uses **Jetpack UWB** from `androidx.core.uwb`.

## Requirements

- Android 12+
- Device with UWB hardware
- UWB enabled in system settings

## Manifest and permissions

The plugin declares:

```xml
<uses-permission android:name="android.permission.UWB_RANGING" />
<uses-feature android:name="android.hardware.uwb" android:required="false" />
```

No additional manifest changes are required in most apps.

## Controller flow

```typescript
import { CapacitorUwb } from '@capgo/capacitor-uwb';

const controller = await CapacitorUwb.startControllerSession();

// Share controller.rangingParameters and controller.localAddress out-of-band
```

If you already know the controlee address, pass it when starting the controller session:

```typescript
await CapacitorUwb.startControllerSession({
  peerAddress: '<controlee-address-base64>',
});
```

## Controlee flow

```typescript
await CapacitorUwb.startControleeSession({
  rangingParameters: {
    sessionId: 12345,
    sessionKeyInfo: '<base64>',
    complexChannel: { channel: 9, preambleIndex: 10 },
    peerAddress: '<controller-address-base64>',
  },
});
```

## Events

- `rangingUpdate` emits distance and angle measurements when available.
- `sessionStateChanged` emits lifecycle states such as `running`, `invalidated`, and `peerDisconnected`.

## Notes

- `startControllerSession()` and `startControleeSession()` are Android-only APIs.
- The plugin does not provide BLE or backend transport for exchanging ranging parameters.
