---
locale: en
---
# Using @capgo/capacitor-wechat

Capacitor WeChat Plugin - WeChat SDK integration for authentication, sharing, payments, and mini-programs.

## Install

```bash
bun add @capgo/capacitor-wechat
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initialize the WeChat SDK with your application credentials. |
| `isInstalled` | Check if WeChat app is installed on the device. |
| `auth` | Authenticate user with WeChat OAuth. |
| `share` | Share content to WeChat. |
| `sendPaymentRequest` | Send payment request to WeChat Pay. |
| `openMiniProgram` | Open WeChat mini-program. |
| `chooseInvoice` | Choose invoice from WeChat. |

## Examples

### `initialize()`

Initialize the WeChat SDK with your application credentials.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

await CapacitorWechat.initialize({
  appId: 'wx1234567890',
  universalLink: 'https://example.com/app/'
});
```

### `isInstalled()`

Check if WeChat app is installed on the device.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

const { installed } = await CapacitorWechat.isInstalled();
if (installed) {
  console.log('WeChat is installed');
}
```

### `auth()`

Authenticate user with WeChat OAuth.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

const { code, state } = await CapacitorWechat.auth({
  scope: 'snsapi_userinfo',
  state: 'my_state'
});
// Use code to get access token from your server
```

### `share()`

Share content to WeChat.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

// Share text
await CapacitorWechat.share({
  scene: 0, // 0 = Session, 1 = Timeline, 2 = Favorite
  type: 'text',
  text: 'Hello WeChat!'
});

// Share link
await CapacitorWechat.share({
  scene: 1,
  type: 'link',
  title: 'My Website',
  description: 'Check out my website',
  link: 'https://example.com',
  imageUrl: 'https://example.com/image.jpg'
});
```

### `sendPaymentRequest()`

Send payment request to WeChat Pay.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

// Get payment params from your server first
const paymentParams = await fetchPaymentParamsFromServer();

await CapacitorWechat.sendPaymentRequest({
  partnerId: paymentParams.partnerId,
  prepayId: paymentParams.prepayId,
  nonceStr: paymentParams.nonceStr,
  timeStamp: paymentParams.timeStamp,
  package: paymentParams.package,
  sign: paymentParams.sign
});
```

### `openMiniProgram()`

Open WeChat mini-program.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

const { extMsg } = await CapacitorWechat.openMiniProgram({
  username: 'gh_xxxxxxxxxxxxx',
  path: 'pages/index/index',
  type: 0 // 0 = Release, 1 = Test, 2 = Preview
});
```

The [API reference](/docs/plugins/wechat/getting-started/) covers the other 1 method.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-wechat/)
- [Documentation](/docs/plugins/wechat/)
- [API reference](/docs/plugins/wechat/getting-started/)

## Keep going from Using @capgo/capacitor-wechat

If you are using **Using @capgo/capacitor-wechat** to plan authentication and account flows, connect it with [@capgo/capacitor-wechat](/docs/plugins/wechat/) for the implementation detail in @capgo/capacitor-wechat, [Getting Started](/docs/plugins/wechat/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric.
