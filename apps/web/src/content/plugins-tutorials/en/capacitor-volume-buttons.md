---
locale: en
---
# Using @capgo/capacitor-volume-buttons

Capacitor Volume Buttons Plugin for detecting hardware volume button presses.

## Install

```bash
bun add @capgo/capacitor-volume-buttons
bunx cap sync
```

## What This Plugin Exposes

- `addListener` - Listen for presses on the hardware volume buttons.
- `removeAllListeners` - Removes all listeners for this plugin.
- `getPluginVersion` - Get the native Capacitor plugin version.

## Example Usage

### `addListener`

Listen for presses on the hardware volume buttons.

```typescript
import { VolumeButtons } from '@capgo/capacitor-volume-buttons';

const listener = await VolumeButtons.addListener(
  'volumeButtonPressed',
  (event) => {
    console.log(`Volume ${event.direction} button pressed`);
  }
);

// Remove listener when done
await listener.remove();
```

### `removeAllListeners`

Removes all listeners for this plugin.

```typescript
import { VolumeButtons } from '@capgo/capacitor-volume-buttons';

await VolumeButtons.removeAllListeners();
```

### `getPluginVersion`

Get the native Capacitor plugin version.

```typescript
import { VolumeButtons } from '@capgo/capacitor-volume-buttons';

const { version } = await VolumeButtons.getPluginVersion();
console.log('Plugin version:', version);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-volume-buttons/
- Docs: /docs/plugins/volume-buttons/
