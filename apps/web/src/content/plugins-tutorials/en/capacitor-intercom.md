---
locale: en
---

# Using @capgo/capacitor-intercom

The `@capgo/capacitor-intercom` package brings Intercom support to Capacitor apps with native iOS and Android implementations. Use this guide to add in-app chat, help center, and push integration to your app.

## Installation

Install the plugin and sync native projects:

```bash
npm install @capgo/capacitor-intercom
npx cap sync
```

## Configure keys

You can configure Intercom directly in your Capacitor configuration:

```json
{
  "plugins": {
    "CapgoIntercom": {
      "iosApiKey": "ios_sdk-xxx",
      "iosAppId": "your_ios_app_id",
      "androidApiKey": "android_sdk-xxx",
      "androidAppId": "your_android_app_id"
    }
  }
}
```

You can also initialize at runtime with:

```typescript
import { CapgoIntercom } from '@capgo/capacitor-intercom'

await CapgoIntercom.loadWithKeys({
  appId: 'your_app_id',
  apiKeyIOS: 'ios_sdk-xxx',
  apiKeyAndroid: 'android_sdk-xxx',
})
```

## Usage

Open the messenger and help center:

```typescript
await CapgoIntercom.displayMessenger()
await CapgoIntercom.displayHelpCenter()
```

Register users, push events, and read unread conversation count:

```typescript
await CapgoIntercom.registerIdentifiedUser({ email: 'user@example.com' })
await CapgoIntercom.logEvent({ name: 'support_opened', data: { section: 'billing' } })
const { count } = await CapgoIntercom.getUnreadConversationCount()
console.log('Unread conversations:', count)
```

## Additional methods

This plugin also exposes methods for:

- `registerUnidentifiedUser`
- `updateUser`
- `logout`
- `displayArticle` and `displaySurvey`
- `setUserHash` / `setUserJwt`
- `sendPushTokenToIntercom`
- Event listeners for messenger visibility and unread count changes

For official references and advanced setup, check the plugin repository:
[github.com/Cap-go/capacitor-intercom](https://github.com/Cap-go/capacitor-intercom)
