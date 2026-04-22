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

## What This Plugin Exposes

- `initialize` - Initialize the WeChat SDK with your application credentials.
- `isInstalled` - Check if WeChat app is installed on the device.
- `auth` - Authenticate user with WeChat OAuth.
- `share` - Share content to WeChat.

## Example Usage

### `initialize`

Initialize the WeChat SDK with your application credentials.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

await CapacitorWechat.initialize({
  appId: 'wx1234567890',
  universalLink: 'https://example.com/app/'
});
```

### `isInstalled`

Check if WeChat app is installed on the device.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

const { installed } = await CapacitorWechat.isInstalled();
if (installed) {
  console.log('WeChat is installed');
}
```

### `auth`

Authenticate user with WeChat OAuth.

```typescript
import { CapacitorWechat } from '@capgo/capacitor-wechat';

const { code, state } = await CapacitorWechat.auth({
  scope: 'snsapi_userinfo',
  state: 'my_state'
});
// Use code to get access token from your server
```

### `share`

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

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-wechat/
- Docs: /docs/plugins/wechat/
