---
title: "Channel system"
description: "How to use the channel system with capacitor-updater"
sidebar:
  order: 6
---

Capgo and capacitor-updater comes with a powerful channel system.

## What you can do with channels:

* Associate devices to channel for development, beta test, or AB testing
* Use one channel by dev branch and let your team self-assign from the phone to test

## Assigning devices to a channel:

* Make the channel default, each time a new device asks Capgo for an update this channel will answer
* Send the **deviceId** (with [**getDeviceId**](/docs/plugin/api#getdeviceid) method) to your backend and assign it with Capgo public API
* Make the channel self-assignable (with [**setChannel**](/docs/plugin/api#setchannel) method), and let the device subscribe to the channel (with user interaction or not) with method `setChannel` of the plugin.
* Use the option `defaultChannel` in the [config](/docs/plugin/settings#defaultchannel) to set the default channel for all devices with this plugin configuration.

:::note
You can also assign a device directly to a bundle. 
:::

## Channel options

<figure><img src="/channel_setting_1.webp" alt=""><figcaption></figcaption></figure>

Details of each option:

| Option                                  | Description                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Disable auto downgrade under native** | Don't send an update if the app's native version is bigger than the channel one                       |
| **Disable auto upgrade above major**    | Don't send an update if the app native version is lower then a Major (**1**.2.3) from the channel one |
| **Disable auto upgrade above minor**    | Don't send an update if the app native version is lower then a minor (1.**2**.3) from the channel one |
| **Allow the device to self-assign**     | Let a device use the `setChannel` method to this channel                                              |
| **IOS**                                 | Allow IOS devices to download updates from this channel                                               |
| **Android**                             | Allow Android devices to download updates from this channel                                           |
| **Allow Emulator**                      | Allow emulators to receive updates from this channel                                                  |
| **Allow development build**             | Allow development build to receive update from this channel                                           |

:::note
Capgo is doing some automatic filtering for you. If you have a CI/CD configured to send your version to Google Play, Google Play will run your app each time to 20+ real devices. During the first 4 hours of a new bundle, we will block Google data center IPs to prevent them from being counted in your stats.
:::

:::note 
Capgo **does not** count emulator and dev builds in your usage, but keep in mind that you can't have more than 3% of them, or your account will be locked until you fix it.
:::
