---
title: "Breaking Changes"
description: "How to handle breaking changes with versioned channels"
sidebar:
  order: 6
---

This documentation explains how to handle breaking changes in your app using versioned channels. This approach allows you to maintain different versions of your app while ensuring users receive compatible updates.

## Example Scenario

Let's say you have:
- App version 1.2.3 (old version) - uses production channel
- App version 2.0.0 (new version with breaking changes) - uses v2 channel
- Live update 1.2.4 (compatible with 1.2.3)
- Live update 2.0.1 (compatible with 2.0.0)

## 1. Create Channel for New Version

```bash
# Create channel for version 2.x
npx @capgo/cli channel create v2
```

## 2. Update Capacitor Config

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... other options
      defaultChannel: 'v2' // New apps will use v2 channel
    }
  }
};

export default config;
```

## 3. Upload Bundles to Respective Channels

```bash
# Upload 1.2.4 to production channel (for 1.2.3 users)
npx @capgo/cli bundle upload --channel production

# Upload 2.0.1 to v2 channel (for 2.0.0 users)
npx @capgo/cli bundle upload --channel v2
```

## 4. Enable Self-Assignment

```bash
# Allow apps to self-assign to v2 channel
npx @capgo/cli channel set v2 --self-assign
```

## 5. Update App Code

Add version check in your app to assign users to the correct channel:

```ts
// src/utils/updater.ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

export async function setupUpdater() {
  const { appVersion } = await CapacitorUpdater.getCurrentVersion()
  const majorVersion = appVersion.split('.')[0]
  
  // Version 1.x uses default production channel
  // Only assign v2 channel for version 2.x
  if (majorVersion === '2') {
    await CapacitorUpdater.setChannel('v2')
  }
}
```

## 6. Cleanup (After Migration)

Once all users have migrated to version 2.x:

1. Remove `defaultChannel` from your Capacitor config
2. Delete the v2 channel:

```bash
npx @capgo/cli channel delete v2
```

:::tip
This approach ensures users only receive updates compatible with their app version
:::

:::warning
Always test updates thoroughly in each channel before deployment
:::

:::note
You can safely delete the v2 channel in Capgo even if some users still have the channel override. They will automatically receive updates from the production channel instead.
:::

## Maintaining Version 1.x Updates

To send updates compatible with version 1.x:

1. Create a git tag for version 1.x:
```bash
git tag v1.2.4
git push origin v1.2.4
```

2. Switch to the tag:
```bash
git checkout v1.2.4
```

3. Build and upload to production channel:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Your main branch can continue targeting the latest version (2.x) while you maintain 1.x updates through git tags
::: 
