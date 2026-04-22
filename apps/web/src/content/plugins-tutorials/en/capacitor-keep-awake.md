---
locale: en
---
# Using @capgo/capacitor-keep-awake

Capacitor Keep Awake Plugin for preventing the device screen from dimming/sleeping.

## Install

```bash
bun add @capgo/capacitor-keep-awake
bunx cap sync
```

## What This Plugin Exposes

- `keepAwake` - Prevent the device from dimming the screen.
- `allowSleep` - Allow the device to dim the screen (disable keep awake).
- `isSupported` - Check if the keep awake feature is supported on the current platform.
- `isKeptAwake` - Check if the device is currently being kept awake.

## Example Usage

### `keepAwake`

Prevent the device from dimming the screen.

```typescript
import { KeepAwake } from '@capgo/capacitor-keep-awake';

await KeepAwake.keepAwake();
console.log('Screen will stay awake');
```

### `allowSleep`

Allow the device to dim the screen (disable keep awake).

```typescript
import { KeepAwake } from '@capgo/capacitor-keep-awake';

await KeepAwake.allowSleep();
console.log('Screen can now dim');
```

### `isSupported`

Check if the keep awake feature is supported on the current platform.

```typescript
import { KeepAwake } from '@capgo/capacitor-keep-awake';

const { isSupported } = await KeepAwake.isSupported();
if (isSupported) {
  console.log('Keep awake is supported');
}
```

### `isKeptAwake`

Check if the device is currently being kept awake.

```typescript
import { KeepAwake } from '@capgo/capacitor-keep-awake';

const { isKeptAwake } = await KeepAwake.isKeptAwake();
console.log('Is kept awake:', isKeptAwake);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-keep-awake/
- Docs: /docs/plugins/keep-awake/
