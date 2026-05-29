---
locale: en
---
# Using @capgo/capacitor-realtimekit

Capacitor RealtimeKit Plugin for Cloudflare Calls integration.

## Install

```bash
bun add @capgo/capacitor-realtimekit
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initializes the RealtimeKit plugin before using other methods.
- `startMeeting` - Start a meeting using the built-in UI. Only available on Android and iOS.

## Example Usage

### `initialize`

Initializes the RealtimeKit plugin before using other methods.

```typescript
import { CapacitorRealtimekit } from '@capgo/capacitor-realtimekit';

await CapacitorRealtimekit.initialize();
```

### `startMeeting`

Start a meeting using the built-in UI. Only available on Android and iOS.

```typescript
import { CapacitorRealtimekit } from '@capgo/capacitor-realtimekit';

await CapacitorRealtimekit.startMeeting({
  authToken: 'your-auth-token',
  enableAudio: true,
  enableVideo: true,
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-realtimekit/
- Docs: /docs/plugins/realtimekit/

## Keep going from Using @capgo/capacitor-realtimekit

If you are using **Using @capgo/capacitor-realtimekit** to plan native plugin work, connect it with [@capgo/capacitor-realtimekit](/docs/plugins/realtimekit/) for the implementation detail in @capgo/capacitor-realtimekit, [Getting Started](/docs/plugins/realtimekit/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
