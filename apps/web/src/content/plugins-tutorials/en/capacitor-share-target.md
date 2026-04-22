---
locale: en
---
# Using @capgo/capacitor-share-target

Capacitor Share Target Plugin interface.

## Install

```bash
bun add @capgo/capacitor-share-target
bunx cap sync
```

## What This Plugin Exposes

- `addListener` - Listen for shareReceived event.
- `removeAllListeners` - Remove all listeners for this plugin.
- `getPluginVersion` - Get the native Capacitor plugin version.

## Example Usage

### `addListener`

Listen for shareReceived event.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

const listener = await CapacitorShareTarget.addListener('shareReceived', (event) => {
  console.log('Title:', event.title);
  console.log('Texts:', event.texts);
  event.files?.forEach(file => {
    console.log(`File: ${file.name} (${file.mimeType})`);
  });
});

// To remove the listener:
await listener.remove();
```

### `removeAllListeners`

Remove all listeners for this plugin.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

await CapacitorShareTarget.removeAllListeners();
```

### `getPluginVersion`

Get the native Capacitor plugin version.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

const { version} = await CapacitorShareTarget.getPluginVersion();
console.log('Plugin version:', version);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-share-target/
- Docs: /docs/plugins/share-target/
