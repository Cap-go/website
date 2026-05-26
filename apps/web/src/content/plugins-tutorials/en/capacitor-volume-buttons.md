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

## Keep going from Using @capgo/capacitor-volume-buttons

If you are using **Using @capgo/capacitor-volume-buttons** to plan native plugin work, connect it with [@capgo/capacitor-volume-buttons](/docs/plugins/volume-buttons/) for the implementation detail in @capgo/capacitor-volume-buttons, [Getting Started](/docs/plugins/volume-buttons/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
