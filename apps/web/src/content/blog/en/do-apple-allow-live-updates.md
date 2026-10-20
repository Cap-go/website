---
slug: do-apple-allow-live-updates
title: Does Apple Allow Live Updates Without App Store Review?
description: >-
  Yes, within limits. Apple allows over-the-air updates of interpreted code like
  JavaScript, as long as the app keeps its purpose. Here is the exact rule and
  how it applies to Capacitor apps.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2026-10-20T00:21:49.000Z
head_image: /apple_appstore.webp
head_image_alt: "Does Apple Allow Live Updates Without App Store Review? Capgo blog illustration"
keywords: Apple, App Store, live updates, OTA updates, guideline 2.5.2, Capacitor, interpreted code, app review
tag: Tutorial
published: true
locale: en
origin: human
next_blog: ios-live-updates-allowed-stacks
faq:
  - question: Does Apple allow live updates without App Store review?
    answer: >-
      Yes, for interpreted code such as JavaScript, HTML and CSS. Apple's Developer Program License Agreement allows downloaded interpreted code as long as it does not change the primary purpose of the app, does not create a store for other code, and does not bypass iOS security. Native code (Swift, Objective-C, compiled binaries) still needs a new App Store submission.
  - question: Is Capgo compliant with App Store guideline 2.5.2?
    answer: >-
      Yes. Capgo only updates the web layer of a Capacitor app (JavaScript, HTML, CSS), which runs inside Apple's WebKit. It never downloads or executes native code. Compliance also depends on what you ship: keep updates within the purpose of the app you submitted.
  - question: Can I add new features with a live update on iOS?
    answer: >-
      Bug fixes, UI changes and improvements to existing flows are fine. Turning the app into a different product, unlocking hidden features, or shipping something that would fail review is not. When the change is large, submit it to the App Store.
  - question: Can Apple reject my app for using live updates?
    answer: >-
      Apple does not reject apps for the act of updating JavaScript. Rejections and removals happen when updates are used to change the app's purpose or hide behavior from reviewers. Thousands of apps ship live updates through Capgo, Expo and similar tools.
---

**Short answer: yes, Apple allows live updates, within limits.** You can push new JavaScript, HTML and CSS to an iOS app without a new App Store review, as long as the update does not change what the app is. You cannot download native code.

Most of the confusion comes from mixing two different things: live updates of interpreted code (allowed) and downloading new executable code (not allowed). This page quotes the rules, shows where the line is, and explains how Apple enforces it.

> This is not legal advice. It is how the rules read today and how thousands of apps use them in production.

## What Apple's rules actually say

Two texts matter. The first is [App Store Review Guideline 2.5.2](https://developer.apple.com/app-store/review/guidelines/#software-requirements):

> Apps should be self-contained in their bundles, and may not read or write data outside the designated container area, nor may they download, install, or execute code which introduces or changes features or functionality of the app, including other apps.

Read alone, that sounds like a ban. The exception lives in the second text, section 3.3.1(B) of the [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/), which every developer signs:

> Interpreted code may be downloaded to an Application but only so long as such code: (a) does not change the primary purpose of the Application by providing features or functionality that are inconsistent with the intended and advertised purpose of the Application as submitted to the App Store, (b) does not create a store or storefront for other code or applications, and (c) does not bypass signing, sandbox, or other security features of the OS.

So the rule is not "no downloaded code". It is "no downloaded **native** code, and interpreted code only under three conditions".

A Capacitor app's web layer is JavaScript, HTML and CSS running in `WKWebView`, which is Apple's own WebKit engine. That is interpreted code, so it falls under the exception. Guideline 4.7 points the same way: Apple explicitly lets apps run HTML5 and JavaScript content that is not embedded in the binary.

## Where the line is

| Allowed with a live update | Not allowed with a live update |
| --- | --- |
| Bug fixes in your JavaScript, HTML, CSS | Downloading Swift, Objective-C or any compiled binary |
| UI changes, copy changes, new screens in your existing web stack | Changing the app into a different product (a notes app becoming a casino) |
| A/B tests and gradual rollouts of web code | Unlocking features hidden from App Review |
| Updating images, translations, config | Building a store that installs other apps or code |
| Rolling back a bad release | Bypassing the iOS sandbox, signing or permissions |

Capgo only ships the left column. It replaces the web bundle inside your app. Anything native, such as a new Capacitor plugin, a new permission, or an SDK upgrade, still needs a regular App Store release. Capgo's [version targeting](/solutions/version-targeting/) makes sure a bundle that needs new native code never reaches an old binary.

## How Apple enforces it

Apple judges substance, not technology. Nobody gets pulled for fixing a typo over the air. The pattern Apple goes after is an app that passes review as one thing and becomes another thing afterwards. That is guideline 2.3.1 (no hidden or undocumented features) as much as 2.5.2.

In practice:

- Ship what you would have submitted, just faster.
- Keep every update within the purpose described in your App Store listing.
- Send big feature launches through App Review, and use live updates for fixes and iteration between releases.
- Never use a live update to switch on behavior that reviewers did not see.

If you follow that, live updates are a normal part of shipping an iOS app. React Native teams have done it for years with CodePush and Expo Updates, and Capacitor teams do it with Capgo.

## Which stacks can do it on iOS?

The rule allows interpreted code, so it depends on how your framework runs your code. Capacitor, Cordova and Ionic are fully covered because they run in WebKit. React Native can update its JavaScript bundle. Native Swift apps cannot. The full breakdown, stack by stack, is in [which stacks can use live updates on iOS](/blog/ios-live-updates-allowed-stacks/).

## Where to go next

- **Android answer:** [Does Google allow live updates without Play Store review?](/blog/do-google-allow-live-updates/)
- **Stack by stack:** [iOS](/blog/ios-live-updates-allowed-stacks/) and [Android](/blog/android-live-updates-allowed-stacks/)
- **Enforcement in detail:** [How Apple enforces OTA update restrictions](/blog/how-apple-enforces-ota-update-restrictions/)
- **Approval workflow:** [Capacitor OTA updates: App Store approval guide](/blog/capacitor-ota-updates-app-store-approval-guide/)
- **Real rejection stories:** [App Store refusal horror stories](/app-store-refusal-horror-story/)

## Ship fixes today, not after review

[Capgo live updates](/live-update/) push JavaScript, HTML and CSS changes to your Capacitor app in minutes, with channels, rollbacks, delta updates and end-to-end encryption. It is open source and can be self-hosted.

```bash
bunx @capgo/cli@latest init
```

Follow the [quickstart](/docs/getting-started/quickstart/) to send your first update.
