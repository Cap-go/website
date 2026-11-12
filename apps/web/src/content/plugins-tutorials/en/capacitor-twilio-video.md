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

## Native SDK floors and permissions

| Platform | SDK floor | Minimum OS |
| --- | --- | --- |
| iOS | [twilio-video-ios](https://github.com/twilio/twilio-video-ios) 5.11.3 (`Package.swift` `from: "5.11.3"`, CocoaPods `~> 5.11`) | iOS 15+ |
| Android | `com.twilio:video-android:7.10.5` | API 24+ |
| Web | Unimplemented. All methods throw `unimplemented`. | n/a |

Add these keys to `ios/App/App/Info.plist`:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app uses the microphone for video calls</string>
<key>NSCameraUsageDescription</key>
<string>This app uses the camera for video calls</string>
```

The plugin registers Capacitor permission aliases for `RECORD_AUDIO` and `CAMERA`. Request them before joining with audio or video. If your host app does not inherit the plugin manifest merger entries, declare the permissions in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.CAMERA" />
```

Mint short-lived Twilio Video access tokens on your backend. Never mint tokens inside the mobile app.

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
| `addListener` | Listen for room and participant lifecycle events. |
| `removeAllListeners` | Remove every listener registered through this plugin instance. |

## Usage

```typescript
import { CapacitorTwilioVideo } from '@capgo/capacitor-twilio-video';

const token = await fetchVideoTokenFromYourBackend();

await CapacitorTwilioVideo.requestMicrophonePermission();
await CapacitorTwilioVideo.requestCameraPermission();

await CapacitorTwilioVideo.login({ accessToken: token });

await CapacitorTwilioVideo.addListener('roomConnected', ({ roomName, participantCount }) => {
  console.log('Connected', roomName, participantCount);
});

await CapacitorTwilioVideo.addListener('participantConnected', ({ identity, participantCount }) => {
  console.log('Participant joined', identity, participantCount);
});

await CapacitorTwilioVideo.joinRoom({
  roomName: 'daily-standup',
  enableAudio: true,
  enableVideo: true,
});

const status = await CapacitorTwilioVideo.getCallStatus();
console.log(status.callState, status.isMicrophoneEnabled, status.isCameraEnabled);

await CapacitorTwilioVideo.setMicrophoneEnabled({ enabled: false });
await CapacitorTwilioVideo.setCameraEnabled({ enabled: true });

await CapacitorTwilioVideo.leaveRoom();
await CapacitorTwilioVideo.logout();
```

`joinRoom` defaults are `enableAudio: true` and `enableVideo: false`.

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

const result = await CapacitorTwilioVideo.joinRoom({
  roomName: 'daily-standup',
  enableAudio: true,
  enableVideo: true,
});
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

The table above lists the 12 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-twilio-video/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorTwilioVideo.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-twilio-video/)
- [Documentation](/docs/plugins/twilio-video/)
- [API reference](/docs/plugins/twilio-video/getting-started/)

## Keep going from Using @capgo/capacitor-twilio-video

If you are using **Using @capgo/capacitor-twilio-video** to plan native media and interface behavior, connect it with [@capgo/capacitor-twilio-video](/docs/plugins/twilio-video/) for the implementation detail in @capgo/capacitor-twilio-video, [Getting Started](/docs/plugins/twilio-video/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
