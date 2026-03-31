---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-incoming-call-kit for iOS and Android Mobile Apps

`@capgo/capacitor-incoming-call-kit` adds the native incoming-call presentation layer to Capacitor apps. It gives you CallKit on iOS, high-priority incoming-call notifications on Android, and a typed JavaScript API that stays independent from any specific calling vendor.

## What problem this plugin solves

Most calling stacks have two separate concerns:

1. Transport and signaling, such as FCM, PushKit, SIP, Twilio, Stream, or your own backend.
2. Native incoming-call presentation, so the user sees a proper ringing experience on iOS and Android.

This plugin solves the second problem. Your app still owns the actual media session and push transport.

## Installation

```bash
bun add @capgo/capacitor-incoming-call-kit
bunx cap sync
```

## Quick start

```ts
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.requestPermissions();
await IncomingCallKit.requestFullScreenIntentPermission();

await IncomingCallKit.addListener('callAccepted', async ({ call }) => {
  console.log('Accepted', call.callId);
  // Join the real room or VoIP session here.
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

## Wire it to your real call flow

The normal production pattern looks like this:

1. Your backend or communications SDK emits a ring event.
2. Your Capacitor app calls `showIncomingCall()`.
3. The plugin presents native incoming-call UI.
4. `callAccepted` tells your app to join the actual call.
5. `callDeclined`, `callEnded`, or `callTimedOut` tells your app to clean up remote state.

This separation is useful because it lets you swap transport or media providers later without rewriting the native ringing layer.

## Platform notes

### iOS

- Uses CallKit for the system incoming-call sheet.
- Does not register PushKit or APNs for you.
- Real background ringing still depends on your host app's Apple push setup.

### Android

- Uses a high-priority notification and optional full-screen activity.
- Requests notification permission on Android 13 and later.
- Can open the Android 14 full-screen intent settings page when needed.

## Useful API methods

- `showIncomingCall()` to present the native UI.
- `endCall()` to end a single tracked call.
- `endAllCalls()` to clear all tracked calls.
- `getActiveCalls()` to inspect what the native layer still considers active.

## Learn more

- Full documentation: [Incoming Call Kit docs](https://capgo.app/docs/plugins/incoming-call-kit/)
- GitHub repository: [Cap-go/capacitor-incoming-call-kit](https://github.com/Cap-go/capacitor-incoming-call-kit)

If your app already has transport and media solved, this plugin is the missing native presentation layer that makes incoming calls feel like a real mobile calling experience.
