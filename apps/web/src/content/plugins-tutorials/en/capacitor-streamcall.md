---
locale: en
---
# Using @capgo/capacitor-stream-call

Uses the https://getstream.io/ SDK to implement calling in Capacitor.

## Install

```bash
bun add @capgo/capacitor-stream-call
bunx cap sync
```

## What This Plugin Exposes

- `login` - Login to Stream Video service.
- `logout` - Logout from Stream Video service.
- `call` - Initiate a call to another user.
- `endCall` - End the current call.

## Example Usage

### `login`

Login to Stream Video service.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.login({
  token: 'your-token',
  userId: 'user-123',
  name: 'John Doe',
  apiKey: 'your-api-key'
});
```

### `logout`

Logout from Stream Video service.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.logout();
```

### `call`

Initiate a call to another user.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.call({
  userId: 'user-456',
  type: 'video',
  ring: true
});
```

### `endCall`

End the current call.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.endCall();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-streamcall/
- Docs: /docs/plugins/streamcall/

## Keep going from Using @capgo/capacitor-stream-call

If you are using **Using @capgo/capacitor-stream-call** to plan native plugin work, connect it with [@capgo/capacitor-stream-call](/docs/plugins/streamcall/) for the implementation detail in @capgo/capacitor-stream-call, [Getting Started](/docs/plugins/streamcall/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
