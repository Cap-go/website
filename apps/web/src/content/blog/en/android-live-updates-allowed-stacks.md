---
slug: android-live-updates-allowed-stacks
title: 'Which Stacks Can Use Live Updates on Android? Capacitor, React Native, Flutter, Kotlin'
description: >-
  Google Play allows live updates of interpreted code but bans downloaded dex,
  JAR and .so files. Here is which Android stacks can ship over-the-air updates:
  Capacitor, Cordova, Ionic, React Native, Flutter, Kotlin and more.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-19T00:00:00.000Z
updated_at: 2026-10-20T00:21:49.000Z
head_image: /playstore.webp
head_image_alt: "Which stacks can use live updates on Android? Capgo blog illustration"
keywords: Android live updates, OTA updates, Google Play policy, Capacitor, React Native, Flutter, Kotlin, Cordova, Ionic, code push
tag: Tutorial
published: true
locale: en
origin: human
next_blog: ios-live-updates-allowed-stacks
faq:
  - question: Which Android frameworks can use live updates?
    answer: >-
      Frameworks whose app logic is interpreted code: Capacitor, Cordova and Ionic (JavaScript in the WebView), React Native and Expo (JavaScript bundle), and NativeScript. Flutter relies on Shorebird, which runs patches through the Dart VM. Native Kotlin and Java apps cannot download new code outside Google Play.
  - question: Can a Kotlin or Java app use live updates?
    answer: >-
      Not for code. Google Play bans downloading dex, JAR or .so files from outside Google Play. Native apps can use remote config, server-driven UI, or Play Feature Delivery, which downloads modules through Google Play itself.
  - question: Can Flutter apps use live updates on Android?
    answer: >-
      Stock Flutter cannot, because Dart is compiled to a native library. Shorebird adds code push and states it complies with Google Play policy by running updates in the Dart virtual machine. Check its documentation for the current approach.
  - question: Is Capacitor compliant with Google Play for live updates?
    answer: >-
      Yes. Google Play's policy uses "JavaScript in a webview" as its own example of allowed downloaded code. Capgo updates only that layer of a Capacitor app and never touches native code.
---

Google Play allows live updates of **interpreted code** and bans downloading **native code** (dex, JAR, `.so`). Whether your app can ship over-the-air updates on Android depends on one question: is your app logic interpreted at runtime, or compiled to Android bytecode or machine code?

The policy behind this is explained in [Does Google allow live updates?](/blog/do-google-allow-live-updates/). This page applies it to each stack. For the iOS version, see [which stacks can use live updates on iOS](/blog/ios-live-updates-allowed-stacks/).

## The rule in one sentence

Google Play's Device and Network Abuse policy forbids downloading executable code from outside Google Play, except code that runs in a virtual machine or interpreter with indirect access to Android APIs, "such as JavaScript in a webview or browser". That code must still follow every Play policy.

So: JavaScript and other interpreted code, yes. Kotlin, Java, dex, JAR and native libraries, no.

## Android live update compatibility by stack

| Stack | How the code runs on Android | Live updates allowed? | Tooling |
| --- | --- | --- | --- |
| **Capacitor** | JavaScript, HTML, CSS in the Android WebView | Yes | [Capgo](/live-update/), Ionic Appflow |
| **Ionic** (on Capacitor) | Same as Capacitor | Yes | [Capgo](/live-update/) |
| **Cordova** | JavaScript in the Android WebView | Yes | [Capgo after migrating to Capacitor](/solutions/cordova-to-capacitor/), legacy Cordova plugins |
| **React Native / Expo** | JavaScript bundle on Hermes | Yes, JavaScript only | Expo Updates, self-hosted CodePush alternatives |
| **NativeScript** | JavaScript on V8 | Yes, JavaScript only | Limited, mostly self-built |
| **Flutter** | Dart compiled AOT into a native library | Only through a VM or interpreter | Shorebird |
| **Native Kotlin / Java** | dex bytecode on ART | No | Remote config, Play Feature Delivery |
| **Kotlin / Compose Multiplatform** | dex bytecode on ART | No | Remote config, Play Feature Delivery |
| **.NET MAUI / Xamarin** | .NET runtime plus native libraries shipped in the APK | No | Remote config only |
| **Unity / Unreal** | C# via IL2CPP or C++, compiled | No for code, yes for content | Asset bundles, Play Asset Delivery, scripted content (Lua) |
| **Web wrapper / TWA** | Website loaded in a WebView or Chrome | Always live | None needed |

## Stack by stack

### Capacitor, Ionic and Cordova: fully covered

Your UI and business logic is JavaScript running in the Android WebView, the exact example Google's policy gives for allowed code. A live update replaces the web bundle; the APK, native plugins and permissions stay the ones you published.

Capgo is compliant by design because it can only change the web layer. New native plugins, new permissions in `AndroidManifest.xml` and Gradle dependency changes still need a Google Play release.

### React Native and Expo: JavaScript yes, native modules no

React Native runs a JavaScript bundle on Hermes, which counts as interpreted code. Expo Updates and the now retired Microsoft CodePush update that bundle. [Teams leaving CodePush](/migrate/from-codepush/) need a replacement. Native modules and React Native upgrades need a new release.

### Flutter: only through a VM or interpreter

Flutter compiles Dart ahead of time into `libapp.so`. Downloading a new `.so` is explicitly banned, so stock Flutter cannot use live updates. Shorebird adds code push and states that it complies with Play policy by running updates through the Dart virtual machine. Read more in [live updates for Flutter apps](/blog/live-updates-for-flutter-app/).

### Native Kotlin, Java and Kotlin Multiplatform: no code updates

Loading downloaded dex or JAR files with `DexClassLoader` is the exact behavior the policy bans. Google's own alternative is [Play Feature Delivery](https://developer.android.com/guide/playcore/feature-delivery), which downloads code modules through Google Play. Outside of that, you are limited to remote config, feature flags and server-driven UI.

### Unity and game engines: content yes, code no

Game code is compiled. Asset bundles and Play Asset Delivery handle content, and embedded scripting languages like Lua are interpreted code, which the policy allows as long as the result follows Play policy.

### Web wrappers and Trusted Web Activities: live by nature

A Trusted Web Activity or WebView wrapper loads your website, so it updates every time you deploy. Google Play accepts TWAs. You lose offline support and native plugins, which is where a bundled Capacitor app with live updates fits better.

## What no stack can do on Android

Whatever your framework, a live update cannot:

- Download dex, JAR, APK or native `.so` files outside Google Play
- Add new Android permissions
- Make the app do something Google Play policy forbids
- Change the app into something the Play Store listing does not describe

## Where to go next

- **The policy:** [Does Google allow live updates?](/blog/do-google-allow-live-updates/)
- **iOS version of this page:** [Which stacks can use live updates on iOS?](/blog/ios-live-updates-allowed-stacks/)
- **Apple rules:** [Does Apple allow live updates?](/blog/do-apple-allow-live-updates/)
- **Compliance checklist:** [Checklist for Google Play OTA compliance](/blog/checklist-for-google-play-ota-compliance/)

## Ship live updates on Android with Capgo

If you build with Capacitor, Ionic or Cordova, [Capgo live updates](/live-update/) send your web changes to Android users in minutes, with channels, rollbacks, delta updates and end-to-end encryption.

```bash
bunx @capgo/cli@latest init
```

Follow the [quickstart](/docs/getting-started/quickstart/) to send your first update.
