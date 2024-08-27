---
title: "Encryption"
description: "How to encrypt your data with new encryption"
sidebar:
  order: 4
---

This documentation will explain how to encrypt your data with the new encryption system and remove the old one.

First create a new key pair with the following command:

```bash
npx @capgo/cli key create
```

This command will create a new key pair in your app, and will ask you to save the private key in a safe place. It's recommended to not git commit the private and public key, and to not share it with anyone.

This command will also remove the old key from your app. But will not remove the old key file, we will keep them to allow you still send live update for the old apps and make it easier to migrate.

When the command ask you "Do you want to setup encryption with new channel to support old apps and facilitate migration?" say yes it will make the app connect to channel "encryption_v2" and use the new encryption system only on it to make old apps still working.

Now you need to build your JS bundle and upload it to the new channel.

```bash
npx @capgo/cli bundle upload --channel encryption_v2
```

Now run this command to allow apps to self set to the channel "encryption_v2"

```bash
npx @capgo/cli channel set encryption_v2 --self-assign
```

You can now run the app it will use the new encryption system.

To upload the new JS bundle to the old channel, you only need to run the following command:

```bash
npx @capgo/cli bundle upload --channel production
```

You don't need to worry about Capacitor config it is never upload to Capgo.

When all users have updated their apps (count up to 3/4 months), you can remove the custom channel in the Capacitor config file under the key `defaultChannel`

And then you can remove the old channel with the following command:

```bash
npx @capgo/cli channel delete encryption_v2
```

All apps who still have the default channel set to "encryption_v2" will default to the "production" channel as "encryption_v2" is deleted.

