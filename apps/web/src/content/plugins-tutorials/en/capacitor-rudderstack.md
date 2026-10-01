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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initializes the RudderStack client. |
| `identify` | Sends an identify call for the provided user id. |
| `group` | Sends a group call for the provided group id. |
| `track` | Sends a track call for the provided event name. |
| `screen` | Sends a screen call for the provided screen name. |
| `alias` | Aliases the current user to a new identifier. |
| `reset` | Resets the current RudderStack identity state. |
| `flush` | Flushes queued events immediately. |
| `putDeviceToken` | Sets the push token that RudderStack forwards to supported destinations. |
| `setAdvertisingId` | See the source definitions for current behavior. |
| `putAdvertisingId` | Sets a custom advertising id value. |
| `setAnonymousId` | See the source definitions for current behavior. |
| `putAnonymousId` | Sets a custom anonymous id value. |
| `optOut` | Toggles RudderStack tracking opt-out. |

## Examples

### `initialize()`

Initializes the RudderStack client.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.initialize('write-key-123');
```

### `identify()`

Sends an identify call for the provided user id.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.identify('user-id-123');
```

### `group()`

Sends a group call for the provided group id.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.group('group-id-123');
```

### `track()`

Sends a track call for the provided event name.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.track('event');
```

### `screen()`

Sends a screen call for the provided screen name.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.screen('screen');
```

### `alias()`

Aliases the current user to a new identifier.

```typescript
import { nativePlugin } from '@capgo/capacitor-rudderstack';

await nativePlugin.alias('new-id-123');
```

The table above lists all 14 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-rudderstack/) for the full contract of each one.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-rudderstack/)
- [Documentation](/docs/plugins/rudderstack/)
- [API reference](/docs/plugins/rudderstack/getting-started/)

## Keep going from Using @capgo/capacitor-rudderstack

If you are using **Using @capgo/capacitor-rudderstack** to plan dashboard and API operations, connect it with [@capgo/capacitor-rudderstack](/docs/plugins/rudderstack/) for the implementation detail in @capgo/capacitor-rudderstack, [Getting Started](/docs/plugins/rudderstack/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
