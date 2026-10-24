---
slug: apple-remote-code-execution-capgo-live-updates
title: Apple Remote Code Rules and Capgo Live Updates
description: >-
  App Review Guideline 2.5.2, ADPLA 3.3.1(B), and the 2025 Guideline 4.7 mini app
  clarification target native remote code and open software catalogs. Signed JavaScript
  in your Capacitor WebView can still qualify as interpreted code when you keep the
  app's reviewed purpose, respect OS security, and stay within ADPLA 3.3.1(C). Here is
  how Capgo fits that model.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-10-23T20:00:00.000Z
updated_at: 2026-10-23T20:00:00.000Z
head_image: /blog-images/apple-remote-code-execution-capgo-live-updates.png
head_image_alt: "Apple remote code execution rules and Capgo live updates Capgo blog illustration"
keywords: Apple, App Store, Guideline 2.5.2, remote code execution, Capgo, Capacitor live updates, OTA, ADPLA 3.3.1, Guideline 4.7, WebView, compliance
tag: Tutorial
published: true
locale: en
origin: human
next_blog: do-apple-allow-live-updates
faq:
  - question: Does Apple's remote code execution rule ban Capgo?
    answer: >-
      For typical Capacitor use, Capgo stays on the interpreted-code path. Guideline 2.5.2 blocks downloading or executing
      code that introduces or changes app features after review, especially native
      code and dynamic loading. Capgo delivers signed JavaScript, HTML, CSS, and
      assets into the WebView or JavaScriptCore engine already in your binary, which
      Apple treats as interpreted code under ADPLA section 3.3.1(B) when your team
      stays within the app's reviewed purpose. Apple still decides each app on its
      facts.
  - question: What changed in Apple's November 2025 App Review Guidelines?
    answer: >-
      Apple clarified Guideline 4.7 for apps that offer HTML5 and JavaScript mini
      apps, mini games, chatbots, and plug-ins that are not embedded in the binary.
      That is about user-facing software catalogs and extra age-rating rules, not
      about updating your own Capacitor web bundle through channels.
  - question: Where can I read Capgo's compliance checklist?
    answer: >-
      See the Apple remote code section in the Capgo compliance docs and the
      Capacitor live updates product page for how channels, signing, and native
      boundaries work in practice.
---

Teams shipping [Capacitor live updates](/live-update/) keep asking the same question after Apple review emails mention **remote code execution**: does that block Capgo?

**For most Capacitor apps, no.** Capgo replaces the web bundle your app already runs. It does not download Swift, frameworks, or bytecode, and it does not turn your product into a mini app store. The rules Apple cites are real, but they target a different class of behavior than signed JavaScript delivered to `WKWebView` or JavaScriptCore.

> This is engineering guidance, not legal advice. Read Apple's published text and involve counsel for your app.

## The three texts reviewers cite

### App Review Guideline 2.5.2

[Guideline 2.5.2](https://developer.apple.com/app-store/review/guidelines/#software-requirements) says apps may not "download, install, or execute code which introduces or changes features or functionality of the app, including other apps."

Review teams use that line when they see:

- `dlopen`, `dlsym`, or similar dynamic loading,
- `performSelector:` and other runtime hooks toward private APIs, or
- remote scripts whose job is to change native behavior after approval.

That is the **remote code execution** pattern in rejection letters. It is not a ban on every byte downloaded after install.

### ADPLA section 3.3.1(B) (interpreted code)

The [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/apple-developer-program-license-agreement/) section **3.3.1(B)** allows **interpreted code** to be downloaded when it:

1. does not change the app's primary purpose,
2. does not bypass signing, sandbox, or other OS security features, and
3. does not create a store or storefront for other applications.

Capacitor's web layer is interpreted code by design. [Capgo](https://capgo.app/) swaps that layer after your users install the reviewed binary from the App Store.

### ADPLA section 3.3.1(C) (additional features)

Section **3.3.1(C)** adds another guardrail: without Apple's prior written approval or a permitted **3.3.9(A)** In-App Purchase use, an app may not provide, unlock, or enable additional features or functionality through distribution mechanisms other than the App Store, Custom App Distribution, or TestFlight.

Whether a specific OTA bundle crosses that line is a legal call for your team. Capgo does not make it for you. The [compliance checklist](/docs/live-updates/compliance/#apple-remote-code-execution-and-capgo) names 3.3.1(C) so you can assess each release.

## Guideline 4.7 and the November 2025 clarification

[Apple's November 13, 2025 guideline refresh](https://developer.apple.com/news/?id=ey6d8onl) clarified [Guideline 4.7](https://developer.apple.com/app-store/review/guidelines/#third-party-software) for apps that offer HTML5 and JavaScript **mini apps**, mini games, chatbots, plug-ins, and similar software **not embedded in the binary**.

If users browse or launch many distinct software experiences inside your app, you may need 4.7's catalog, indexing, and age-rating mechanics. Ownership of the bundles does not decide the question. The **experience you ship** does.

Capgo is a delivery channel for **your** bundles on **your** channels. It is not, by itself, a 4.7 marketplace. If your product is a white-label host or mini app platform, treat 4.7 seriously before you rely on OTA.

## What Capgo actually ships

| Layer | Capgo behavior |
| --- | --- |
| Native binary | Unchanged. New plugins, permissions, and entitlements need a store build. |
| Web assets | Signed JavaScript, HTML, CSS, fonts, images, and static files replace the in-app bundle. |
| Execution | Runs inside the WebView or JavaScriptCore engine Apple already approved with your shell. |
| Encryption | Optional end-to-end encryption keeps bundle contents unreadable by Capgo in transit and storage. |

Capgo helps you ship web-layer fixes in minutes, roll back bad bundles on a channel, and keep native releases on the App Store path. Thousands of production apps use that split without turning live updates into a remote native loader.

## Practical rules for your team

- Use OTA for bugs, UI, copy, and improvements inside the product Apple reviewed.
- Submit a new binary when native code, SDKs, permissions, or entitlements change.
- Do not use live updates to change pricing models, unlock hidden features, or pivot the app's purpose.
- Document how updates work in App Review notes when asked.
- Read the full [Apple remote code and Capgo](/docs/live-updates/compliance/#apple-remote-code-execution-and-capgo) section before your next release.

When you want the product view (channels, rollback, signing), start at [Capacitor live updates](/live-update/). When you want the policy deep dive, use the compliance doc above or the older walkthrough in [Does Apple allow live updates?](/blog/do-apple-allow-live-updates/).
