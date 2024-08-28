---
title: "Encryption"
description: "How to encrypt your data with new encryption"
sidebar:
  order: 5
---

This documentation will explain how to encrypt your data with the new encryption system and remove the old one.

Learn more  about the new encryption system in the [blog post](/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing).

---

First, create a new key pair with the following command:

```bash
npx @capgo/cli key create
```

This command will create a new key pair in your app; it is imperative to store the private key in a safe place. One must never commit the private key to source control nor share it with an untrusted party.

This command will also remove the old key from your Capacitor config, but it will not remove the old key files. The CLI keeps them to allow you to continue sending live updates for the apps that haven't received an app store update and are still using the old plugin. This facilitates the migration.

When you are asked by the migration, "Do you want to setup encryption with the new channel in order to support old apps and facilitate the migration?", please agree. It will add a new "defaultChannel" option to your Capacitor config. This will make your app use the channel "encryption_v2". This will ensure that the new encryption is used only by apps that support it. Apps that have not received an app store update will continue using the previous default channel.

---

Now, you need to build your JS bundle and upload it to the new channel. Please run the following command:


```bash

npx @capgo/cli bundle upload --channel encryption_v2

```

---

Then, run this command to allow apps to self-assign to the channel "encryption_v2".


:::caution
This is necessary for the new "defaultChannel" option to work.
:::


```bash

npx @capgo/cli channel set encryption_v2 --self-assign

```

---

You can now run the app; it will use the new encryption system.

To upload the new JS bundle to the old channel, you only need to run the following command:

```bash
npx @capgo/cli bundle upload --channel production
```

---

You don't need to worry about Capacitor config, it is never uploaded to Capgo.

When all users have updated their apps (it can take up to 3/4 months), you can remove the "defaultChannel" from your Capacitor config.

And then, you can remove the old channel with the following command:

```bash
npx @capgo/cli channel delete encryption_v2
```

---

After deleting the "encryption_v2" channel, all apps that use it as the default will start using the "production" channel.
