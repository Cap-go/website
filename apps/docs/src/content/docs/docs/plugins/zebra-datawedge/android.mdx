---
title: Android Behavior
description: Understand how the Zebra DataWedge plugin maps to broadcast intents and scan events on Zebra Android devices.
sidebar:
  order: 3
---

## Intent output is required

The plugin listens for scan results through Android broadcasts. Your Zebra DataWedge profile must:

- be associated with your app package
- enable `Intent Output`
- use `Broadcast Intent` delivery
- send scans to the same action you pass into `softScanTrigger()`

If those values do not match, the plugin can still manage profiles and query DataWedge state, but scan events will not reach your Capacitor app.

## Scan events

Subscribe to the Capacitor `scan` listener to receive decoded data:

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.addListener('scan', (event) => {
  console.log(event.data);
  console.log(event.labelType);
  console.log(event.source);
});
```

`softScanTrigger(intentAction)` waits for the next scan broadcast on the action you provide and resolves with that decoded payload.

## Notifications

Use `ZebraNotification.registerForNotification()` when you need native scanner status or profile switch updates:

```typescript
import {
  DataWedgeNotificationType,
  ZebraNotification,
} from '@capgo/capacitor-zebra-datawedge';

await ZebraNotification.registerForNotification({
  notificationType: DataWedgeNotificationType.SCANNER_STATUS,
  callback: (event) => {
    console.log(event.scannerStatus);
  },
});
```

## Production notes

- DataWedge commands require Zebra's `com.symbol.datawedge` package to be present and enabled.
- `softRfidTrigger()` uses the first registered scan intent action. Register one before relying on RFID reads.
- Keep one canonical intent action per scanning flow. That reduces mismatches between the DataWedge profile and your app listeners.

## Keep going from Android Behavior

If you are using **Android Behavior** to plan native plugin work, connect it with [Using @capgo/capacitor-zebra-datawedge](/plugins/capacitor-zebra-datawedge/) for the native capability in Using @capgo/capacitor-zebra-datawedge, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
