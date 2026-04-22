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
