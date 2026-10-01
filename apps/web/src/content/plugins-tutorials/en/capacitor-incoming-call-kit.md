---
locale: en
---
# Using @capgo/capacitor-incoming-call-kit

Capacitor API for presenting a native incoming-call surface.

## Install

```bash
bun add @capgo/capacitor-incoming-call-kit
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';
```

## API at a glance

| Method | Description |
| --- | --- |
| `showIncomingCall` | Displays the native incoming call UI. |
| `endCall` | Ends a specific tracked call. |
| `endAllCalls` | Ends every tracked call. |
| `getActiveCalls` | Returns the currently tracked calls. |
| `checkPermissions` | Returns the current permission state for notifications and full-screen intents. |
| `requestPermissions` | Requests the notification permission when the platform supports it. |
| `requestFullScreenIntentPermission` | Opens the Android 14+ full-screen intent settings page when available. |

## Examples

### `showIncomingCall()`

Displays the native incoming call UI.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.showIncomingCall({
  callId: 'call-id-123',
  callerName: 'caller',
});
console.log(result);
```

### `endCall()`

Ends a specific tracked call.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.endCall({ callId: 'call-id-123' });
console.log(result);
```

### `endAllCalls()`

Ends every tracked call.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.endAllCalls();
console.log(result);
```

### `getActiveCalls()`

Returns the currently tracked calls.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.getActiveCalls();
console.log(result);
```

### `checkPermissions()`

Returns the current permission state for notifications and full-screen intents.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.checkPermissions();
console.log(result);
```

### `requestPermissions()`

Requests the notification permission when the platform supports it.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

const result = await IncomingCallKit.requestPermissions();
console.log(result);
```

The table above lists all 7 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-incoming-call-kit/) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `IncomingCallKit.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-incoming-call-kit/)
- [Documentation](/docs/plugins/incoming-call-kit/)
- [API reference](/docs/plugins/incoming-call-kit/getting-started/)

## Keep going from Using @capgo/capacitor-incoming-call-kit

If you are using **Using @capgo/capacitor-incoming-call-kit** to plan dashboard and API operations, connect it with [@capgo/capacitor-incoming-call-kit](/docs/plugins/incoming-call-kit/) for the implementation detail in @capgo/capacitor-incoming-call-kit, [Getting Started](/docs/plugins/incoming-call-kit/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
