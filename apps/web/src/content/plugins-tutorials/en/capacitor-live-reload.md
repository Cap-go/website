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

## What This Plugin Exposes

- `configureServer` - Store remote dev server settings used for subsequent connections.
- `connect` - Establish a WebSocket connection if one is not already active.
- `disconnect` - Close the current WebSocket connection and disable auto reconnect.
- `getStatus` - Returns the current connection status.

## Example Usage

### `configureServer`

Store remote dev server settings used for subsequent connections.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.configureServer({} as ConfigureServerOptions);
```

### `connect`

Establish a WebSocket connection if one is not already active.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.connect();
```

### `disconnect`

Close the current WebSocket connection and disable auto reconnect.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.disconnect();
```

### `getStatus`

Returns the current connection status.

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

await LiveReload.getStatus();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-live-reload/
- Docs: /docs/plugins/live-reload/
