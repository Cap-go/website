---
slug: privacy-manifest-for-ios-apps
title: Privacy Manifest for iOS Apps
description: "2026 compliance and troubleshooting guide for PrivacyInfo.xcprivacy in Capacitor iOS apps: required reason APIs, ITMS-91053 and ITMS-91061, and third-party SDK manifests."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-05-21T11:49:21.738Z
updated_at: 2026-10-14T12:00:00.000Z
head_image: /blog-images/privacy-manifest-for-ios-apps.webp
head_image_alt: "Privacy Manifest for iOS Apps Capgo blog illustration"
keywords: Privacy Manifest, iOS apps, required reason API, ITMS-91053, ITMS-91061, Capacitor, App Store compliance
tag: Development, Mobile, Security
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: "Is a privacy manifest still required for App Store uploads in 2026?"
    answer: "Yes. Since May 1, 2024, new apps and updates must declare required reason API usage in PrivacyInfo.xcprivacy. Listed third-party SDKs must include their own manifests when a new app ships them or an update adds them; signatures apply when those SDKs are binary dependencies. See Apple's upcoming requirements and third-party SDK requirements pages."
  - question: "What is the difference between ITMS-91053 and ITMS-91061?"
    answer: "ITMS-91053 means your app binary uses a required reason API without a matching declaration in a privacy manifest. ITMS-91061 means a privacy-impacting third-party SDK in your bundle is missing its own PrivacyInfo.xcprivacy. Fix 91053 in your app manifest; fix 91061 by upgrading the SDK, not by copying its practices into your app manifest."
  - question: "Where do I put PrivacyInfo.xcprivacy in a Capacitor iOS project?"
    answer: "Add PrivacyInfo.xcprivacy under ios/App, include it in the App target's Copy Bundle Resources in Xcode, then archive and generate a privacy report. Each target still needs its own manifest; the report aggregates manifests from your app, Capacitor, CocoaPods, and Swift Package Manager dependencies."
---

