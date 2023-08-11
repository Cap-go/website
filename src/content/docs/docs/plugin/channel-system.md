---
title: "Channel system"
sidebar:
  order: 6
---

With Capgo and capacitor-updater come a powerful channel system.

## What you can do with channels:

* Associate devices to channel for development, beta test or AB testing
* Use one channel by dev branch and let your team self assign from the phone to test

## You have 3 ways to assign device to channel:

* Make the channel default, each time a new device asks Capgo for update this one answer
* Send the **deviceId** (with [**getId**](/docs/plugin/api#getid) method) to your backend and send from your backend to Capgo the assign order
* Make the channel self assignable (with [**setChannel**](/docs/plugin/api#setchannel) method), and let the device subscribe to channel (with user interaction or not)

{% hint style="info" %}
You can also, for specific case, assign a device directly to a bundle, for debug purpose for example.
{% endhint %}

## Channel options

<figure><img src="/image (1).png" alt=""><figcaption></figcaption></figure>

Meaning of each:

* **Disable auto downgrade under native** => Don't send an update if the app native version is bigger than the channel one
* **Disable auto upgrade above major** => Don't send an update if the app native version is lower from a Major (**1**.2.3) than the channel one
* **Allow device to self assign** => Let a device use the `setChannel` method to this channel
* **IOS** => Allow iOS devices to download update from this channel
* **Android** => Allow android devices to download update from this channel
* **Allow Emulator** => Allow emulator to receive update
* **Allow development build** => Allow development build to receive update

> Capgo is doing some filtering for you. If you have CI/CD configured to send your version to Google PLAY, Google is running your app each time to 20+ real devices. During the 4 first hours of a new bundle, we block Google data center IP to prevent them to being counted.

> Capgo don't count emulator and dev build in your usage. Keep in mind after the trial you can't have more than 3% of them, or that will lock your account, until you fix it.
