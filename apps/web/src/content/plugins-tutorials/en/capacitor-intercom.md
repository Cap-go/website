---
locale: en
---
# Using @capgo/capacitor-intercom

Intercom Capacitor plugin.

## Install

```bash
bun add @capgo/capacitor-intercom
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';
```

## API at a glance

| Method | Description |
| --- | --- |
| `loadWithKeys` | Initialize Intercom with API keys at runtime. Use this if you prefer not to configure keys in capacitor.config. |
| `registerIdentifiedUser` | Register a known user with Intercom. At least one of userId or email must be provided. |
| `registerUnidentifiedUser` | Register an anonymous user with Intercom. |
| `updateUser` | Update user attributes in Intercom. |
| `logout` | Log the user out of Intercom. |
| `logEvent` | Log a custom event in Intercom. |
| `displayMessenger` | Open the Intercom messenger. |
| `displayMessageComposer` | Open the message composer with a pre-filled message. |
| `displayHelpCenter` | Open the Intercom help center. |
| `hideMessenger` | Hide the Intercom messenger. |
| `displayLauncher` | Show the Intercom launcher button. |
| `hideLauncher` | Hide the Intercom launcher button. |
| `displayInAppMessages` | Enable in-app messages from Intercom. |
| `hideInAppMessages` | Disable in-app messages from Intercom. |
| `displayCarousel` | Display a specific Intercom carousel. |
| `displayArticle` | Display a specific Intercom article. |
| `displaySurvey` | Display a specific Intercom survey. |
| `setUserHash` | Set the HMAC for identity verification. |
| `setUserJwt` | Set JWT for secure messenger authentication. |
| `setBottomPadding` | Set the bottom padding for the Intercom messenger UI. |
| `sendPushTokenToIntercom` | Send a push notification token to Intercom. |
| `receivePush` | Handle a received Intercom push notification. |
| `getUnreadConversationCount` | Get the number of unread conversations for the current user. |

## Examples

### `loadWithKeys()`

Initialize Intercom with API keys at runtime. Use this if you prefer not to configure keys in capacitor.config.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.loadWithKeys({ appId: 'app-id-123' });
```

### `registerIdentifiedUser()`

Register a known user with Intercom. At least one of userId or email must be provided.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.registerIdentifiedUser({ userId: 'user-id-123' });
```

### `registerUnidentifiedUser()`

Register an anonymous user with Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.registerUnidentifiedUser();
```

### `updateUser()`

Update user attributes in Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.updateUser({ userId: 'user-id-123' });
```

### `logout()`

Log the user out of Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.logout();
```

### `logEvent()`

Log a custom event in Intercom.

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom';

await CapgoIntercom.logEvent({ name: 'example' });
```

The table above lists the 23 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-intercom/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapgoIntercom.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-intercom/)
- [Documentation](/docs/plugins/intercom/)
- [API reference](/docs/plugins/intercom/getting-started/)

## Keep going from Using @capgo/capacitor-intercom

If you are using **Using @capgo/capacitor-intercom** to plan native plugin work, connect it with [@capgo/capacitor-intercom](/docs/plugins/intercom/) for the implementation detail in @capgo/capacitor-intercom, [Getting Started](/docs/plugins/intercom/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
