---
locale: en
---
# Using @capgo/capacitor-android-kiosk

Capacitor Android Kiosk Plugin for controlling kiosk mode and launcher functionality. This plugin is Android-only. For iOS kiosk mode, use the device's Guided Access feature.

## Install

```bash
bun add @capgo/capacitor-android-kiosk
bunx cap sync
```

## What This Plugin Exposes

- `isInKioskMode` - Checks if the app is currently running in kiosk mode.
- `isSetAsLauncher` - Checks if the app is set as the device launcher (home app).
- `enterKioskMode` - Enters kiosk mode, hiding system UI and blocking hardware buttons. Also starts a foreground keep-alive service so the app is less likely to be killed by the system. The app must be set as the device launcher for this to work effectively.
- `exitKioskMode` - Exits kiosk mode, restoring normal system UI and hardware button functionality. Also stops the foreground keep-alive service started in enterKioskMode().

## Example Usage

### `isInKioskMode`

Checks if the app is currently running in kiosk mode.

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

const { isInKioskMode } = await CapacitorAndroidKiosk.isInKioskMode();
console.log('Kiosk mode active:', isInKioskMode);
```

### `isSetAsLauncher`

Checks if the app is set as the device launcher (home app).

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

const { isLauncher } = await CapacitorAndroidKiosk.isSetAsLauncher();
console.log('Is launcher:', isLauncher);
```

### `enterKioskMode`

Enters kiosk mode, hiding system UI and blocking hardware buttons. Also starts a foreground keep-alive service so the app is less likely to be killed by the system. The app must be set as the device launcher for this to work effectively.

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

await CapacitorAndroidKiosk.enterKioskMode();
```

### `exitKioskMode`

Exits kiosk mode, restoring normal system UI and hardware button functionality. Also stops the foreground keep-alive service started in enterKioskMode().

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

await CapacitorAndroidKiosk.exitKioskMode();
console.log('Exited kiosk mode');
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-android-kiosk/
- Docs: /docs/plugins/android-kiosk/

## Keep going from Using @capgo/capacitor-android-kiosk

If you are using **Using @capgo/capacitor-android-kiosk** to plan dashboard and API operations, connect it with [@capgo/capacitor-android-kiosk](/docs/plugins/android-kiosk/) for the implementation detail in @capgo/capacitor-android-kiosk, [Getting Started](/docs/plugins/android-kiosk/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
