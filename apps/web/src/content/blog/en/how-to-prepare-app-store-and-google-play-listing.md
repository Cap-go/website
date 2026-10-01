---
slug: how-to-prepare-app-store-and-google-play-listing
title: "How to Prepare Your App Store and Google Play Listing"
description: "Prepare your App Store and Google Play listing: screenshot sizes, icon specs, metadata limits, privacy labels, Data safety, age ratings and a checklist."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /app_info.webp
head_image_alt: "App information and store listing fields in App Store Connect"
keywords: app store listing, google play store listing, app store screenshot sizes, google play screenshot size, app store metadata limits, app privacy labels, google play data safety, app store age rating, feature graphic size
tag: App Store, Google Play, Guides
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What screenshot sizes does the App Store require in 2026?"
    answer: "For iPhone, upload 6.9-inch screenshots (1260 x 2736 portrait; 1290 x 2796 and 1320 x 2868 are also accepted) or, if you do not have those, 6.5-inch screenshots at 1284 x 2778. For iPad apps, upload 13-inch screenshots at 2064 x 2752. Smaller sizes are scaled automatically. You can upload 1 to 10 screenshots per size, in PNG or JPEG without transparency."
  - question: "What screenshot size does Google Play need?"
    answer: "Each side must be between 320 and 3840 pixels and the long side cannot be more than twice the short side. Upload 2 to 8 per device type as JPEG or 24-bit PNG. For phones use at least 1080 x 1920 so the app can be featured. You also need a 512 x 512 icon and a 1024 x 500 feature graphic."
  - question: "Do I need a privacy policy if my app collects no data?"
    answer: "Yes. Apple requires a privacy policy URL for every app, and Google requires one for every app on Google Play. If you collect nothing, say so clearly, and remember that crash reporting, analytics and ad SDKs usually collect data."
  - question: "Do third-party SDKs count in privacy labels and Data safety?"
    answer: "Yes. Both stores hold you responsible for data collected by every SDK in your app, including Firebase, analytics, crash reporting, ads and payment libraries. Check each vendor's disclosure documentation and declare what they collect."
  - question: "Can I change my description without a new build?"
    answer: "On Google Play you can edit the full listing anytime; changes are reviewed. On the App Store, promotional text can change anytime, but the description, keywords and screenshots can only change when you submit a new app version for review."
---

An App Store and Google Play listing needs the same core material: an icon, screenshots in the sizes each store accepts, a name and descriptions within strict character limits, a privacy policy URL, a privacy disclosure (Apple's App Privacy labels and Google's Data safety form), and an age rating questionnaire. Missing any one of these blocks submission, so prepare them while your app is still in development.

Below are the current requirements for both stores, what reviewers check, and a checklist you can work through in an afternoon.

## Everything you need at a glance

| Asset | App Store | Google Play |
| --- | --- | --- |
| App name | 30 characters | 30 characters |
| Subtitle / short description | Subtitle, 30 characters | Short description, 80 characters |
| Description | 4,000 characters | Full description, 4,000 characters |
| Keywords | 100 bytes, comma separated | None (the description is indexed) |
| Promotional text | 170 characters, editable anytime | None |
| What's New | 4,000 characters | Release notes, 500 characters per language |
| Icon | 1024 x 1024 PNG, no transparency, in the app binary | 512 x 512 32-bit PNG, max 1 MB, uploaded to Play Console |
| Feature graphic | None | 1024 x 500 JPEG or 24-bit PNG, required |
| Screenshots | 1 to 10 per display size | 2 to 8 per device type |
| Preview video | Up to 3 app previews per size, 15 to 30 seconds | One YouTube URL |
| Privacy policy URL | Required | Required |
| Privacy disclosure | App Privacy ("nutrition labels") | Data safety section |
| Age rating | Apple questionnaire | IARC questionnaire |
| Support URL | Required | Contact email required, website optional |
| Review login | Demo account in App Review Information | Credentials in App access |

## App icon

**Apple.** The App Store icon is a 1024 x 1024 PNG, square, without transparency and without rounded corners (iOS masks it). In Capacitor apps it lives in `ios/App/App/Assets.xcassets/AppIcon.appiconset`. Xcode 26 also supports layered icons made with Icon Composer for the Liquid Glass look on iOS 26, but a single 1024 image is still accepted.

**Google.** Play needs a separate 512 x 512 32-bit PNG upload, up to 1 MB. Google applies the rounded mask and shadow itself, so upload a full-bleed square. The in-app launcher icon is separate and should be an adaptive icon.

Generate all native icon and splash sizes from one source image:

```bash
bun add -d @capacitor/assets
mkdir -p assets
# put icon.png (1024x1024) and splash.png (2732x2732) in ./assets
bunx capacitor-assets generate
```

