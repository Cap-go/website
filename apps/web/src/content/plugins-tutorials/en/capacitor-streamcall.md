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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';
```

## API at a glance

| Method | Description |
| --- | --- |
| `login` | Login to Stream Video service. |
| `logout` | Logout from Stream Video service. |
| `call` | Initiate a call to another user. |
| `endCall` | End the current call. |
| `joinCall` | Join an existing call. |
| `setMicrophoneEnabled` | Enable or disable microphone. |
| `setCameraEnabled` | Enable or disable camera. |
| `enableBluetooth` | Enable bluetooth audio. |
| `acceptCall` | Accept an incoming call. |
| `rejectCall` | Reject an incoming call. |
| `isCameraEnabled` | Check if camera is enabled. |
| `getCallStatus` | Get the current call status. |
| `getRingingCall` | Get the current ringing call. |
| `toggleViews` | Cycle through the available video layouts. |
| `setSpeaker` | Set speakerphone on. |
| `switchCamera` | Switch camera. |
| `getCallInfo` | Get detailed information about an active call including caller details. |
| `setDynamicStreamVideoApikey` | Set a dynamic Stream Video API key that overrides the static one. |
| `getDynamicStreamVideoApikey` | Get the currently set dynamic Stream Video API key. |
| `getCurrentUser` | Get the current user's information. |

## Examples

### `login()`

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

### `logout()`

Logout from Stream Video service.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.logout();
```

### `call()`

Initiate a call to another user.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.call({
  userId: 'user-456',
  type: 'video',
  ring: true
});
```

### `endCall()`

End the current call.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.endCall();
```

### `joinCall()`

Join an existing call.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.joinCall({ callId: 'call001', callType: 'default' });
```

### `setMicrophoneEnabled()`

Enable or disable microphone.

```typescript
import { StreamCall } from '@capgo/capacitor-stream-call';

await StreamCall.setMicrophoneEnabled({ enabled: false });
```

The [API reference](/docs/plugins/streamcall/getting-started/) covers the other 14 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `StreamCall.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-streamcall/)
- [Documentation](/docs/plugins/streamcall/)
- [API reference](/docs/plugins/streamcall/getting-started/)

## Keep going from Using @capgo/capacitor-stream-call

If you are using **Using @capgo/capacitor-stream-call** to plan native plugin work, connect it with [@capgo/capacitor-stream-call](/docs/plugins/streamcall/) for the implementation detail in @capgo/capacitor-stream-call, [Getting Started](/docs/plugins/streamcall/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
