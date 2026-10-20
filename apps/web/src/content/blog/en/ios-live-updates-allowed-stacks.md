---
slug: ios-live-updates-allowed-stacks
title: 'Which Stacks Can Use Live Updates on iOS? Capacitor, React Native, Flutter, Swift'
description: >-
  Apple allows live updates of interpreted code only. Here is which iOS stacks
  can ship over-the-air updates without App Store review: Capacitor, Cordova,
  Ionic, React Native, Flutter, Swift, .NET MAUI, Unity and more.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-19T00:00:00.000Z
updated_at: 2026-10-19T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: "Which stacks can use live updates on iOS? Capgo blog illustration"
keywords: iOS live updates, OTA updates, Capacitor, React Native, Flutter, Swift, Cordova, Ionic, App Store guideline 2.5.2, code push
tag: Tutorial
published: true
locale: en
origin: human
next_blog: android-live-updates-allowed-stacks
faq:
  - question: Which iOS frameworks can use live updates?
    answer: >-
      Frameworks whose app logic is interpreted code: Capacitor, Cordova and Ionic (JavaScript in WebKit), React Native and Expo (JavaScript bundle), and NativeScript. Flutter needs a third-party interpreter such as Shorebird. Native Swift, Objective-C, .NET MAUI and Kotlin Multiplatform apps cannot update their code over the air.
  - question: Can a native Swift app use live updates?
    answer: >-
      Not for code. Swift compiles to machine code, and Apple forbids downloading native code. A Swift app can still update data, remote config, images and server-driven UI, but new logic needs an App Store release.
  - question: Can Flutter apps use live updates on iOS?
    answer: >-
      Not out of the box. Flutter compiles Dart ahead of time to native code on iOS. Shorebird adds a Dart interpreter for patched code so updates run as interpreted code, which is how it stays inside Apple's rules.
  - question: Is Capacitor the safest stack for live updates on iOS?
    answer: >-
      It is the cleanest case. The whole app UI and logic run as JavaScript inside Apple's own WebKit engine, which is exactly the type of code Apple's rules exempt. Capgo updates that layer and leaves the native binary untouched.
---

Apple allows live updates of **interpreted code** and forbids downloading **native code**. Whether your app can ship over-the-air updates on iOS depends on one question: is your app logic interpreted at runtime, or compiled to machine code?

The rules behind this are explained in [Does Apple allow live updates?](/blog/do-apple-allow-live-updates/). This page applies them to each stack. For the Android version, see [which stacks can use live updates on Android](/blog/android-live-updates-allowed-stacks/).

## The rule in one sentence

Section 3.3.1(B) of Apple's Developer Program License Agreement allows downloaded interpreted code if it does not change the app's primary purpose, does not create a store for other code, and does not bypass iOS security. Guideline 2.5.2 forbids everything else.

So: JavaScript and other interpreted code, yes. Swift, Objective-C, C++ and anything compiled ahead of time, no.

## iOS live update compatibility by stack

| Stack | How the code runs on iOS | Live updates allowed? | Tooling |
| --- | --- | --- | --- |
| **Capacitor** | JavaScript, HTML, CSS in WKWebView (WebKit) | Yes | [Capgo](/live-update/), Ionic Appflow |
| **Ionic** (on Capacitor) | Same as Capacitor | Yes | [Capgo](/live-update/) |
| **Cordova** | JavaScript in WKWebView | Yes | [Capgo after migrating to Capacitor](/solutions/cordova-to-capacitor/), legacy Cordova plugins |
| **React Native / Expo** | JavaScript bundle on Hermes or JavaScriptCore | Yes, JavaScript only | Expo Updates, self-hosted CodePush alternatives |
| **NativeScript** | JavaScript on an embedded engine | Yes, JavaScript only | Limited, mostly self-built |
| **Flutter** | Dart compiled AOT to machine code | Only through an interpreter | Shorebird (Dart interpreter for patches) |
| **Native Swift / Objective-C** | Machine code | No | Remote config and server-driven UI only |
| **.NET MAUI / Xamarin** | C# compiled AOT to machine code | No | Remote config only |
| **Kotlin / Compose Multiplatform** | Kotlin/Native compiled to machine code | No | Remote config only |
| **Unity / Unreal** | C# via IL2CPP or C++, compiled | No for code, yes for content | Asset bundles, scripted content (Lua) |
| **Web wrapper (remote URL)** | Website loaded in a WebView | Always live, but review risk | None needed, see note below |

## Stack by stack

### Capacitor, Ionic and Cordova: fully covered

Your entire UI and business logic is JavaScript running in WKWebView, Apple's own WebKit engine. Apple's rules were written with exactly this case in mind, and guideline 4.7 explicitly accepts HTML5 and JavaScript content not embedded in the binary.

A live update replaces the web bundle. The native shell, plugins and permissions stay the ones Apple reviewed. That is why Capgo is compliant by design: it cannot change native code even if you wanted it to. New native plugins or permissions still need an App Store release.

### React Native and Expo: JavaScript yes, native modules no

React Native runs your JavaScript bundle on Hermes or JavaScriptCore. That bundle is interpreted code and can be updated over the air, which is what Expo Updates and Microsoft CodePush (retired in 2025) were built for. [Teams leaving CodePush](/migrate/from-codepush/) need a replacement.

Any change to native modules, the React Native version, or `Info.plist` needs a new binary.

### Flutter: only through an interpreter

On iOS, Flutter compiles Dart ahead of time to ARM machine code. Downloading new machine code is forbidden, so stock Flutter cannot use live updates. Shorebird solves this by running patched Dart code in an interpreter, which brings it under the interpreted code exception. Read more in [live updates for Flutter apps](/blog/live-updates-for-flutter-app/).

### Native Swift, .NET MAUI, Kotlin Multiplatform: no code updates

These stacks produce machine code. There is no compliant way to download new logic. What you can do over the air is change data: remote config, feature flags for features already reviewed, server-driven UI, images and copy.

### Unity and game engines: content yes, code no

Game code is compiled. Asset bundles (levels, art, balancing data) are content and can be downloaded. Embedded scripting languages like Lua are interpreted code and follow the same rules as JavaScript.

### Remote URL wrappers: live, but risky for review

An app that only loads your website in a WebView is "updated" every time you deploy the site. The problem is not guideline 2.5.2 but guideline 4.2 (minimum functionality): Apple rejects apps that are just a website in a frame. Bundling the web app with Capacitor, adding native features, and using live updates avoids that.

## What no stack can do on iOS

Whatever your framework, a live update cannot:

- Download native code, frameworks or dynamic libraries
- Add new permissions or entitlements
- Change the app into something the App Store listing does not describe
- Turn on features that were hidden from App Review

## Where to go next

- **The rules:** [Does Apple allow live updates?](/blog/do-apple-allow-live-updates/)
- **Android version of this page:** [Which stacks can use live updates on Android?](/blog/android-live-updates-allowed-stacks/)
- **Google Play rules:** [Does Google allow live updates?](/blog/do-google-allow-live-updates/)
- **How it works:** [How live updates for Capacitor work](/blog/how-live-updates-for-capacitor-work/)

## Ship live updates on iOS with Capgo

If you build with Capacitor, Ionic or Cordova, [Capgo live updates](/live-update/) send your web changes to iOS users in minutes, with channels, rollbacks, delta updates and end-to-end encryption.

```bash
bunx @capgo/cli@latest init
```

Follow the [quickstart](/docs/getting-started/quickstart/) to send your first update.
