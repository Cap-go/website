---
locale: en
---
# Using @capgo/capacitor-twilio-video

Capacitor API for joining Twilio Video rooms with a native in-app call surface.

## Install

```bash
bun add @capgo/capacitor-twilio-video
bunx cap sync
```

## What This Plugin Exposes

- `login` - Store and validate a Twilio Video access token minted by your backend.
- `logout` - Clear the cached access token and leave the active room.
- `isLoggedIn` - Check whether a valid Twilio token is currently cached on the device.
- `joinRoom` - Join a Twilio room and present the plugin's native in-app call overlay.

## Example Usage

### `login`

Store and validate a Twilio Video access token minted by your backend.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.login({} as { accessToken: string });
```

### `logout`

Clear the cached access token and leave the active room.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.logout();
```

### `isLoggedIn`

Check whether a valid Twilio token is currently cached on the device.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.isLoggedIn();
```

### `joinRoom`

Join a Twilio room and present the plugin's native in-app call overlay.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.joinRoom({} as { roomName: string; enableAudio?: boolean; enableVideo?: boolean });
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-twilio-video/
- Docs: /docs/plugins/twilio-video/
