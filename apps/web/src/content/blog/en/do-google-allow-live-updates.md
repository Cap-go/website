---
slug: do-google-allow-live-updates
title: Does Google Allow Live Updates Without Play Store Review?
description: >-
  Yes. Google Play allows over-the-air updates of interpreted code like
  JavaScript in a WebView, but bans downloading dex, JAR or .so files. Here is
  the exact policy and how it applies to Capacitor apps.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2026-10-23T00:00:00.000Z
head_image: /blog-images/do-google-allow-live-updates.png
head_image_alt: "Does Google Allow Live Updates Without Play Store Review? Capgo blog illustration"
keywords: Google Play, Android, live updates, OTA updates, device and network abuse policy, Capacitor, React Native, Flutter, Kotlin, Cordova, Ionic, interpreted code
tag: Tutorial
published: true
locale: en
origin: human
next_blog: do-apple-allow-live-updates
faq:
  - question: Does Google Play allow live updates without review?
    answer: >-
      Yes, for interpreted code. Google Play's Device and Network Abuse policy bans downloading executable code such as dex, JAR or .so files outside Google Play, but explicitly exempts code running in a virtual machine or interpreter, such as JavaScript in a WebView.
  - question: Is Capgo compliant with Google Play policy?
    answer: >-
      Yes. Google Play's policy uses "JavaScript in a webview" as its own example of allowed downloaded code. Capgo only updates the JavaScript, HTML and CSS of a Capacitor app in the Android WebView. It never downloads dex, JAR or native libraries. The updated code must still follow every other Google Play policy.
  - question: Can I update native Android code over the air?
    answer: >-
      Not for native code. Kotlin, Java and native libraries must ship through Google Play, either as a new release or through Play Feature Delivery. A Kotlin or Java app that hosts a WebView can still update its JavaScript, HTML and CSS from your server. Only interpreted code can be updated that way.
  - question: Is Google stricter or looser than Apple on live updates?
    answer: >-
      Looser in wording. Google's exemption for interpreted code is written into the policy itself, with JavaScript in a WebView as the example. Apple allows the same thing but adds conditions about the app's primary purpose. In practice the same Capgo setup is compliant on both stores.
  - question: Which Android frameworks can use live updates?
    answer: >-
      Frameworks whose app logic is interpreted code: Capacitor, Cordova and Ionic (JavaScript in the WebView), React Native and Expo (JavaScript bundle), and NativeScript. Flutter relies on Shorebird, which runs patches through the Dart VM. Native Kotlin and Java apps cannot download new code outside Google Play.
  - question: Can Flutter apps use live updates on Android?
    answer: >-
      Stock Flutter cannot, because Dart is compiled to a native library. Shorebird adds code push and states it complies with Google Play policy by running updates in the Dart virtual machine. Check its documentation for the current approach.
---

**Short answer: yes, Google Play allows live updates of interpreted code.** You can push new JavaScript, HTML and CSS to an Android app without a new Play Store review. You cannot download native code such as dex, JAR or `.so` files.

Google is clearer than Apple here: the exemption for JavaScript in a WebView is written directly into the policy. This page quotes it, shows where the line is, and explains how Google enforces it.

> This is not legal advice. It is how the policy reads today and how thousands of apps use it in production.

## What Google Play's policy actually says

