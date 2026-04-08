---
locale: en
---

# Using @capgo/capacitor-twilio-video

`@capgo/capacitor-twilio-video` connects a Capacitor app to Twilio Video rooms through the native mobile SDKs. The plugin is headless, so you keep your own call UI while delegating room connection, participant lifecycle events, and media state to Twilio.

## Installation

```bash
bun add @capgo/capacitor-twilio-video
bunx cap sync
```

## Prepare your backend

This plugin expects a Twilio access token. Generate that token server-side and return it to the app when a user is ready to join a room.

## Request permissions

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.requestMicrophonePermission();
await CapacitorTwilioVideo.requestCameraPermission();
```

On iOS, add `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` to `Info.plist`.

## Authenticate and join a room

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

await CapacitorTwilioVideo.login({
  accessToken: 'TWILIO_ACCESS_TOKEN',
});

await CapacitorTwilioVideo.joinRoom({
  roomName: 'support-room',
  enableAudio: true,
  enableVideo: true,
});
```

## Listen for room events

```typescript
await CapacitorTwilioVideo.addListener('roomConnected', ({ roomName, participantCount }) => {
  console.log('Connected', roomName, participantCount);
});

await CapacitorTwilioVideo.addListener('participantConnected', (event) => {
  console.log('Participant joined', event);
});

await CapacitorTwilioVideo.addListener('roomDisconnected', (event) => {
  console.log('Disconnected', event);
});
```

## Control local media

```typescript
await CapacitorTwilioVideo.setMicrophoneEnabled({ enabled: false });
await CapacitorTwilioVideo.setCameraEnabled({ enabled: true });

const status = await CapacitorTwilioVideo.getCallStatus();
console.log(status.callState, status.participantCount);
```

## Leave the room

```typescript
await CapacitorTwilioVideo.leaveRoom();
await CapacitorTwilioVideo.logout();
```

## Practical advice

- Keep token creation and room authorization on your backend.
- Render your participant tiles and call controls in your app layer instead of relying on an embedded vendor UI.
- Treat plugin events as the source of truth for connection state and participant changes.
