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
