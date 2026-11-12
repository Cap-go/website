---
slug: what-are-ota-updates
title: 'OTA Updates: Definition, Android, iOS, and Store Rules'
description: >-
  OTA updates deliver software over the air. Learn what OTA apps are, Android
  and iOS live updates, store rules, safety, and build vs buy for mobile teams.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-10-16T07:24:16.867Z
updated_at: 2026-11-12T10:00:00.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/dc7ab5f8-e52a-410f-b024-c406f84bb954/what-are-ota-updates-software-updates.jpg'
head_image_alt: 'OTA Updates: Definition, Android, iOS, and Store Rules Capgo blog'
keywords: >-
  ota updates, ota app, over the air updates, android ota updates, ota release,
  mobile live updates, capacitor ota, cordova ota, ota apps
tag: 'Mobile, Updates, Capacitor'
published: true
locale: en
next_blog: ''
faq:
  - question: Are OTA apps real?
    answer: >-
      Yes. OTA apps are normal installed mobile apps that download updates over
      Wi-Fi or cellular after install. Device makers use OTA for operating system
      patches. Hybrid and cross-platform apps use app-level OTA to refresh the
      web layer inside Capacitor, Cordova, or React Native shells.
  - question: Do OTA updates work on Android and iOS?
    answer: >-
      Yes, with different shapes. Android can update the OS, the Play Store APK
      via in-app updates, or the web bundle inside a hybrid app. iOS uses OTA
      for system updates; app-level OTA usually updates JavaScript, HTML, CSS,
      and assets in the reviewed WebView shell. Native plugin or permission
      changes still need a new store binary on both platforms.
  - question: Are OTA updates allowed on the App Store and Google Play?
    answer: >-
      Store rules allow many web-layer OTA changes when they do not change the
      app's primary purpose or bypass platform security. Apple reviews interpreted
      code boundaries in its App Review Guidelines. Google Play allows updates
      to JavaScript and web code run in a WebView or JavaScript engine when they
      stay within the app's declared behavior. See Capgo's guide to
      app-store-compliant OTA for a practical checklist.
  - question: What is the difference between Android OTA updates and app OTA?
    answer: >-
      Android system OTA updates firmware and the OS image from the device maker
      or carrier. App OTA updates what your application loads after install, such
      as a new web bundle, config, or copy. Google Play in-app updates are a
      third path that replaces the distributed APK. Teams should name which layer
      they mean before planning a release.
  - question: Should you build or buy an OTA update system?
    answer: >-
      Build when you need full control, can maintain signing, channels, rollback,
      and telemetry yourself, and have security review capacity. Buy or use a
      managed platform when you want faster rollout, hosted infrastructure, and
      proven store-compliant workflows. Compare trade-offs in open source versus
      proprietary app update solutions before you commit.
  - question: What is an OTA release for a mobile app?
    answer: >-
      An OTA release is a versioned package published to a channel, downloaded by
      eligible clients, verified, staged, and activated without reinstalling from
      the store. For Capacitor-style apps it is often a signed web bundle. The
      same release pipeline can gate beta, staging, and production audiences.
---
**Quick answer:** **OTA (over-the-air) updates** are software changes delivered to a device over a network without a cable or fresh physical install. **OTA apps** are real installed apps that pull those updates after download from the store or factory image. On phones, the phrase covers both **device OTA** (for example **Android system updates**) and **app-level OTA** (live updates to the web layer in Capacitor, Cordova, or React Native apps).

