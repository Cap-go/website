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
updated_at: 2026-10-20T00:21:49.000Z
head_image: /playstore.webp
head_image_alt: "Does Google Allow Live Updates Without Play Store Review? Capgo blog illustration"
keywords: Google Play, Android, live updates, OTA updates, device and network abuse policy, Capacitor, interpreted code
tag: Tutorial
published: true
locale: en
origin: human
next_blog: android-live-updates-allowed-stacks
faq:
  - question: Does Google Play allow live updates without review?
    answer: >-
      Yes, for interpreted code. Google Play's Device and Network Abuse policy bans downloading executable code such as dex, JAR or .so files outside Google Play, but explicitly exempts code running in a virtual machine or interpreter, such as JavaScript in a WebView.
  - question: Is Capgo compliant with Google Play policy?
    answer: >-
      Yes. Capgo only updates the JavaScript, HTML and CSS of a Capacitor app, which runs in the Android WebView. It never downloads dex, JAR or native libraries. The updated code must still follow every other Google Play policy.
  - question: Can I update native Android code over the air?
    answer: >-
      No. Kotlin, Java and native libraries must ship through Google Play, either as a new release or through Play Feature Delivery. Only interpreted code can be updated from your own server.
  - question: Is Google stricter or looser than Apple on live updates?
    answer: >-
      Looser in wording. Google's exemption for interpreted code is written into the policy itself, with JavaScript in a WebView as the example. Apple allows the same thing but adds conditions about the app's primary purpose. In practice the same Capgo setup is compliant on both stores.
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

The exemption covers interpreted code and virtual machines, so it depends on how your framework runs your code. Capacitor, Cordova and Ionic are fully covered because they run in the WebView. React Native can update its JavaScript bundle. Native Kotlin or Java apps cannot. The full breakdown, stack by stack, is in [which stacks can use live updates on Android](/blog/android-live-updates-allowed-stacks/).

## Where to go next

- **iOS answer:** [Does Apple allow live updates without App Store review?](/blog/do-apple-allow-live-updates/)
- **Stack by stack:** [Android](/blog/android-live-updates-allowed-stacks/) and [iOS](/blog/ios-live-updates-allowed-stacks/)
- **Compliance checklist:** [Checklist for Google Play OTA compliance](/blog/checklist-for-google-play-ota-compliance/)
- **Release strategy:** [Google Play compliance: key update strategies](/blog/google-play-compliance-key-update-strategies/)

## Ship fixes today, not after review

[Capgo live updates](/live-update/) push JavaScript, HTML and CSS changes to your Capacitor app in minutes, with channels, rollbacks, delta updates and end-to-end encryption. It is open source and can be self-hosted.

```bash
bunx @capgo/cli@latest init
```

Follow the [quickstart](/docs/getting-started/quickstart/) to send your first update.
