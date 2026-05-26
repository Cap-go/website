---
locale: en
---
# Using @capgo/capacitor-brightness

Control screen brightness on iOS and Android.

## Install

```bash
bun add @capgo/capacitor-brightness
bunx cap sync
```

## What This Plugin Exposes

- `getBrightness` - Get the current brightness level of the device's main screen.
- `setBrightness` - Set the brightness level of the device's main screen.
- `getSystemBrightness` - Get the system-wide screen brightness.
- `setSystemBrightness` - Set the system-wide screen brightness. Requires WRITE_SETTINGS permission on Android. This also changes the brightness mode to MANUAL.

## Example Usage

### `getBrightness`

Get the current brightness level of the device's main screen.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.getBrightness();
```

### `setBrightness`

Set the brightness level of the device's main screen.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.setBrightness({} as SetBrightnessOptions);
```

### `getSystemBrightness`

Get the system-wide screen brightness.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.getSystemBrightness();
```

### `setSystemBrightness`

Set the system-wide screen brightness. Requires WRITE_SETTINGS permission on Android. This also changes the brightness mode to MANUAL.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.setSystemBrightness({} as SetBrightnessOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-brightness/
- Docs: /docs/plugins/brightness/

## Keep going from Using @capgo/capacitor-brightness

If you are using **Using @capgo/capacitor-brightness** to plan native media and interface behavior, connect it with [@capgo/capacitor-brightness](/docs/plugins/brightness/) for the implementation detail in @capgo/capacitor-brightness, [Getting Started](/docs/plugins/brightness/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
