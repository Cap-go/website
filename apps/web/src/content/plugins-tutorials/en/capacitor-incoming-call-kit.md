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

## What This Plugin Exposes

- `showIncomingCall` - Displays the native incoming call UI.
- `endCall` - Ends a specific tracked call.
- `endAllCalls` - Ends every tracked call.
- `getActiveCalls` - Returns the currently tracked calls.

## Example Usage

### `showIncomingCall`

Displays the native incoming call UI.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.showIncomingCall({} as ShowIncomingCallOptions);
```

### `endCall`

Ends a specific tracked call.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.endCall({} as EndCallOptions);
```

### `endAllCalls`

Ends every tracked call.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.endAllCalls();
```

### `getActiveCalls`

Returns the currently tracked calls.

```typescript
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.getActiveCalls();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-incoming-call-kit/
- Docs: /docs/plugins/incoming-call-kit/

## Keep going from Using @capgo/capacitor-incoming-call-kit

If you are using **Using @capgo/capacitor-incoming-call-kit** to plan dashboard and API operations, connect it with [@capgo/capacitor-incoming-call-kit](/docs/plugins/incoming-call-kit/) for the implementation detail in @capgo/capacitor-incoming-call-kit, [Getting Started](/docs/plugins/incoming-call-kit/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