**Apple privacy manifests are mandatory for App Store uploads:** every app needs a `PrivacyInfo.xcprivacy` that describes your app's data collection, tracking domains, and any [required reason APIs](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api) your code calls. Third-party SDKs on [Apple's required list](https://developer.apple.com/support/third-party-SDK-requirements) must ship their own manifests (and signatures when distributed as binaries). This guide focuses on **2026 compliance and troubleshooting** for [Capacitor](https://capacitorjs.com/) iOS apps: what to declare, how to fix **ITMS-91053** and **ITMS-91061**, and how to validate before you submit.

## What a privacy manifest covers

A privacy manifest is a property list bundled with your app or SDK. Xcode aggregates every manifest at archive time into a single privacy report.

| Key | Purpose |
| --- | --- |
| `NSPrivacyTracking` | Whether your app or SDK uses data for tracking as Apple defines it |
| `NSPrivacyTrackingDomains` | Domains involved in tracking |
| `NSPrivacyCollectedDataTypes` | Data types collected and how they are used |
| `NSPrivacyAccessedAPITypes` | Required reason APIs your **own** code uses, with approved reason codes |

Apple's overview: [Adding a privacy manifest to your app or third-party SDK](https://developer.apple.com/documentation/bundleresources/adding-a-privacy-manifest-to-your-app-or-third-party-sdk).

You are responsible for all code in the binary, including embedded SDKs. Your manifest should describe **your app only**. Do not paste another SDK's data practices into your file.

## Required reason API categories

Since **May 1, 2024**, App Store Connect rejects uploads when your app uses a listed API without an approved reason in `NSPrivacyAccessedAPITypes`. Apple documents the APIs and approved reasons in [Describing use of required reason API](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api).

As of Apple's [TN3183](https://developer.apple.com/documentation/technotes/tn3183-adding-required-reason-api-entries-to-your-privacy-manifest), the **category** values are:

| `NSPrivacyAccessedAPIType` value | Typical trigger in hybrid apps |
| --- | --- |
| `NSPrivacyAccessedAPICategoryUserDefaults` | Settings, plugin state, small persistence |
| `NSPrivacyAccessedAPICategoryFileTimestamp` | File metadata, caches, update bundles |
| `NSPrivacyAccessedAPICategoryDiskSpace` | Free-space checks before downloads |
| `NSPrivacyAccessedAPICategorySystemBootTime` | Elapsed time, timers, or absolute timestamps |
| `NSPrivacyAccessedAPICategoryActiveKeyboards` | Keyboard extension or input detection |

For each category you use, add one dictionary with `NSPrivacyAccessedAPIType` and `NSPrivacyAccessedAPITypeReasons`. Pick **only** reason codes Apple lists for that category. Wrong codes cause review failures.

Example fragment (adjust categories and codes to match your app after you inspect the privacy report):

```xml
<key>NSPrivacyAccessedAPITypes</key>
<array>
  <dict>
    <key>NSPrivacyAccessedAPIType</key>
    <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
    <key>NSPrivacyAccessedAPITypeReasons</key>
    <array>
      <string>CA92.1</string>
    </array>
  </dict>
</array>
```

Capacitor itself appears on Apple's [third-party SDK requirements](https://developer.apple.com/support/third-party-SDK-requirements) list, so the framework ships a manifest for Capacitor's own API usage. You still need an app-level manifest for **your** native and JavaScript layers, plugins, and any APIs not covered by dependencies.

## ITMS-91053: missing API declaration

**ITMS-91053** means App Store Connect detected a required reason API in your build without a matching entry in a merged privacy manifest.

**Fix it:**

1. Read the rejection email or upload log. It names the API **category** (for example `NSPrivacyAccessedAPICategoryDiskSpace`).
2. Open the archive privacy report in Xcode (**Product > Archive**, then **Generate Privacy Report** on the archive) and see whether the gap is in your app target or a dependency.
3. If the API is in **your** code or a plugin you own, add the category and an approved reason to `ios/App/PrivacyInfo.xcprivacy`.
4. If the API comes from a **dependency**, upgrade the pod or SPM package to a version that includes a manifest, or patch the plugin and declare only what your fork actually calls.
5. Re-archive and confirm the category appears in the report before you upload again.

Do not declare categories you do not use. Apple's static analysis is tied to symbols in the binary.

## ITMS-91061: missing third-party privacy manifest

**ITMS-91061** means a **privacy-impacting SDK** in your app bundle has no `PrivacyInfo.xcprivacy`. Apple states that when you ship a new app or an update that **adds** a listed SDK, that SDK must include a manifest; binary SDKs also need a valid [signature](https://developer.apple.com/support/third-party-SDK-requirements) from the SDK vendor.

**Fix it:**

1. Copy the framework path from the email (for example `Frameworks/FirebaseCore.framework/FirebaseCore`).
2. Identify the CocoaPods, SPM, or vendored binary package.
3. Upgrade to a vendor release that bundles `PrivacyInfo.xcprivacy` at the framework root.
4. Clean, rebuild, and verify the file inside the `.xcarchive` before upload.

**Do not** move the SDK's collection or API declarations into your app manifest. Apple explicitly warns that the app manifest must describe the app only. If the SDK is unmaintained, replace it or vendor a compliant build.

Listed SDKs include common mobile stacks (Firebase, Flutter, **Capacitor**, `shared_preferences_ios`, and others). Check the current list on Apple's site before each release.

## Third-party SDK manifests and signatures

When you update a dependency, Xcode validates that binary frameworks were signed by the same developer as prior releases. That protects the supply chain when manifests change.

Practical workflow:

- After `pod install` or resolving SPM, search `ios/` for `PrivacyInfo.xcprivacy` files.
- Archive and use **Generate Privacy Report** to read the combined picture.
- Compare the report to your App Store privacy questionnaire answers.

For live update tooling, declare required reason APIs your updater actually uses (for example disk space, file timestamps, or user defaults). Network access is not a required reason API category; document it through your privacy labels and App Store questionnaire instead. Keep [Capgo live update compliance](https://capgo.app/docs/live-updates/compliance/) in mind when you document OTA behavior.

## Add `PrivacyInfo.xcprivacy` in a Capacitor iOS project

1. Sync the native project: `bunx cap sync ios`.
2. Open the Xcode workspace under `ios/App`.
3. **File > New > File**, choose **App Privacy** (or add an empty `PrivacyInfo.xcprivacy` plist).
4. Save the file under `ios/App` (same folder as `AppDelegate` is fine).
5. In the target **Build Phases > Copy Bundle Resources**, confirm `PrivacyInfo.xcprivacy` is listed.
6. Fill in tracking, collected data types, and required reason APIs based on your app and plugins.
7. Archive, generate the privacy report, and fix any missing categories before uploading to App Store Connect.

If you edit the plist as XML on disk, reopen Xcode so the target membership stays correct.

Each app or SDK target keeps its own `PrivacyInfo.xcprivacy`. When you archive, Xcode aggregates those manifests into one privacy report. You do not manually merge dependency plists into your app file.

## Validation checklist before submit

- App target includes `PrivacyInfo.xcprivacy` in **Copy Bundle Resources**.
- Every required reason category in the rejection or report has approved reason codes.
- Each listed third-party SDK in the build includes its own manifest at the expected path.
- Privacy report matches your understanding of analytics, ads, and authentication SDKs.
- App Store privacy labels align with the merged report.

## FAQ

### Do Capacitor plugins need their own privacy manifests?

If a plugin is distributed as source in your repo, its API usage is part of your app binary. Declare APIs the plugin calls in the **app** manifest, or contribute a manifest inside the plugin target if it ships as a separate framework. Binary pods must follow Apple's third-party SDK rules.

### Can I fix ITMS-91061 by editing only my app's PrivacyInfo.xcprivacy?

No. The SDK must ship the manifest. Your file should only document your app's practices.

### Where are Apple's policy dates documented?

Required reason APIs: enforced since [May 1, 2024](https://developer.apple.com/news/upcoming-requirements/?id=05012024a). Third-party manifest and signature rules for listed SDKs are described in [Third-party SDK requirements](https://developer.apple.com/support/third-party-SDK-requirements).

## Keep going from Privacy Manifest for iOS Apps

If you are using **Privacy Manifest for iOS Apps** to plan security and compliance, connect it with [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner, [Capgo Security](/security/) for the product workflow in Capgo Security, and [Capgo Trust Center](/trust/) for the product workflow in Capgo Trust Center.
