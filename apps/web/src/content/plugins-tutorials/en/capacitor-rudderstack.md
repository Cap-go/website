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

## Keep going from Using @capgo/capacitor-rudderstack

If you are using **Using @capgo/capacitor-rudderstack** to plan dashboard and API operations, connect it with [@capgo/capacitor-rudderstack](/docs/plugins/rudderstack/) for the implementation detail in @capgo/capacitor-rudderstack, [Getting Started](/docs/plugins/rudderstack/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
