---
title: Getting Started
description: "Install @capgo/capacitor-twilio-voice and start using its current Capacitor API."
sidebar:
  order: 2
---

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-twilio-voice` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-twilio-voice
bunx cap sync
```

## Import

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';
```

## API Overview

### `login`

Authenticate the user with Twilio Voice using an access token.

The access token should be generated on your backend server using your Twilio credentials.
This token is required to make and receive calls through Twilio Voice.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const result = await CapacitorTwilioVoice.login({
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
});
console.log('Login successful:', result.success);
```

### `logout`

Log out the current user and unregister from Twilio Voice.

This will disconnect any active calls and stop the device from receiving
new incoming call notifications.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const result = await CapacitorTwilioVoice.logout();
console.log('Logout successful:', result.success);
```

### `isLoggedIn`

Check if the user is currently logged in and has a valid access token.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const status = await CapacitorTwilioVoice.isLoggedIn();
if (status.isLoggedIn && status.hasValidToken) {
  console.log('User identity:', status.identity);
} else {
  // Re-authenticate the user
}
```

### `makeCall`

Initiate an outgoing call to a phone number or client.

The user must be logged in before making a call. The call will be routed
through your Twilio backend configuration.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

// Call a phone number
const result = await CapacitorTwilioVoice.makeCall({
  to: '+1234567890'
});
console.log('Call SID:', result.callSid);

// Call another Twilio client with a readable name for CallKit Recents
await CapacitorTwilioVoice.makeCall({
  to: 'client:alice',
  displayName: 'Alice Smith'
});

// Call a PSTN number using a specific caller ID
await CapacitorTwilioVoice.makeCall({
  to: '+1234567890',
  callerId: '+10987654321'
});
```

### `acceptCall`

Accept an incoming call.

This should be called in response to a 'callInviteReceived' event.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

CapacitorTwilioVoice.addListener('callInviteReceived', async (data) => {
  console.log('Incoming call from:', data.from);
  const result = await CapacitorTwilioVoice.acceptCall({
    callSid: data.callSid
  });
  console.log('Call accepted:', result.success);
});
```

### `rejectCall`

Reject an incoming call.

This should be called in response to a 'callInviteReceived' event.
The caller will hear a busy signal or be directed to voicemail.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

CapacitorTwilioVoice.addListener('callInviteReceived', async (data) => {
  if (shouldRejectCall(data.from)) {
    await CapacitorTwilioVoice.rejectCall({
      callSid: data.callSid
    });
  }
});
```

### `endCall`

End an active call.

If callSid is not provided, this will end the currently active call.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

// End the current active call
await CapacitorTwilioVoice.endCall({});

// End a specific call
await CapacitorTwilioVoice.endCall({
  callSid: 'CA1234567890abcdef'
});
```

### `muteCall`

Mute or unmute the microphone during an active call.

When muted, the other party will not hear audio from your microphone.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

// Mute the microphone
await CapacitorTwilioVoice.muteCall({
  muted: true
});

// Unmute the microphone
await CapacitorTwilioVoice.muteCall({
  muted: false
});
```

### `setSpeaker`

Enable or disable speakerphone mode.

When enabled, audio will be routed through the device's speaker instead of the earpiece.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

// Enable speakerphone
await CapacitorTwilioVoice.setSpeaker({
  enabled: true
});

// Disable speakerphone
await CapacitorTwilioVoice.setSpeaker({
  enabled: false
});
```

### `getCallStatus`

Get the current status of the active call.

This provides real-time information about the call state, mute status,
hold status, and call identifiers.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const status = await CapacitorTwilioVoice.getCallStatus();
if (status.hasActiveCall) {
  console.log('Call SID:', status.callSid);
  console.log('Call State:', status.callState);
  console.log('Is Muted:', status.isMuted);
  console.log('Is On Hold:', status.isOnHold);
}
```

### `checkMicrophonePermission`

Check if microphone permission has been granted.

This does not request permission, only checks the current permission status.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const result = await CapacitorTwilioVoice.checkMicrophonePermission();
if (!result.granted) {
  console.log('Microphone permission not granted');
}
```

### `requestMicrophonePermission`

Request microphone permission from the user.

On iOS and Android, this will show the system permission dialog if permission
has not been granted yet. If permission was previously denied, the user may need
to grant it in system settings.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const result = await CapacitorTwilioVoice.requestMicrophonePermission();
if (result.granted) {
  console.log('Microphone permission granted');
} else {
  console.log('Microphone permission denied');
}
```

## Type Reference

### `CallInvite`
Capacitor plugin for integrating Twilio Voice functionality into mobile applications.
```typescript
export interface CallInvite {
  /** Unique identifier for the incoming call invitation */
  callSid: string;
  /** Phone number or client identifier of the caller (may include custom caller name) */
  from: string;
  /** Phone number or client identifier being called */
  to: string;
  /** Custom parameters passed with the call invitation */
  customParams: Record<string, string>;
}
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-twilio-voice](/plugins/capacitor-twilio-voice/) for the native capability in Using @capgo/capacitor-twilio-voice, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
