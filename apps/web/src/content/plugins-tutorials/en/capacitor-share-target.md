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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';
```

## API at a glance

| Method | Description |
| --- | --- |
| `addListener` | Listen for shareReceived event. |
| `removeAllListeners` | Remove all listeners for this plugin. |
| `getPluginVersion` | Get the native Capacitor plugin version. |

## Examples

### `addListener()`

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

### `removeAllListeners()`

Remove all listeners for this plugin.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

await CapacitorShareTarget.removeAllListeners();
```

### `getPluginVersion()`

Get the native Capacitor plugin version.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

const { version} = await CapacitorShareTarget.getPluginVersion();
console.log('Plugin version:', version);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorShareTarget.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-share-target/)
- [Documentation](/docs/plugins/share-target/)
- [API reference](/docs/plugins/share-target/getting-started/)

## Keep going from Using @capgo/capacitor-share-target

If you are using **Using @capgo/capacitor-share-target** to plan native plugin work, connect it with [@capgo/capacitor-share-target](/docs/plugins/share-target/) for the implementation detail in @capgo/capacitor-share-target, [Getting Started](/docs/plugins/share-target/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
