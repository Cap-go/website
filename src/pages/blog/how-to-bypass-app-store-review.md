---
title: How to update Capacitor Apps without the App Store review.
description: 'How can Capgo Feature allow you to push code updates to live iOS apps
  and be fully compliant with Apple’s guidelines? '
author: Martin Donadieu
date: 2022-01-13
head_image: "/bypass_illustration.webp"
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: "/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater"

---
_Glad you asked._

My lawyers asked me to let you know that this isn't legal advice, but you don't need a law degree to understand the wording in Apple's official guidelines. Apple’s guidelines explicitly permit you to push executable code directly to your app, bypassing the App Store, under these three conditions:

* The code is run by Apple's built-in WebKit framework
* The code does not provide, unlock or enable additional features or functionality
* The user doesn't see the update is happening

With Capgo capacitor plugin, you can only update and modify your HTML CSS and JavaScript, so we’re good on the first condition.

On a side note, the ability for apps to update themselves without the App Store has been around for a quite a while, though only for apps created using JavaScript frameworks such as Facebook's React Native and services such as Expo.

A proof that React Native is not more Native than Capacitor 😆

Capgo is simply the first affordable solution that provides the ability to push code-level updates to native Capacitor apps.
The second condition, no new features or functionality, is really up to you.

Capgo isn't intended to push new features or functionality. It is meant to tweak or fix them, avoiding the minor releases needed to fix bugs, add logging or tracking, update messages, force users to upgrade, etc.

For new features or functionality you need to release through the app store. FYI, Ionic AppFlow (the alternative for big corporate) is installed on over 50 million iOS devices and there's never been an app rejected because it uses it.

I'm just saying that because it's good to know that thousands of other developers are using live updates, so you're not alone.

Apple and google have they set of own rules on how to update apps.

For Apple [Take a look at paragraph 3.3.2](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf).
\[...\] The only exception to the foregoing is scripts and code downloaded and run by Apple's built-in WebKit framework or JavascriptCore \[...\] __TLDR__: we should use OTA updates only to fix bugs or make improvements without making significant changes.

__Google__ Play is less restrictive – they say that apps installed from Google Play with Javascript bundles [aren’t restricted](https://support.google.com/googleplay/android-developer/answer/9888379?hl=en) to update by Google services only.


Check our next article for more information on how to install Capgo to bypass review.