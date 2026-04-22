---
locale: en
---
# Using @capgo/capacitor-rudderstack

Capacitor API that mirrors the public surface of `rudder-sdk-cordova`.

## Install

```bash
bun add @capgo/capacitor-rudderstack
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initializes the RudderStack client.
- `identify` - Sends an identify call for the provided user id.
- `group` - Sends a group call for the provided group id.
- `track` - Sends a track call for the provided event name.

## Example Usage

### `initialize`

Initializes the RudderStack client.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.initialize('value');
```

### `identify`

Sends an identify call for the provided user id.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.identify('value');
```

### `group`

Sends a group call for the provided group id.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.group('value');
```

### `track`

Sends a track call for the provided event name.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.track('value');
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-rudderstack/
- Docs: /docs/plugins/rudderstack/
