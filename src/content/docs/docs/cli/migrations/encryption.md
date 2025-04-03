---
title: "Encryption"
description: "How to encrypt your data with new encryption"
sidebar:
  order: 5
---

This documentation explains how to migrate to the new encryption system. Learn more about the new encryption system in the [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing).

## 1. Create Key Pair

```bash
npx @capgo/cli key create
```

:::warning
Store the private key securely. Never commit it to source control or share it with untrusted parties.
:::

This command:
- Creates a new key pair in your app
- Removes the old key from your Capacitor config
- Keeps old key files for backward compatibility

## 2. Update Capacitor Config

When prompted "Do you want to setup encryption with the new channel in order to support old apps and facilitate the migration?", select yes. This adds a new `defaultChannel` option to your Capacitor config.

```ts
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  plugins: {
    CapacitorUpdater: {
      // ... other options
      defaultChannel: 'encryption_v2' // New apps will use this channel
    }
  }
};

export default config;
```

## 3. Upload Bundle to New Channel

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

## 4. Enable Self-Assignment

:::caution
Required for the `defaultChannel` option to work
:::

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

## 5. Upload to Old Channel

```bash
npx @capgo/cli bundle upload --channel production
```

:::tip
Capacitor config is never uploaded to Capgo
:::

## 6. Cleanup (After 3-4 Months)

Once all users have updated their apps:

1. Remove `defaultChannel` from your Capacitor config
2. Delete the old channel:

```bash
npx @capgo/cli channel delete encryption_v2
```

:::note
Apps using `encryption_v2` as default will switch to `production` channel after deletion
:::
