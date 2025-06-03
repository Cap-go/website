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

## 2. Update Capacitor Config for Version 2.0.0

Update your Capacitor config before building version 2.0.0 for the app store:

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... other options
      defaultChannel: 'v2' // All 2.0.0 users will use v2 channel
    }
  }
};

export default config;
```

## 3. Manage Separate Code Branches

Create separate git branches to maintain compatibility between app versions:

```bash
# Create and maintain a branch for version 1.x updates
git checkout -b v1-maintenance
git push origin v1-maintenance

# Your main branch continues with version 2.x development
git checkout main
```

:::warning
**Critical:** Never push JavaScript bundles to older apps that expect native code/APIs they don't have. Always build updates from the appropriate branch:
- **v1-maintenance branch**: For updates to 1.x apps (production channel)
- **main branch**: For updates to 2.x apps (v2 channel)
:::

## 4. Upload Bundles to Respective Channels

```bash
# For 1.x updates: Build from v1-maintenance branch
git checkout v1-maintenance
# Make your 1.x compatible changes here
npx @capgo/cli bundle upload --channel production

# For 2.x updates: Build from main branch  
git checkout main
# Make your 2.x changes here
npx @capgo/cli bundle upload --channel v2
```

## 5. Enable Self-Assignment

```bash
# Allow apps to self-assign to v2 channel
npx @capgo/cli channel set v2 --self-assign
```

## 6. Deploy to App Store

Build and deploy version 2.0.0 to the app store. All users who download this version (whether new users or existing users upgrading) will automatically use the v2 channel because it's configured in the app bundle.

:::note
**No code changes needed!** Since `defaultChannel: 'v2'` is bundled with the app store version, all users downloading version 2.0.0 will automatically use the correct channel.
:::

## 7. Cleanup (After Migration)

Once all users have migrated to version 2.x (count 3-4 months):

1. Remove `defaultChannel` from your Capacitor config
2. Delete the v2 channel:

```bash
npx @capgo/cli channel delete v2
```

3. Delete the v1-maintenance branch:

```bash
git branch -d v1-maintenance
git push origin --delete v1-maintenance
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

1. Switch to the v1-maintenance branch:
```bash
git checkout v1-maintenance
```

2. Make your changes and commit:
```bash
# Make 1.x compatible changes
git add .
git commit -m "Fix for v1.x"
git push origin v1-maintenance
```

3. Build and upload to production channel:
```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Keep your v1-maintenance branch up to date with bug fixes that are compatible with version 1.x, but never merge breaking changes from main
::: 
