---
slug: google-play-staged-rollouts-how-it-works
title: "Google Play Staged Rollouts: How It Works"
description: "How staged rollouts work on Production, Open testing, and Closed testing in Play Console, plus Capgo channels and percentage rollouts for live web updates."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-22T00:36:08.727Z
updated_at: 2026-10-14T12:00:00.000Z
head_image: /blog-images/google-play-staged-rollouts-how-it-works.webp
head_image_alt: "\"Google Play Staged Rollouts: How It Works\" Capgo blog illustration"
keywords: staged rollouts, Google Play Console, production track, open testing, closed testing, Capgo channels, progressive rollout
tag: Development, Mobile, Updates
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: "Which Play Console tracks support staged rollouts?"
    answer: "Production, Open testing, and Closed testing support staged rollout percentages. Internal testing does not use the same percentage rollout flow; it targets up to 100 testers directly."
  - question: "How is a Play staged rollout different from a Capgo channel rollout?"
    answer: "Play staged rollouts ship a new Android App Bundle to a fraction of Play users on a track. Capgo channels and progressive rollouts deliver live web bundle updates to a percentage of devices already running your app, without replacing the store binary."
  - question: "Can I pause a Play staged rollout?"
    answer: "Yes. In Play Console, open the track Releases tab, choose Manage rollout, and halt or resume the rollout while you change the percentage."
---

**Google Play staged rollouts release a new Android App Bundle to a percentage of users on a track before you reach 100%.** Use them on **Production**, **Open testing**, and **Closed testing** to limit blast radius while you watch crashes and ratings. **Internal testing** is for fast checks with up to 100 testers and is not the same as a production percentage rollout. For [Capacitor](https://capacitorjs.com/) apps, pair store rollouts with [Capgo channels](https://capgo.app/docs/live-updates/channels/) and [progressive rollouts](https://capgo.app/docs/live-updates/progressive-rollouts/) when you need percentage-based delivery of live web updates between store releases.

## Play Console tracks in 2026

Google documents four release surfaces:

| Track in Play Console | Who receives builds | Staged rollout percentage |
| --- | --- | --- |
| **Internal testing** | Up to 100 invited testers | No staged percentage rollout (full track delivery to testers) |
| **Closed testing** | Email lists or Google Groups you choose | Yes |
| **Open testing** | Anyone who joins from your store listing | Yes |
| **Production** | Eligible users in selected countries | Yes (country targeting available on production) |

Source: [Prepare and roll out a release](https://support.google.com/googleplay/android-developer/answer/9859348) and [Set up an open, closed, or internal test](https://support.google.com/googleplay/android-developer/answer/9845334).

Typical flow: **Internal testing** for smoke tests, **Closed testing** for trusted beta groups, **Open testing** for wider feedback, then **Production** with a staged percentage.

## How a Play staged rollout works

Google's [Release app updates with staged rollouts](https://support.google.com/googleplay/android-developer/answer/6346149) guide describes the loop:

1. Open **Production**, **Open testing**, or **Closed testing** in Play Console.
2. Create or edit a release and upload an **Android App Bundle** with a higher `versionCode` than users on that track already have.
3. Set a **rollout percentage** (between 1% and 100%).
4. Start the rollout.
5. Monitor Android vitals, crashes, and reviews.
6. **Increase** the percentage, **halt**, or **resume** the rollout from the Releases tab (**Manage rollout**).
7. Promote to 100% when metrics look healthy.

Important constraints from Google's documentation:

- Rollout users are chosen by Google; you cannot hand-pick individuals in the console UI.
- Only one staged rollout configuration applies per track at a time.
- You cannot force users to install immediately; they update when Play delivers the release.
- Production staged rollouts can target **specific countries or regions**; testing tracks follow the track's tester rules.

The [Google Play Developer API](https://developers.google.com/android-publisher/tracks) maps track IDs (`production`, `beta` for open testing, `qa` for internal testing, plus named closed tracks) if you automate releases.

## What to watch during the rollout

| Signal | Where to look |
| --- | --- |
| Crash rate | Play Console Android vitals |
| ANRs | Vitals and pre-launch reports |
| User reviews | Store listing feedback for the version |
| Backend errors | Your API dashboards correlated with version headers |

Wait long enough between percentage jumps to gather signal. Google's help center suggests monitoring before you expand; many teams hold at least a day on early percentages for production.

If a native bug ships, **halt** the Play rollout and publish a fixed bundle with a higher `versionCode`. Play does not auto-rollback binaries for you.

## Capgo channels and percentage rollouts (live updates)

Store rollouts change the **native shell** users download from Play. [Capgo](https://capgo.app/) handles **live web bundle updates** inside an already installed Capacitor app.

- **[Channels](https://capgo.app/docs/live-updates/channels/)** map devices to update streams (`production`, `beta`, custom names). You can force specific device IDs to a channel when debugging.
- **[Progressive rollouts](https://capgo.app/docs/live-updates/progressive-rollouts/)** keep a **stable fallback** bundle on the channel while a **rollout target** reaches a configured **percentage** of devices. Increase, decrease, pause, complete, or roll back without shipping a new Play build for web-layer fixes.

Use Play staged rollouts when you change native code, permissions, or `targetSdkVersion`. Use Capgo percentage rollouts when the fix lives in HTML, CSS, or JavaScript and your compliance review allows OTA delivery.

## Suggested combined strategy

1. Ship native changes through **Internal testing**, then **Closed** or **Open testing**, then a **Production** staged rollout.
2. Point production devices to a stable Capgo channel for day-to-day web fixes.
3. Run a **progressive rollout** on a channel when you want canary web bundles with an automatic stable fallback.
4. Halt the Play rollout if vitals regress; roll back the Capgo progressive rollout if web metrics regress.

## Rules and requirements reminder

- Each release needs a monotonically increasing **`versionCode`** on the track.
- Apps using Play App Signing must upload signed AABs per [Google Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756).
- Complete outstanding staged releases or discard drafts before starting conflicting releases on the same track ([Prepare and roll out a release](https://support.google.com/googleplay/android-developer/answer/9859348)).

## FAQ

### Does Internal testing use percentages?

No. Internal testing distributes the release to your tester list (up to 100 people). Use Closed, Open, or Production for percentage-based staged rollouts.

### Can open testers see the app on Google Play?

Yes. Open testing surfaces a public opt-in test program. Closed and internal tests rely on invite links unless you promote to open or production.

### When should Capacitor teams use Capgo instead of raising the Play rollout?

When the change is confined to web assets and passes your store compliance checklist. Native plugin upgrades, manifest changes, and permission changes still need a new Play release.

## Keep going from Google Play Staged Rollouts: How It Works

If you are using **Google Play Staged Rollouts: How It Works** to plan store approval and distribution, connect it with [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, [@capgo/capacitor-native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/capacitor-native-market, [Using @capgo/capacitor-native-market](/plugins/capacitor-native-market/) for the native capability in Using @capgo/capacitor-native-market, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
