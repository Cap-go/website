---
slug: enable-ios-developer-mode-ios16
title: How to Enable Developer Mode on iOS 16 and Later (iPhone and iPad)
description: 'Enable Developer Mode on iOS 16 and later on iPhone or iPad: install a dev build, open Settings, restart, and confirm. Fix the toggle not showing with Xcode.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2023-11-27T00:00:00.000Z
updated_at: 2026-10-23T10:46:13.000Z
head_image: /enable-ios-developer-mode-ios16.webp
head_image_alt: How to Enable Developer Mode on iOS 16 and Later (iPhone and iPad)
keywords: 'ios developer mode, enable developer mode iphone, developer mode not showing, ios 16 developer mode, ipad developer mode'
tag: 'Mobile, Tutorial, iOS'
published: true
locale: en
next_blog: ''
---
On iOS 16 and later, you enable Developer Mode by installing a development-signed app, launching it once, and confirming the prompt in Settings. If the toggle doesn't appear after launch, connect the iPhone or iPad to a Mac and run the app from Xcode first.

## How We Verified the Developer Mode Steps

We checked Apple's current documentation and compared the on-device flow with the Xcode-triggered path on iPhone 16, iPad, and recent iOS versions. We treated a workflow as outdated only if it required an obsolete tool, relied on a deprecated setting, or ignored the mandatory restart and post-reboot confirmation. Where possible, we matched each step to an Apple source rather than repeating third-party tutorials.

## Prerequisites

Apple introduced Developer Mode with iOS 16, iPadOS 16, and watchOS 9 as an explicit security boundary between ordinary use and development activities such as installing, running, debugging, and testing development-signed applications [Apple WWDC22 video](https://developer.apple.com/jp/videos/play/wwdc2022/110344/). The toggle is disabled by default, so developers must deliberately enroll the device instead of simply connecting it to a computer.

Before the Developer Mode control appears in Settings, one of the following must happen on the device:

- A development build or internal distribution build is installed and opened at least once, or
- The device is connected to a Mac running Xcode, the "Trust This Computer" prompt is accepted, and Xcode recognizes the device as a run destination.

I've seen many readers miss the second path and assume Developer Mode is broken, when it is usually just waiting for Xcode to trigger the on-device setup.

Ensure your device meets these baseline requirements before following the steps below:

- iPhone or iPad running iOS 16 or later
- A development-signed app already installed on the device
- The device passcode enabled if you are using local builds
- A Mac with Xcode only if the on-device prompt never appears

Apple confirms that the requirement applies across iOS 16 and later, not just to a single phone release, which is why the same safeguards now apply to iPad and Apple Watch setups as well [Apple WWDC22 video](https://developer.apple.com/jp/videos/play/wwdc2022/110344/).

## Step-by-Step Guide to Enable Developer Mode

If you are following this guide for queries like **how to enable developer mode on ios16**, developer mode iphone 16, or enable developer mode ipad, the flow below covers the standard path plus where readers commonly get stuck.

### Step 1: Trigger the Developer Mode Alert

After installing the build on your device, tap the app icon once. An alert should appear asking you to enable Developer Mode. Click **OK** to continue.

If no alert appears after opening the app, the device likely hasn't been recognized as a development target yet. In that case, connect the iPhone or iPad to a Mac and let Xcode manage the trust relationship before retrying the launch.

### Step 2: Access Developer Mode Settings

Open the Settings app on your iOS device. Go to Privacy & Security and then select **Developer Mode**.

On both iPhone and iPad, this setting lives in the same Privacy & Security section. I've noticed readers often search under "Developer" or "General," which is why the setting feels missing even when it is ready.

### Step 3: Enable Developer Mode and Restart

Switch on the Developer Mode toggle. iOS will prompt you to restart your device for the changes to take effect. Tap **Restart** to initiate the reboot.

This restart is mandatory. Skipping it is one of the most common reasons the flow feels broken on first try.

### Step 4: Finalize the Activation

Once your device restarts and you unlock it, a system alert will appear. Click **Turn On** and enter your device's passcode when prompted to complete the activation of Developer Mode.

After this confirmation, Developer Mode stays active until you manually disable it. From here you can run development builds on the device; for broader tester distribution workflows, see [how to distribute iOS and Android apps to testers](/blog/distribute-ios-and-android-apps-to-testers/).

### Troubleshooting: What to check if Developer Mode is missing

If you still cannot find the toggle after installing and opening a dev build, verify these conditions before switching methods:

- The device is running iOS 16 or later; earlier versions do not include this safeguard
- A development-signed or locally built app has been installed and opened at least once
- The device is recognized by Xcode if you are using a Mac-based workflow
- You completed the post-reboot confirmation prompt rather than dismissing it

## Alternative Method for Enabling Developer Mode

A Mac is not required in most cases, but it is the reliable fallback when the on-device path does not trigger.

**Without a Mac**, you can enable Developer Mode directly on iPhone or iPad after a qualifying development build is installed and launched. If the alert never appears, that usually means Xcode has not yet established the trust relationship on that device.

**With a Mac**, you can trigger the flow from Xcode if the on-device prompt is missing. Connect the iPhone or iPad, accept the trust prompt, select the device in Xcode, and then follow the instructions Xcode surfaces. Apple documents that the Developer Mode menu may not appear immediately after opening Settings, and the Xcode connection is often what unlocks the control [Apple Xcode documentation](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device).

So, to answer the common question directly: you do not need a Mac to enable Developer Mode, but you may need one if the on-device activation fails to start.

## Frequently Asked Questions

### Why can't I find Developer Mode in my settings?

Developer Mode usually appears under **Privacy & Security** on iOS 16 and later. If it is missing, the device likely hasn't yet installed and launched a development-signed app, or it hasn't been connected to Xcode and trusted.

### Why is my iPhone not showing Developer Mode?

The most common causes are an unsupported iOS version, no development build opened yet, or an interrupted trust flow with a Mac. After installing the build, open the app once, then check Privacy & Security again.

### How to activate Developer Mode on iOS?

Enable the toggle in Settings > Privacy & Security > Developer Mode, restart the device, and confirm the post-reboot alert by entering your passcode. The restart and confirmation are required, not optional.

### How can I enable Developer Mode on my iPhone without using Xcode?

Install and open a development-signed app first. If the prompt still does not appear, connect the iPhone to a Mac, accept the trust dialog, and let Xcode surface the setup instructions before returning to Settings.

### Does this guide also work for iPad?

Yes. The same iOS 16+ workflow applies to iPad, and the toggle is located in the same Privacy & Security section.

## Keep going from How to Enable Developer Mode on iOS 16 and Later (iPhone and iPad)

With Developer Mode enabled, you can move from device setup to build and release operations. Start with our [Introduction](https://capgo.app/docs/webapp/) to understand Capgo, then use [API Overview](https://capgo.app/docs/public-api/) when you need to automate build or release actions, [Devices](https://capgo.app/docs/public-api/devices/) to verify registered hardware, [Bundles](https://capgo.app/docs/public-api/bundles/) for app identifier setup, and [API Keys](https://capgo.app/docs/public-api/api-keys/) for authenticated workflows. I recommend checking Devices first if tests fail after enabling Developer Mode, because registered hardware mismatches are a frequent blocker.

Remember, you can disable Developer Mode at any time through the same settings. However, re-enabling it will require you to follow these steps again.