Rules both stores enforce: no badges like "Free" or "#1", no screenshots of other brands' devices or logos, nothing that imitates another app.

## Screenshots

Screenshots are the biggest factor in whether someone installs. Most people never read the description.

### App Store screenshot sizes

| Display | Required? | Portrait size (px) |
| --- | --- | --- |
| iPhone 6.9" | Required (preferred) | 1260 x 2736, also 1290 x 2796 or 1320 x 2868 |
| iPhone 6.5" | Required only if no 6.9" set | 1284 x 2778 or 1242 x 2688 |
| iPhone 6.1" and smaller | Optional, scaled from larger sizes | 1170 x 2532 and others |
| iPad 13" | Required if the app runs on iPad | 2064 x 2752 or 2048 x 2732 |
| iPad 11" | Optional | 1488 x 2266 and others |

Landscape uses the same numbers swapped. Formats are PNG or JPEG, no alpha channel. You can upload 1 to 10 screenshots per size and 0 to 3 app previews.

A common Capacitor surprise: new projects support iPad by default. If you do not want to make iPad screenshots, set the target's **Supported Destinations** to iPhone only before your first upload. If you ship iPad support, reviewers test on iPad and reject broken layouts.

### Google Play screenshot sizes

- 2 to 8 screenshots per device type (phone, 7-inch tablet, 10-inch tablet, Chromebook, Wear OS, Android XR, TV, Automotive).
- JPEG or 24-bit PNG, no alpha.
- Each side between 320 and 3840 pixels; the long side at most twice the short side.
- For phones, use at least 1080 x 1920 (portrait) or 1920 x 1080 (landscape) and at least four screenshots, otherwise the app is not eligible for some featured placements.
- Tablet screenshots are needed if you want to appear as tablet-optimized.

### How to capture them

1. Run the app on a simulator of the right size. In the iOS Simulator use an iPhone 17 Pro Max for 6.9" and press Cmd+S. On Android, use an emulator with a 1080 x 1920 or higher screen and the camera button in the emulator toolbar.
2. Fill the app with realistic demo data. Empty states sell nothing.
3. Hide debug UI and make the status bar clean (`xcrun simctl status_bar booted override --time 9:41 --batteryState charged --batteryLevel 100`).
4. Add a short caption above each screenshot that states the benefit, not the feature name.
5. Keep the first two screenshots the strongest. They show in search results.

Tools like Figma templates, Fastlane `snapshot`/`screengrab` or online screenshot frame generators can produce the framed versions in every size.

Never use screenshots that show content the app cannot do, and do not include Google Play badges in App Store screenshots (or the reverse).

## Name, subtitle and descriptions

### App Store

- **Name (30 characters)**: brand plus a short descriptor if it fits, for example "Acme: Expense Tracker".
- **Subtitle (30 characters)**: the main benefit. Indexed for search.
- **Keywords (100 bytes)**: comma separated, no spaces after commas, no words already in the name or subtitle, no competitor brand names, singular forms are enough.
- **Promotional text (170 characters)**: shown above the description, changeable without a new version. Use it for current offers or news.
- **Description (4,000 characters)**: not indexed for search on the App Store, so write it for people. Open with what the app does in one sentence.

### Google Play

- **Title (30 characters)**: no emojis, ALL CAPS or words like "best", "free" or "#1" unless part of the brand.
- **Short description (80 characters)**: shown on the listing above the fold.
- **Full description (4,000 characters)**: indexed for search. Mention your main keywords naturally a few times; keyword stuffing gets listings rejected.

For more on writing metadata and the mistakes that hurt ranking, see [App Store metadata: what developers must know](/blog/app-store-metadata-what-developers-must-know/).

## Privacy policy

Both stores require a public privacy policy URL. It must:

- Be reachable without login and not be a PDF download.
- Name the developer or company as in the store listing.
- List what data you collect, why, who you share it with, how long you keep it, and how users can request deletion.
- Match what you declare in the privacy labels and Data safety form.

Also link the policy inside the app (settings or account screen). If users can create accounts, both stores require in-app account deletion; Google also requires a web link where users can request deletion without reinstalling the app. Our [account deletion guide](/blog/account-deletion-compliance-apple-guidelines/) and [privacy policy guide for Android apps](/blog/privacy-policy-for-android-apps/) go deeper.

## Apple App Privacy labels

In App Store Connect, open the app and go to **App Privacy**. You answer:

1. Do you or your third-party partners collect data from this app?
2. For each data type (contact info, location, identifiers, usage data, diagnostics, financial info...): what it is used for, whether it is linked to the user's identity, and whether it is used for tracking.

"Tracking" has a narrow meaning: linking data from your app with data from other companies' apps or websites for advertising, or sharing it with data brokers. If you track, you also need the App Tracking Transparency prompt.

