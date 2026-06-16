---
title: Getting Started
description: Install and wire incoming call presentation in Capacitor with a transport-agnostic API.
sidebar:
  order: 2
---

import { PackageManagers } from 'starlight-package-managers'
import { Steps } from '@astrojs/starlight/components';

## Installation

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-incoming-call-kit` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

<Steps>
1. **Install the package**
   <PackageManagers pkg="@capgo/capacitor-incoming-call-kit" pkgManagers={['bun']} />

2. **Sync native projects**
   <PackageManagers type="exec" pkg="cap" args="sync" pkgManagers={['bun']} />

3. **Choose your ring source**
   Decide whether the incoming-call event comes from your backend, an SDK such as Twilio or Stream, or a native push path such as FCM or PushKit.
</Steps>

## How the integration fits together

This plugin only owns native incoming-call presentation. Your app still owns transport, authentication, and the actual media session.

The common production pattern is:

1. Your backend or calling SDK emits a ring event.
2. Your app calls `showIncomingCall()`.
3. The plugin presents native incoming-call UI.
4. `callAccepted` tells your app to join the actual room or VoIP session.
5. `callDeclined`, `callEnded`, or `callTimedOut` tells your app to clean up remote state.

## Minimal integration

```ts
import { IncomingCallKit } from '@capgo/capacitor-incoming-call-kit';

await IncomingCallKit.requestPermissions();
await IncomingCallKit.requestFullScreenIntentPermission();

await IncomingCallKit.addListener('callAccepted', async ({ call }) => {
  console.log('Accepted', call.callId, call.extra);
  // Start or join your real call session here.
});

await IncomingCallKit.addListener('callDeclined', ({ call }) => {
  console.log('Declined', call.callId);
  // Tell your backend or SDK that the user declined.
});

await IncomingCallKit.addListener('callTimedOut', ({ call }) => {
  console.log('Timed out', call.callId);
  // Clear ringing state in your backend or SDK.
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
    callerUserId: 'user_ada',
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

## Important options

- `callId`: stable identifier reused later with `endCall()`
- `timeoutMs`: best-effort unanswered timeout
- `extra`: arbitrary JSON echoed back in listener payloads
- `android.channelId` and `android.channelName`: Android notification channel tuning
- `android.showFullScreen`: requests the Android full-screen incoming-call activity
- `ios.handleType`: choose `generic`, `phoneNumber`, or `emailAddress` for CallKit

## Managing active calls

```ts
const { calls } = await IncomingCallKit.getActiveCalls();

await IncomingCallKit.endCall({
  callId: 'call-42',
  reason: 'remote-ended',
});

await IncomingCallKit.endAllCalls({
  reason: 'session-reset',
});
```

## Event model

- `incomingCallDisplayed`: native UI was shown successfully
- `callAccepted`: user accepted from the native UI
- `callDeclined`: user declined before joining
- `callEnded`: your app or the platform ended the tracked call
- `callTimedOut`: the call stayed unanswered until `timeoutMs`

Each event carries the normalized `call` payload and your original `extra` object.

## Platform notes

- Read the [iOS guide](/docs/plugins/incoming-call-kit/ios/) before wiring CallKit into a PushKit or APNs flow.
- Read the [Android guide](/docs/plugins/incoming-call-kit/android/) before relying on full-screen intents on Android 14 and later.
- Web is not supported.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-incoming-call-kit](/plugins/capacitor-incoming-call-kit/) for the native capability in Using @capgo/capacitor-incoming-call-kit, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
