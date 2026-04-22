---
locale: en
---
# Using @capgo/capacitor-watch

Apple Watch communication plugin for Capacitor. Provides bidirectional messaging between iPhone and Apple Watch using WatchConnectivity.

## Install

```bash
bun add @capgo/capacitor-watch
bunx cap sync
```

## What This Plugin Exposes

- `sendMessage` - Send an interactive message to the watch. The watch must be reachable for this to succeed. Use this for time-sensitive, interactive communication.
- `updateApplicationContext` - Update the application context shared with the watch. Only the latest context is kept - this overwrites any previous context. Use this for syncing app state that the watch needs to display.
- `transferUserInfo` - Transfer user info to the watch. Transfers are queued and delivered in order, even if the watch is not currently reachable. Use this for important data that must be delivered reliably.
- `replyToMessage` - Reply to a message from the watch that requested a reply. Use this in response to the messageReceivedWithReply event.

## Example Usage

### `sendMessage`

Send an interactive message to the watch. The watch must be reachable for this to succeed. Use this for time-sensitive, interactive communication.

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

await CapgoWatch.sendMessage({
  data: { action: 'refresh', timestamp: Date.now() }
});
```

### `updateApplicationContext`

Update the application context shared with the watch. Only the latest context is kept - this overwrites any previous context. Use this for syncing app state that the watch needs to display.

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

await CapgoWatch.updateApplicationContext({
  context: { theme: 'dark', lastSync: Date.now() }
});
```

### `transferUserInfo`

Transfer user info to the watch. Transfers are queued and delivered in order, even if the watch is not currently reachable. Use this for important data that must be delivered reliably.

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

await CapgoWatch.transferUserInfo({
  userInfo: { recordId: '123', action: 'created' }
});
```

### `replyToMessage`

Reply to a message from the watch that requested a reply. Use this in response to the messageReceivedWithReply event.

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

CapgoWatch.addListener('messageReceivedWithReply', async (event) => {
  const result = await processRequest(event.message);
  await CapgoWatch.replyToMessage({
    callbackId: event.callbackId,
    data: { result }
  });
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-watch/
- Docs: /docs/plugins/watch/