The labels must match your **privacy manifest** (`PrivacyInfo.xcprivacy`) and those of the SDKs you include. See our [privacy manifest guide for Capacitor apps](/blog/privacy-manifest-for-capacitor-apps-guide/).

You can update App Privacy answers at any time without a new build.

## Google Play Data safety

In Play Console go to **Policy and programs > App content > Data safety**. You declare:

- Which data types the app collects and which it shares with third parties.
- Whether data is encrypted in transit.
- Whether users can request deletion.
- For each type: purpose (app functionality, analytics, ads, fraud prevention...) and whether collection is optional.

Google can reject updates when the declaration does not match what the app does, for example an SDK sending the advertising ID while you declared no identifiers.

Most Data safety mistakes come from SDKs. Make a table of every native SDK and plugin in `package.json`, `ios/App/Podfile` or `Package.swift`, and `android/app/build.gradle`, then read each vendor's Data safety guidance.

## Age rating

**Apple.** In **App Information > Age Rating** you answer questions about violence, sexual content, profanity, gambling, user-generated content, messaging, ads, and more. Apple's ratings are 4+, 9+, 13+, 16+ and 18+. Apps with unmoderated user-generated content or open web access get higher ratings. Answer honestly; Apple checks. See our [App Store age ratings guide](/blog/app-store-age-ratings-guide/).

**Google.** In **App content > Content rating**, fill out the IARC questionnaire. It produces ratings for each region (ESRB, PEGI, USK and others) at once. You must also complete **Target audience and content**; choosing an audience that includes children brings in the Families policy requirements.

## Other App content declarations on Google Play

Before you can publish, Play Console asks for all of these under **App content**:

- Privacy policy
- App access (login credentials for reviewers if anything is behind a login)
- Ads (does the app contain ads?)
- Content rating
- Target audience and content
- Data safety
- Government app declaration
- Financial features declaration
- Health apps declaration
- Advertising ID usage (if your target SDK requires it)

## Review access and notes

If any part of the app needs a login, provide a working demo account for both stores. The account must not expire, must not require 2FA to a phone you control, and must reach every feature, including paid ones. In App Store Connect, add it under **App Review Information**; on Google Play, under **App access**. Add a short note explaining non-obvious features, hardware requirements, or where to find in-app purchases. Our [first-time app review guide](/blog/first-time-app-review-guide/) covers what reviewers look for.

## Localization

Both stores let you localize name, descriptions, keywords (Apple) and screenshots per language. Localizing only the metadata, even when the app UI is English, often improves conversion in non-English markets. Apple also indexes some secondary locales per country (for example, Spanish (Mexico) metadata is indexed in the US store), which effectively gives you extra keyword space.

## What you can change after release

| Field | App Store | Google Play |
| --- | --- | --- |
| Description | New version required | Anytime, reviewed |
| Promotional text | Anytime | n/a |
| Keywords | New version required | n/a |
| Screenshots | New version required | Anytime, reviewed |
| Name / subtitle | New version required | Anytime, reviewed |
| Privacy labels / Data safety | Anytime | Anytime, reviewed |

On iOS, a new version normally means a new binary. With [Capgo live updates](/live-update/) you can ship JavaScript and UI fixes without a store review, but store metadata changes still go through App Store Connect.

## Common reasons listings get blocked

1. Privacy policy URL returns 404 or requires login.
2. Screenshots show a different app version, placeholder content, or another platform's UI.
3. iPad support enabled but no iPad screenshots, or a broken iPad layout.
4. Data safety says "no data collected" while an analytics SDK runs.
5. Demo account missing or expired.
6. Keyword stuffing in the Google Play description.
7. Name or icon too close to an existing app or brand.
8. Missing support URL or contact email.

## Checklist

- [ ] 1024 x 1024 iOS icon in the app, 512 x 512 Play icon uploaded
- [ ] Play feature graphic 1024 x 500
- [ ] iPhone 6.9" (or 6.5") screenshots, iPad 13" if supporting iPad
- [ ] At least four 1080p phone screenshots for Google Play
- [ ] Name, subtitle, short description within limits
- [ ] Keywords (App Store) chosen, no duplicates with name
- [ ] Description and release notes written
- [ ] Privacy policy URL live and linked in the app
- [ ] App Privacy labels and privacy manifest match
- [ ] Data safety form complete, SDKs reviewed
- [ ] Age rating questionnaires done on both stores
- [ ] Play App content declarations complete
- [ ] Demo account and review notes added
- [ ] Support URL and contact email set

Once the listing is ready, upload a build to testers first. [How to distribute iOS and Android apps to testers](/blog/distribute-ios-and-android-apps-to-testers/) covers TestFlight, Play testing tracks and alternatives.
