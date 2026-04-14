---
locale: en
---

# Using @capgo/capacitor-incoming-call-kit

The `@capgo/capacitor-incoming-call-kit` package adds the native incoming-call presentation layer to Capacitor apps. It gives you CallKit on iOS, high-priority incoming-call notifications on Android, and a typed JavaScript API that stays independent from any specific calling vendor.

## Installation

```bash
bun add @capgo/capacitor-incoming-call-kit
bunx cap sync
```

## When to use it

This plugin is a good fit when your app already has signaling and media handled elsewhere, for example with:

- your own backend event flow
- Twilio, Stream, Daily, Agora, or SIP infrastructure
- FCM or PushKit delivery

The plugin only owns the native ringing layer. Your app still owns push transport, authentication, and the actual audio or video session.

## Quick start

```ts
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.requestPermissions();
await IncomingCallKit.requestFullScreenIntentPermission();

await IncomingCallKit.addListener('callAccepted', async ({ call }) => {
  console.log('Accepted', call.callId);
  // Join the real room or VoIP session here.
});

await IncomingCallKit.addListener('callDeclined', ({ call }) => {
  console.log('Declined', call.callId);
});

await IncomingCallKit.showIncomingCall({
  callId: 'call-42',
  callerName: 'Ada Lovelace',
  handle: '+39 555 010 020',
  appName: 'Capgo Phone',
  hasVideo: true,
  timeoutMs: 45_000,
  extra: {
    roomId: 'room-42',
  },
  android: {
    channelId: 'calls',
    channelName: 'Incoming Calls',
    showFullScreen: true,
  },
  ios: {
    handleType: 'phoneNumber',
  },
});
```

## Event flow

The common production pattern looks like this:

1. Your backend or communications SDK emits a ring event.
2. Your Capacitor app calls `showIncomingCall()`.
3. The plugin presents native incoming-call UI.
4. `callAccepted` tells your app to join the actual call.
5. `callDeclined`, `callEnded`, or `callTimedOut` tells your app to clean up remote state.

## Platform notes

### iOS

- Uses CallKit for the system incoming-call sheet.
- Does not register PushKit or APNs for you.
- `requestPermissions()` resolves immediately because CallKit has no runtime prompt.

### Android

- Uses a high-priority notification and optional full-screen activity.
- Requests notification permission on Android 13 and later.
- Can open the Android 14 full-screen intent settings page when needed.

## Useful APIs

- `showIncomingCall()` to present the native UI
- `endCall()` to end a single tracked call
- `endAllCalls()` to clear all tracked calls
- `getActiveCalls()` to inspect what the native layer still considers active

## Learn more

- Docs: [Incoming Call Kit](https://capgo.app/docs/plugins/incoming-call-kit/)
- GitHub: [Cap-go/capacitor-incoming-call-kit](https://github.com/Cap-go/capacitor-incoming-call-kit)
