---
locale: en
---
# Using @capgo/capacitor-live-reload

Capacitor plugin to live reload Capacitor apps from a remote Vite dev server.

## Install

```bash
bun add @capgo/capacitor-live-reload
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';
```

## API at a glance

| Method | Description |
| --- | --- |
| `configureServer` | Store remote dev server settings used for subsequent connections. |
| `connect` | Establish a WebSocket connection if one is not already active. |
| `disconnect` | Close the current WebSocket connection and disable auto reconnect. |
| `getStatus` | Returns the current connection status. |
| `reload` | Trigger a full reload of the Capacitor WebView. |
| `reloadFile` | Reload a single file/module if the runtime supports it (falls back to full reload). |

## Examples

### `configureServer()`

Store remote dev server settings used for subsequent connections.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

const result = await LiveReload.configureServer({ url: 'https://example.com' });
console.log(result);
```

### `connect()`

Establish a WebSocket connection if one is not already active.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

const result = await LiveReload.connect();
console.log(result);
```

### `disconnect()`

Close the current WebSocket connection and disable auto reconnect.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

const result = await LiveReload.disconnect();
console.log(result);
```

### `getStatus()`

Returns the current connection status.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

const result = await LiveReload.getStatus();
console.log(result);
```

### `reload()`

Trigger a full reload of the Capacitor WebView.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.reload();
```

### `reloadFile()`

Reload a single file/module if the runtime supports it (falls back to full reload).

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.reloadFile({ path: 'path/to/file' });
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `LiveReload.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-live-reload/)
- [Documentation](/docs/plugins/live-reload/)
- [API reference](/docs/plugins/live-reload/getting-started/)

## Keep going from Using @capgo/capacitor-live-reload

If you are using **Using @capgo/capacitor-live-reload** to plan native plugin work, connect it with [@capgo/capacitor-live-reload](/docs/plugins/live-reload/) for the implementation detail in @capgo/capacitor-live-reload, [Getting Started](/docs/plugins/live-reload/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
