---
locale: en
---
# Using @capgo/capacitor-shake

Capacitor Shake Plugin interface for detecting shake gestures on mobile devices. This plugin allows you to listen for shake events and get plugin version information.

## Install

```bash
bun add @capgo/capacitor-shake
bunx cap sync
```

## What This Plugin Exposes

- `addListener` - Listen for shake event on the device.
- `getPluginVersion` - Get the native Capacitor plugin version.

## Example Usage

### `addListener`

Listen for shake event on the device.

```typescript
import { CapacitorShake } from '@capgo/capacitor-shake';

const listener = await CapacitorShake.addListener('shake', () => {
  console.log('Shake detected!');
});

// To remove the listener:
await listener.remove();
```

### `getPluginVersion`

Get the native Capacitor plugin version.

```typescript
import { CapacitorShake } from '@capgo/capacitor-shake';

const { version } = await CapacitorShake.getPluginVersion();
console.log('Plugin version:', version);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-shake/
- Docs: /docs/plugins/shake/

## Keep going from Using @capgo/capacitor-shake

If you are using **Using @capgo/capacitor-shake** to plan native plugin work, connect it with [@capgo/capacitor-shake](/docs/plugins/shake/) for the implementation detail in @capgo/capacitor-shake, [Getting Started](/docs/plugins/shake/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
