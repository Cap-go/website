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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getBrightness` | Get the current brightness level of the device's main screen. |
| `setBrightness` | Set the brightness level of the device's main screen. |
| `getSystemBrightness` | Get the system-wide screen brightness. |
| `setSystemBrightness` | Set the system-wide screen brightness. Requires WRITE_SETTINGS permission on Android. This also changes the brightness mode to MANUAL. |
| `getSystemBrightnessMode` | Get the current system brightness mode (automatic or manual). Requires WRITE_SETTINGS permission on Android. |
| `setSystemBrightnessMode` | Set the system brightness mode (automatic or manual). Requires WRITE_SETTINGS permission on Android. |
| `isUsingSystemBrightness` | Check if the current activity is using the system-wide brightness value. |
| `restoreSystemBrightness` | Reset the brightness setting of the current activity to use the system-wide value. |
| `isAvailable` | Check if the Brightness API is available on the current device. |
| `checkPermissions` | Check user's permissions for accessing system brightness. |
| `requestPermissions` | Request permissions for accessing system brightness. On Android, this opens the system settings to grant WRITE_SETTINGS permission. |

## Examples

### `getBrightness()`

Get the current brightness level of the device's main screen.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

const result = await CapgoBrightness.getBrightness();
console.log(result);
```

### `setBrightness()`

Set the brightness level of the device's main screen.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.setBrightness({ brightness: 0.5 });
```

### `getSystemBrightness()`

Get the system-wide screen brightness.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

const result = await CapgoBrightness.getSystemBrightness();
console.log(result);
```

### `setSystemBrightness()`

Set the system-wide screen brightness. Requires WRITE_SETTINGS permission on Android. This also changes the brightness mode to MANUAL.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

await CapgoBrightness.setSystemBrightness({ brightness: 0.5 });
```

### `getSystemBrightnessMode()`

Get the current system brightness mode (automatic or manual). Requires WRITE_SETTINGS permission on Android.

```typescript
import { CapgoBrightness } from '@capgo/capacitor-brightness';

const result = await CapgoBrightness.getSystemBrightnessMode();
console.log(result);
```

### `setSystemBrightnessMode()`

Set the system brightness mode (automatic or manual). Requires WRITE_SETTINGS permission on Android.

```typescript
import { CapgoBrightness, BrightnessMode } from '@capgo/capacitor-brightness';

await CapgoBrightness.setSystemBrightnessMode({ mode: BrightnessMode.AUTOMATIC });
```

The table above lists the 11 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-brightness/).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-brightness/)
- [Documentation](/docs/plugins/brightness/)
- [API reference](/docs/plugins/brightness/getting-started/)

## Keep going from Using @capgo/capacitor-brightness

If you are using **Using @capgo/capacitor-brightness** to plan native media and interface behavior, connect it with [@capgo/capacitor-brightness](/docs/plugins/brightness/) for the implementation detail in @capgo/capacitor-brightness, [Getting Started](/docs/plugins/brightness/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
