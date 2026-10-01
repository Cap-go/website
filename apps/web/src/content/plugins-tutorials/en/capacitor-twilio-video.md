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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';
```

## API at a glance

| Method | Description |
| --- | --- |
| `login` | Store and validate a Twilio Video access token minted by your backend. |
| `logout` | Clear the cached access token and leave the active room. |
| `isLoggedIn` | Check whether a valid Twilio token is currently cached on the device. |
| `joinRoom` | Join a Twilio room and present the plugin's native in-app call overlay. |
| `leaveRoom` | Leave the current room if connected. |
| `setMicrophoneEnabled` | Enable/disable local microphone publishing. |
| `setCameraEnabled` | Enable/disable local camera publishing. |
| `getCallStatus` | Return the current room name, media state, and participant count. |
| `checkMicrophonePermission` | Check microphone permission state. |
| `requestMicrophonePermission` | Request microphone permission. |
| `checkCameraPermission` | Check camera permission state. |
| `requestCameraPermission` | Request camera permission. |

## Examples

### `login()`

Store and validate a Twilio Video access token minted by your backend.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.login({ accessToken: 'access-token-123' });
console.log(result);
```

### `logout()`

Clear the cached access token and leave the active room.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.logout();
console.log(result);
```

### `isLoggedIn()`

Check whether a valid Twilio token is currently cached on the device.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.isLoggedIn();
// The result holds sensitive values: use it without logging it.
```

### `joinRoom()`

Join a Twilio room and present the plugin's native in-app call overlay.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.joinRoom({ roomName: 'room' });
console.log(result);
```

### `leaveRoom()`

Leave the current room if connected.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.leaveRoom();
console.log(result);
```

### `setMicrophoneEnabled()`

Enable/disable local microphone publishing.

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const result = await CapacitorTwilioVideo.setMicrophoneEnabled({ enabled: true });
console.log(result);
```

The table above lists all 12 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-twilio-video/) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorTwilioVideo.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-twilio-video/)
- [Documentation](/docs/plugins/twilio-video/)
- [API reference](/docs/plugins/twilio-video/getting-started/)

## Keep going from Using @capgo/capacitor-twilio-video

If you are using **Using @capgo/capacitor-twilio-video** to plan native media and interface behavior, connect it with [@capgo/capacitor-twilio-video](/docs/plugins/twilio-video/) for the implementation detail in @capgo/capacitor-twilio-video, [Getting Started](/docs/plugins/twilio-video/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