The rule is in the [Device and Network Abuse policy](https://support.google.com/googleplay/android-developer/answer/16559646):

> An app distributed via Google Play may not modify, replace, or update itself using any method other than Google Play's update mechanism. Likewise, an app may not download executable code (such as dex, JAR, .so files) from a source other than Google Play. This restriction does not apply to code that runs in a virtual machine or an interpreter where either provides indirect access to Android APIs (such as JavaScript in a webview or browser).

And right after:

> Apps or third-party code, like SDKs, with interpreted languages (JavaScript, Python, Lua, etc.) loaded at run time (for example, not packaged with the app) must not allow potential violations of Google Play policies.

So there are two rules:

1. **Native code only comes from Google Play.** No downloaded dex, JAR or native libraries.
2. **Interpreted code can come from anywhere,** but what it does must still follow every Play policy.

A Capacitor app's web layer is JavaScript, HTML and CSS running in the Android WebView, the exact example Google gives. It falls inside the exemption.

## Where the line is

| Allowed with a live update | Not allowed with a live update |
| --- | --- |
| Bug fixes in your JavaScript, HTML, CSS | Downloading dex, JAR, APK or `.so` files |
| UI changes, copy changes, new screens in your existing web stack | Replacing the app outside Google Play's update mechanism |
| A/B tests and staged rollouts of web code | Shipping code that breaks Play policy (deceptive behavior, malware, policy-violating content) |
| Updating images, translations, config | Turning the app into something the listing does not describe |
| Rolling back a bad release | Bypassing Android permissions or security |

Capgo only ships the left column. Anything native, such as a new Capacitor plugin, a new permission in `AndroidManifest.xml`, or a Gradle dependency, still needs a new release through Google Play. Capgo's [version targeting](/solutions/version-targeting/) keeps bundles that need new native code away from old binaries.

## How Google enforces it

Google scans apps for downloaded executable code and for behavior that changes after install. The automated checks look for loading dex or native libraries from outside the APK. JavaScript in a WebView does not trigger them.

The real risk is the second rule: if a live update makes the app do something Play policy forbids, it is a violation no matter how the code arrived. Deceptive behavior policy also applies to apps whose function changes after review.

In practice:

- Use live updates for fixes and iteration on the app you published.
- Keep the app consistent with your Play Store listing and Data safety form.
- Ship native changes and big launches through Google Play, with [staged rollouts](/blog/google-play-staged-rollouts-how-it-works/) if you want them gradual.

## Which stacks can do it on Android?

Whether your app can ship over-the-air updates on Android depends on one question: is your app logic interpreted at runtime? JavaScript and other interpreted code, yes. Downloaded dex, JAR and native `.so` files, no. AOT-compiled frameworks such as Flutter qualify only through a VM or interpreter.

### Android live update compatibility by stack

| Stack | How the code runs on Android | Live updates allowed? | Tooling |
| --- | --- | --- | --- |
| **Capacitor** | JavaScript, HTML, CSS in the Android WebView | Yes | [Capgo](/live-update/) |
| **Ionic** (on Capacitor) | Same as Capacitor | Yes | [Capgo](/live-update/) |
| **Cordova** | JavaScript in the Android WebView | Yes | [Capgo after migrating to Capacitor](/solutions/cordova-to-capacitor/), legacy Cordova plugins |
| **React Native / Expo** | JavaScript bundle on Hermes | Yes, JavaScript only | Expo Updates, self-hosted CodePush alternatives |
| **NativeScript** | JavaScript on V8 | Yes, JavaScript only | Limited, mostly self-built |
| **Flutter** | Dart compiled AOT into a native library | Only through a VM or interpreter | Shorebird |
| **Native Kotlin / Java** | dex bytecode on ART | No for native code; yes for JavaScript in a WebView | Remote config, Play Feature Delivery |
| **Kotlin / Compose Multiplatform** | dex bytecode on ART | No | Remote config, Play Feature Delivery |
| **.NET MAUI / Xamarin** | .NET runtime plus native libraries shipped in the APK | No | Remote config only |
| **Unity / Unreal** | C# via IL2CPP or C++, compiled | No for code, yes for content | Asset bundles, Play Asset Delivery, scripted content (Lua) |
| **Web wrapper / TWA** | Website loaded in a WebView or Chrome | Always live | None needed |

### Capacitor, Ionic and Cordova: fully covered

Your UI and business logic is JavaScript running in the Android WebView, the exact example Google's policy gives for allowed code. A live update replaces the web bundle; the APK, native plugins and permissions stay the ones you published.

Capgo is compliant by design because it can only change the web layer. New native plugins, new permissions in `AndroidManifest.xml` and Gradle dependency changes still need a Google Play release.

### React Native and Expo: JavaScript yes, native modules no

React Native runs a JavaScript bundle on Hermes, which counts as interpreted code. Expo Updates and the now retired Microsoft CodePush update that bundle. [Teams leaving CodePush](/migrate/from-codepush/) need a replacement. Native modules and React Native upgrades need a new release.

### Flutter: only through a VM or interpreter

Flutter compiles Dart ahead of time into `libapp.so`. Downloading a new `.so` is explicitly banned, so stock Flutter cannot use live updates. Shorebird adds code push and states that it complies with Play policy by running updates through the Dart virtual machine. Read more in [live updates for Flutter apps](/blog/live-updates-for-flutter-app/).

### Native Kotlin, Java and Kotlin Multiplatform: no code updates

Loading downloaded dex or JAR files with `DexClassLoader` is the exact behavior the policy bans. Google's own alternative is [Play Feature Delivery](https://developer.android.com/guide/playcore/feature-delivery), which downloads code modules through Google Play. Otherwise, native code cannot change. A Kotlin or Java app that hosts JavaScript in a WebView can still update that code, because the policy exempts interpreted code. Other native logic is limited to remote config, feature flags and server-driven UI.

### Unity and game engines: content yes, code no

Game code is compiled. Asset bundles and Play Asset Delivery handle content, and embedded scripting languages like Lua are interpreted code, which the policy allows as long as the result follows Play policy.

### Web wrappers and Trusted Web Activities: live by nature

A Trusted Web Activity or WebView wrapper loads your website, so it updates every time you deploy. Google Play accepts TWAs. Offline caching and native bridges depend on what that wrapper implements: a TWA can use your PWA service worker, and a WebView shell can expose JavaScript bridges if you build them. A bundled Capacitor app ships the web bundle in the APK and adds a consistent plugin layer for live updates.

### What no stack can do on Android

Whatever your framework, a live update cannot:

- Download dex, JAR, APK or native `.so` files outside Google Play
- Add new Android permissions
- Make the app do something Google Play policy forbids
- Change the app into something the Play Store listing does not describe

## Where to go next

- **iOS answer:** [Does Apple allow live updates without App Store review?](/blog/do-apple-allow-live-updates/)
- **Compliance checklist:** [Checklist for Google Play OTA compliance](/blog/checklist-for-google-play-ota-compliance/)
- **Release strategy:** [Google Play compliance: key update strategies](/blog/google-play-compliance-key-update-strategies/)

## Ship fixes today, not after review

[Capgo live updates](/live-update/) push JavaScript, HTML and CSS changes to your Capacitor app in minutes, with channels, rollbacks, delta updates and end-to-end encryption. It is open source and can be self-hosted.

```bash
bunx @capgo/cli@latest init
```

Follow the [quickstart](/docs/getting-started/quickstart/) to send your first update.