For store-compliant boundaries, read [ultimate guide to app-store-compliant OTA updates](https://capgo.app/blog/ultimate-guide-to-app-store-compliant-ota-updates/). For product-level live delivery, see [Capacitor live updates](https://capgo.app/live-update/) and [how live updates for Capacitor work](https://capgo.app/blog/how-live-updates-for-capacitor-work/).

## Device and firmware OTA vs app-level OTA

**Device and firmware OTA** updates the operating system or radio firmware. Android OTA updates from Google or the OEM replace the system partition. iOS uses similar over-the-air paths for platform releases. Users see these in system settings, not inside your product's release notes.

**App-level OTA** updates what your application loads at runtime after the install is already on the device. In hybrid stacks that usually means JavaScript, HTML, CSS, images, configuration, and copy inside a WebView or JavaScript engine. The native binary that passed App Store or Google Play review stays in place until you ship a new store build.

| Layer | What changes | Typical example |
|---|---|---|
| Device OTA | OS, drivers, security patches | Android system update prompt |
| Store-mediated app update | Whole APK or IPA | Google Play in-app update |
| App-level OTA | Web bundle and runtime assets | Capacitor live update channel |

Cordova and Capacitor teams almost always mean the third row when they ask about **over the air apps** or an **OTA release** in CI. If you need a narrower definition, [what is an OTA update](https://capgo.app/blog/what-is-ota-update/) walks the same split with mobile examples.

## Are OTA updates safe and allowed by Apple and Google?

**Safety** depends on signing, integrity checks, staged channels, rollback, and telemetry, not on the word OTA. A production updater should verify manifests, keep a known-good bundle, and activate atomically so a partial download cannot brick the app.

**Store policy** is separate from security engineering. Apple expects interpreted code delivered after review to stay within the app's primary purpose and not introduce unreviewed native behavior. Google Play generally allows updates to JavaScript and other web code executed in a WebView or bundled JavaScript engine when they match the app's declared functionality. Native plugins, new permissions, or SDK swaps still belong in a store release on both platforms.

Capgo's [guide to app-store-compliant OTA updates](https://capgo.app/blog/ultimate-guide-to-app-store-compliant-ota-updates/) maps those rules to day-to-day release choices. For build vs buy on infrastructure, see [open source vs proprietary app update solutions](https://capgo.app/blog/open-source-vs-proprietary-app-update-solutions/).

## Table of Contents
- [Device and firmware OTA vs app-level OTA](#device-and-firmware-ota-vs-app-level-ota)
- [Are OTA updates safe and allowed by Apple and Google?](#are-ota-updates-safe-and-allowed-by-apple-and-google)
- [A Practical Definition of OTA Updates](#a-practical-definition-of-ota-updates)
- [How an OTA Update Actually Reaches a Device](#how-an-ota-update-actually-reaches-a-device)
  - [The parts that have to line up](#the-parts-that-have-to-line-up)
- [OS Updates, In-App Updates, and Web Bundle Live Updates Compared](#os-updates-in-app-updates-and-web-bundle-live-updates-compared)
  - [Three layers where OTA operates](#three-layers-where-ota-operates)
- [Adoption Rates and Why They Matter for Engineering](#adoption-rates-and-why-they-matter-for-engineering)
  - [What those numbers tell engineers](#what-those-numbers-tell-engineers)
- [The Real Trade-offs of Pushing Updates Over the Air](#the-real-trade-offs-of-pushing-updates-over-the-air)
  - [The cost you pay for moving faster](#the-cost-you-pay-for-moving-faster)
- [A Change-Classification Framework for OTA Versus Store Releases](#a-change-classification-framework-for-ota-versus-store-releases)
  - [A decision rule that engineers can actually use](#a-decision-rule-that-engineers-can-actually-use)
- [Security Controls That Make OTA Safe to Rely On](#security-controls-that-make-ota-safe-to-rely-on)
  - [Controls that belong in every serious OTA system](#controls-that-belong-in-every-serious-ota-system)
- [Putting It Together and Choosing an OTA Approach](#putting-it-together-and-choosing-an-ota-approach)
  - [Questions worth asking a vendor](#questions-worth-asking-a-vendor)

<a id="a-practical-definition-of-ota-updates"></a>
## A Practical Definition of OTA Updates

Friday afternoon is when these problems always seem to show up. A checkout flow breaks, support pings engineering, and someone on the team starts asking whether this needs a store release or can go out right now. If the change is only in the web layer of a hybrid app, OTA can be the difference between a quick recovery and a long weekend of waiting.

At the simplest level, **over-the-air updates** are software updates delivered directly to a device through a wireless network instead of a cable, desktop installer, or physical service visit. In mobile computing, Apple made OTA a core distribution pattern when it added OTA update support in **iOS 5 in 2011**. The basic flow is direct, the vendor publishes a release, eligible devices get notified, the package downloads over Wi-Fi or cellular, the device verifies it, and then installs it locally, usually after a restart. [Wikipedia's overview of over-the-air updates](https://en.wikipedia.org/wiki/Over-the-air_update) captures that device-level model clearly.

The term gets messy because people use it for several different layers. One layer is the **operating system**, where Apple or an Android device maker pushes the platform update. Another is the **app package**, where Google Play's in-app update flow can update the distributed Android application package. A third is the **runtime web bundle**, where a Capacitor-style app can pull down JavaScript, CSS, images, or copy after the native binary has already passed review.

![A diagram explaining Over-the-Air updates with icons for broken checkouts, quick fixes, and saved revenue.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/05a0c0e9-1d27-4418-82ff-723f2e0bc83e/what-are-ota-updates-software-patch.jpg)

> **Practical rule:** if the device already has the app or operating system installed, and the new version arrives over the network instead of through a fresh physical installation, you're in OTA territory.

That distinction matters because the same phrase can describe radically different release paths. A product manager may say “ship it over the air,” while the engineering answer depends on whether the change touches native code, interpreted code, or the operating system itself.

<a id="how-an-ota-update-actually-reaches-a-device"></a>
## How an OTA Update Actually Reaches a Device

The pipeline looks simple from the outside, but reliable OTA systems have to do several things in a strict order. A publisher builds a release, signs it, associates it with a channel or version rule, and makes it available to eligible devices. The client checks in or receives a notification, downloads the package, verifies it, stages it, and only then activates it.

<a id="the-parts-that-have-to-line-up"></a>
### The parts that have to line up

A download is not an install, and an install is not an activation. The device needs to know that the artifact is genuine, complete, and meant for that app version before it touches the live runtime. That's why good OTA systems separate the **download slot** from the **active slot**, then switch a pointer only after verification passes.

In practice, the brittle spots are predictable. Connectivity drops during download, the wrong version lands on the wrong channel, the package fails integrity checks, or the app restarts before the new bundle is ready. A system that treats OTA like a “fetch file and run it” feature usually learns these lessons the hard way.

> A safe OTA flow always assumes failure somewhere between download and activation, then gives the app a known-good fallback.

The end-to-end shape is visible in most production updaters, even if the implementation details vary by platform. Some systems lean on background downloads so the user can keep working. Others use a foreground flow when the update is too important to defer. The important point is that the update package moves through **verification, staging, activation, and recovery**, not just transfer.

![A diagram illustrating the five-step end-to-end OTA delivery process for software updates to devices.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b1b377f0-a762-4b43-bf76-020fa3c7f4da/what-are-ota-updates-ota-process.jpg)

For teams wiring this into CI/CD, the delivery trigger matters too. A build can be published automatically after tests pass, then exposed to a device channel that only the right audience can see. That kind of automation is where release engineering starts to feel less like app shipping and more like controlled software distribution. [This guide on how CI/CD tools trigger OTA updates](https://capgo.app/blog/how-cicd-tools-trigger-ota-updates/) is a useful reference for that workflow.

<a id="os-updates-in-app-updates-and-web-bundle-live-updates-compared"></a>
## OS Updates, In-App Updates, and Web Bundle Live Updates Compared

The biggest source of confusion is that **OTA** can mean three different things, and each one has different rules. An operating-system OTA is controlled by the platform owner. An app-store mediated in-app update updates the app package. A runtime web-bundle update changes the assets the installed app loads at launch.

<a id="three-layers-where-ota-operates"></a>
### Three layers where OTA operates

| Layer | Artifact Updated | Gating | Store Review |
|---|---|---|---|
| OS-level OTA | The operating system and its patches | Platform vendor signing and rollout policy | Not app-store review, but platform-controlled |
| In-app update | The distributed Android application package | Google Play update flow, flexible or immediate | Store-mediated |
| Web-bundle live update | JavaScript, CSS, copy, images, config, and other runtime assets | App-defined channel and eligibility rules | Usually already passed native store review |

Google Play's in-app update mechanism is especially important to separate from “live update” tools. It supports Android 5.0 and later, and it has two operational modes. A **flexible update** downloads in the background while the user keeps using the app, but the app has to notice the ready state and explicitly finish the install. An **immediate update** blocks the user with a full-screen flow and requires install plus restart before continued use. [Google's in-app update documentation](https://developer.android.com/guide/playcore/in-app-updates) is the clearest reference for that distinction.

That difference shapes app design. Flexible updates reduce interruption, but the old code keeps running until the app finishes the handoff. Immediate updates reduce version skew, which is useful for urgent fixes, but they also interrupt the session. For Capacitor-style apps, the practical split is even sharper because web assets can often move independently from the native binary, while native capabilities still need the normal package-update path.

If you work in Ionic, Capacitor, or Electron-adjacent workflows, it's common to layer these paths instead of choosing one forever. The OS updates the shell, the store updates the binary, and OTA updates the web payload. That's not duplication, it's version control at different layers of the stack.

<a id="adoption-rates-and-why-they-matter-for-engineering"></a>
## Adoption Rates and Why They Matter for Engineering

OTA only matters if devices end up on the new version. Apple's historical iOS numbers show what centrally managed wireless distribution can do when a single platform owner controls signing, eligibility, notification, and delivery. Apple reported that **81% of all active iPhones were running iOS 16 by February 2023**, and **90% among iPhones introduced during the previous four years by June 2023**. Later, Apple reported **76% of iPhones introduced in the previous four years were running iOS 18 in early 2025**, compared with **74% running iOS 26** roughly five months after its September 15, 2025 release, measured on February 12, 2026. [Computerworld's summary of Apple's adoption data](https://www.computerworld.com/article/4134677/apples-ios-adoption-data-shows-consistency.html) is a handy place to see those figures in one place.

<a id="what-those-numbers-tell-engineers"></a>
### What those numbers tell engineers

The first takeaway is that centrally managed OTA can reach majority adoption within months. The second is that adoption is never instant, and it never reaches everyone at once. Older devices, user choice, storage constraints, connectivity problems, staged rollouts, and perceived risk all leave a tail of devices on earlier versions.

That tail is why production OTA systems need more than a download endpoint. They need **version targeting**, **integrity verification**, **telemetry**, **failure handling**, and **rollback or recovery mechanisms**. Without those controls, you can ship a release quickly and still have no idea who received it, who crashed on launch, or which audience needs the rollback.

> Adoption metrics are not vanity numbers. They're the proof that a release mechanism is reaching the installed base safely enough to trust.

For teams evaluating a live-update platform, release visibility quickly becomes a core product requirement. [Capgo's adoption metrics examples](https://capgo.app/blog/adoption-metrics-examples/) are a good illustration of how teams tend to think about rollout health in practice.

<a id="the-real-trade-offs-of-pushing-updates-over-the-air"></a>
## The Real Trade-offs of Pushing Updates Over the Air

OTA feels fast because it skips the store queue, but speed comes with an interruption budget. A **flexible update** lets the user keep working while the new bundle downloads, which is great for convenience but risky for urgent fixes because the old code can keep running until the app explicitly finishes the update. An **immediate update** cuts version skew faster, but it blocks the user and forces a restart.

<a id="the-cost-you-pay-for-moving-faster"></a>
### The cost you pay for moving faster

That trade-off shows up in three places. First, there's UX. A forced update can break a flow in the middle of a session, and that's especially noticeable in consumer apps. Second, there's release safety. OTA expands the blast radius of a bad package if your signing, channel control, or rollback logic is weak. Third, there's policy risk, because a team can get tempted to push changes that really belong in a store release.

If your users want tighter control over when updates happen, the mechanics matter just as much as the product policy. A practical overview like [SpecStory's guide to update control](https://withstoa.com/blog/disable-automatic-update) is useful because it reminds teams that users experience updates as interruptions, not abstractions.

A mature rollout strategy usually uses **channels** and **audiences** to control those interruptions. Beta users see one stream, staging sees another, and production sees the most conservative path. That gives engineering a way to move quickly without turning every release into an all-or-nothing event.

[Delta updates that reduce payload size](https://capgo.app/blog/how-delta-updates-reduce-payload-size/) can also help when bandwidth or startup time matters, but the smaller download still has to be treated as a complete, verified release before activation. Smaller is not the same as safer unless the integrity checks are in place.

<a id="a-change-classification-framework-for-ota-versus-store-releases"></a>
## A Change-Classification Framework for OTA Versus Store Releases

This is the part most teams really need. The question is not “can we use OTA?” The question is “what kind of change are we making, and which release path does that change deserve?” A useful way to decide is to classify every pull request before it ships.

<a id="a-decision-rule-that-engineers-can-actually-use"></a>
### A decision rule that engineers can actually use

Start with the artifact, not the label. **JavaScript logic, CSS, copy, images, configuration, and other interpreted or web-layer assets** are usually candidates for OTA if they stay within the app's existing purpose and reviewed boundaries. **Native plugins, permissions, SDK changes, and anything that changes the app's primary purpose** belong in a store release.

That distinction matters because “JavaScript-only” is not automatically policy-safe. Apple's allowance for interpreted code is conditional, it can't change the app's primary purpose, bypass platform security, or introduce unreviewed functionality. So a team shouldn't ask only “is it JS?” The better question is whether the change alters what the app fundamentally does.

A practical classification table helps here:

- **Web-layer logic or UI copy**, usually OTA if it stays inside approved behavior.
- **Assets and images**, usually OTA when they don't alter native capability.
- **Config and backend flags**, usually OTA if the client already supports them.
- **Native plugins, permissions, or SDK changes**, store release.
- **Ambiguous mixed changes**, default to a binary release and record the policy rationale.

> When a pull request touches both web-layer behavior and native capability, the native side wins. Treat it as a store release unless the change is clearly separable.

That rule keeps the release train honest. It also gives product and QA a shared vocabulary, which matters more than people expect when timelines get tight.

<a id="security-controls-that-make-ota-safe-to-rely-on"></a>
## Security Controls That Make OTA Safe to Rely On

Secure OTA is a supply-chain problem first and a download feature second. A production updater needs to authenticate the bundle, verify integrity before activation, preserve a known-good version, and make activation atomic so a broken download can't replace the running release with a partial artifact. [This guide on signature verification](https://capgo.app/blog/signature-verification/) covers the trust side of that model well.

<a id="controls-that-belong-in-every-serious-ota-system"></a>
### Controls that belong in every serious OTA system

The first control is **signing**. The manifest and the assets it points to should be signed, then verified before the app trusts them. The second is **channel binding**, where the release is tied to an app version and audience so the wrong device doesn't consume the wrong bundle. The third is **inactive-slot download**, which keeps the new payload separate until all checks pass.

After that comes the part teams sometimes skip, **atomic activation**. The app should switch to the new bundle only after the hashes and signatures match, not halfway through a download or during a failing restart. An immutable prior bundle matters here, because rollback only works if the last known-good version is still available.

Differential updates can help reduce bandwidth, but they're not a shortcut around verification. A delta still has to be reconstructed and checked against the complete target bundle before the app uses it. Otherwise you've just made the payload smaller, not the release safer.

The final piece is telemetry. On startup, the app should log the active bundle, the installation result, any crash-loop or launch failure, and the rollback decision. That record is what turns a weird incident into something the team can explain and fix.

For regulated environments, the operating rule is simple. Keep native-capability changes in store-reviewed binaries, limit OTA to compatible web-layer changes, use staged audiences, and keep automatic recovery turned on.

<a id="putting-it-together-and-choosing-an-ota-approach"></a>
## Putting It Together and Choosing an OTA Approach

A good OTA decision is usually boring in the best way. Classify the change, choose the right channel, sign and verify the bundle, plan rollback, and watch the telemetry. If any part of that feels unclear, the change probably belongs in the store path instead.

<a id="questions-worth-asking-a-vendor"></a>
### Questions worth asking a vendor

- **Can it do signed manifests and asset verification?** If not, the trust model is too weak for production.
- **Does it support staged channels and audience targeting?** You want control, not a single global switch.
- **Is rollback automatic and observable?** A recovery path that people have to remember manually is fragile.
- **Do per-device logs exist?** Without them, support and engineering are guessing.
- **Can CI/CD trigger releases through an API?** Manual shipping does not scale well.
- **Does it support differential updates?** That can help, but only if integrity checks stay intact.

If you're comparing platforms, [deployment automation patterns](https://capgo.app/blog/app-release-automation/) are a good way to judge whether the tool fits real release engineering or just marketing copy. That's especially relevant for teams that need automation without giving up control.

Capgo is one option in this space for CapacitorJS teams that need signed web-bundle updates, channel-based rollout, rollback, and release telemetry. If your team is trying to separate OTA-safe changes from store-bound changes, visit [Capgo](https://capgo.app) and see whether its workflow matches the way you ship.
