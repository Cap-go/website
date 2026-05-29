---
locale: en
---
# Using @capgo/capacitor-twilio-voice

Integrates the Twilio Voice SDK into Capacitor.

## Install

```bash
bun add @capgo/capacitor-twilio-voice
bunx cap sync
```

## What This Plugin Exposes

- `login` - Authenticate the user with Twilio Voice using an access token.
- `logout` - Log out the current user and unregister from Twilio Voice.
- `isLoggedIn` - Check if the user is currently logged in and has a valid access token.
- `makeCall` - Initiate an outgoing call to a phone number or client.

## Example Usage

### `login`

Authenticate the user with Twilio Voice using an access token.

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

const result = await CapacitorTwilioVoice.login({
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
});
console.log('Login successful:', result.success);
```

### `logout`

Log out the current user and unregister from Twilio Voice.

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

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-twilio-voice/
- Docs: /docs/plugins/twilio-voice/

## Keep going from Using @capgo/capacitor-twilio-voice

If you are using **Using @capgo/capacitor-twilio-voice** to plan native plugin work, connect it with [@capgo/capacitor-twilio-voice](/docs/plugins/twilio-voice/) for the implementation detail in @capgo/capacitor-twilio-voice, [Getting Started](/docs/plugins/twilio-voice/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
