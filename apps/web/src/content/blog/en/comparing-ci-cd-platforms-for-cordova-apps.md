---
slug: comparing-ci-cd-platforms-for-cordova-apps
title: "Best CI/CD Platforms for Cordova Apps in 2026, Compared"
description: "Compare CI/CD platforms for Cordova apps in 2026: GitHub Actions, GitLab, Bitrise, Codemagic, Appcircle, Azure DevOps, and what to do about live updates."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /cordova.webp
head_image_alt: "Comparison of CI/CD platforms that build Apache Cordova apps for iOS and Android"
keywords: Cordova CI/CD platforms, best CI/CD for Cordova, Cordova build service, Bitrise Cordova, Codemagic Cordova, Cordova App Center alternative, Cordova Appflow alternative, Cordova live updates
tag: CI/CD, Alternatives, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best CI/CD platform for Cordova apps?"
    answer: "If your code is on GitHub or GitLab, their own CI with macOS runners is the simplest. Bitrise and Codemagic are the mobile CI services that document Cordova directly. Appcircle fits teams that must self-host. None of them ship live updates themselves; pair them with a live update service such as Capgo and its @capgo/cordova-updater plugin."
  - question: "Can I still use App Center or PhoneGap Build for Cordova?"
    answer: "No. PhoneGap Build shut down on October 1, 2020, and Microsoft App Center retired on March 31, 2025. Ionic Appflow only serves existing customers until December 31, 2027."
  - question: "Which platforms offer live updates for Cordova apps?"
    answer: "General CI platforms build binaries but do not deliver over-the-air updates. Ionic Appflow does until December 31, 2027 for existing customers. Capgo supports Cordova iOS 7+ and Android 13+ apps through the @capgo/cordova-updater plugin, with bundles uploaded from any CI using the Capgo CLI."
  - question: "Does Capgo work with Cordova apps?"
    answer: "Capgo live updates do, through @capgo/cordova-updater, which shares the API, channels, and backend of the Capacitor updater. Capgo Build's documentation covers Capacitor projects, so Cordova binaries are built on your own CI and Capgo handles the over-the-air updates."
  - question: "Do Cordova iOS builds need a Mac?"
    answer: "Yes, the build itself runs xcodebuild on macOS. A hosted CI with macOS runners or a cloud build service supplies that Mac, so your developers do not need one."
---

The best CI/CD platform for a Cordova app in 2026 is usually a general CI that can run the Cordova CLI on Linux for Android and on macOS for iOS: GitHub Actions, GitLab CI, Bitrise, Codemagic, Appcircle, CircleCI, or Azure DevOps. What none of them replace is the managed live update service Cordova teams got from App Center and Appflow. This comparison covers build support, signing, store publishing, live updates, and long-term outlook for each option.

## Where Cordova CI/CD stands

Three managed services built the Cordova ecosystem, and all three are gone or closing:

| Service | Status |
| --- | --- |
| PhoneGap Build | Shut down October 1, 2020 |
| Microsoft App Center (builds, distribution, CodePush) | Retired March 31, 2025 |
| Ionic Appflow (builds, live updates) | No new customers since February 2025, service ends December 31, 2027 |

Cordova the framework still ships platform releases. The work that moved to you is everything around the build: signing storage, store uploads, version numbers, and over-the-air updates.

If you just need a working pipeline today, start with [CI/CD for Cordova apps](/blog/ci-cd-for-cordova-apps/), which has a complete GitHub Actions workflow. This article helps you pick where to run it.

## What a Cordova team should compare

1. **Cordova awareness.** Does the platform have Cordova steps or templates, or do you script `cordova build` yourself? Scripting is fine; it is the same three commands everywhere.
2. **macOS runners** with Xcode 26, which App Store Connect requires since April 28, 2026.
3. **Signing storage** for the Android keystore, iOS certificate, and provisioning profiles.
4. **Store publishing** to TestFlight and Google Play tracks.
5. **Live updates** for web-layer fixes.
6. **Git hosting and self-hosting**, which matters for the enterprise and government apps that often still run Cordova.

## Feature matrix

| Platform | Cordova support | macOS for iOS | Managed signing | Store publishing | Cordova live updates | Self-host option |
| --- | --- | --- | --- | --- | --- | --- |
| GitHub Actions | Scripted CLI | Hosted Apple Silicon | Secrets only | fastlane or scripts | No | Self-hosted runners |
| GitLab CI | Scripted CLI | Hosted (beta, Premium/Ultimate) or self-managed | Secure files, variables | fastlane, store integrations | No | Yes, full GitLab |
| Bitrise | Dedicated Cordova steps | Hosted Apple Silicon | Yes | Built-in steps | No | No |
| Codemagic | Documented Ionic Cordova workflows | Hosted Mac minis | Yes | Built-in | No | No |
| Appcircle | Custom script steps | Hosted or own | Yes | Built-in | No | Yes, Appcircle Server |
| CircleCI | Scripted CLI | Hosted Apple Silicon | Contexts only | fastlane | No | Self-hosted runners |
| Azure DevOps | Scripted CLI | Microsoft-hosted | Secure files plus install tasks | Store extension tasks | No | Self-hosted agents, Azure DevOps Server |
| Xcode Cloud | Via `ci_scripts` hooks, iOS only | Apple-managed | Automatic | Built-in | No | No |
| VoltBuilder | Upload a zip, Cordova and Capacitor | Managed | Certificates in the upload | Store-ready output | No | No |
| Ionic Appflow | First-class | Managed | Yes | Yes | Yes, until end of 2027 | No |
| Capgo (live updates) | `@capgo/cordova-updater` plugin, Cordova iOS 7+ / Android 13+ | Not a build service for Cordova | Not applicable | Not applicable | Yes, channels and rollbacks | Yes, open source backend |

Capgo sits next to whichever CI you pick rather than replacing it: your CI builds the Cordova binaries, and [Capgo live updates](/live-update/) ship web-only changes to installed apps. [Capgo Build](/native-build/) is documented for Capacitor projects, so it is not an option for building a Cordova binary.

## Platform by platform

### GitHub Actions

The most common choice for Cordova teams on GitHub. Android builds on `ubuntu-latest` with `actions/setup-java`. iOS builds on `macos-26` with Xcode 26 preinstalled. You decode the keystore and `.p12` from secrets, write a `build.json`, and run `cordova build`. Uploads use fastlane, `xcrun altool`, or community Play upload actions. No Cordova-specific features, but nothing stops you either. Watch macOS minute costs on private repositories.

### GitLab CI

Same scripted approach. Hosted macOS runners exist on GitLab.com for Premium and Ultimate in beta, with images like `macos-26-xcode-26`. Self-managed GitLab instances, which many regulated Cordova teams use, need their own Mac runners. Secure files are a clean place for the keystore and provisioning profile. See [Set up CI/CD in GitLab](/blog/setup-ci-and-cd-in-gitlab/).

### Bitrise

The mobile CI with the most explicit Cordova support. Its step library includes Cordova steps for preparing the project and archiving iOS and Android builds, alongside code signing management and store deploy steps. If you want a UI-driven workflow and are fine with credit-based pricing, it is the closest thing to the old App Center build experience.

### Codemagic

Codemagic documents Ionic Cordova builds in `codemagic.yaml`, with managed Android keystores, automatic iOS signing through an App Store Connect API key, and publishing to TestFlight and Google Play. Pricing is per build minute or a fixed annual plan. A good fit for teams that like YAML in the repository but want signing handled.

### Appcircle

Appcircle builds Cordova through workflow custom scripts on top of its iOS and Android build pipelines, and adds signing identity storage, tester distribution, an enterprise app store, and store publishing. Appcircle Server can run fully on your infrastructure, which is the strongest self-hosting story in this list.

### CircleCI

Scripted Cordova builds on Linux Docker executors for Android and Apple Silicon macOS executors for iOS. Signing and uploads are fastlane or shell. Reasonable if CircleCI already runs your backend.

### Azure DevOps

Azure Pipelines runs the Cordova CLI as script steps and adds first-party tasks for installing Apple certificates and provisioning profiles from secure files, Android signing, and store releases through marketplace extensions. Azure DevOps Server covers on-premises needs. Many former App Center customers landed here.

### Xcode Cloud

Possible for the iOS half only. A `ci_scripts/ci_post_clone.sh` hook installs Node, restores Cordova platforms, and builds the web layer before Xcode Cloud archives the generated project. Since Cordova generates `platforms/ios` at build time, the workspace path has to exist when the workflow starts, which makes setup awkward. Most Cordova teams use it only if they already rely on it for native apps.

### VoltBuilder

A build service rather than a CI: you upload a zip of your project with signing files, and it returns store-ready binaries for Cordova and Capacitor projects. No Git triggers, pipelines, or live updates. Useful for small teams without a CI. See [Alternative to VoltBuilder](/blog/alternative-to-voltbuilder/).

### Ionic Appflow

Still the most complete Cordova platform, with builds, signing, publishing, and live updates. It is also the one with an end date. If you are on Appflow, the question is not whether to leave but when. See [Alternative to Appflow](/blog/alternative-to-appflow/).

## Filling the live update gap

Every general CI on this list produces signed binaries. None of them deliver over-the-air updates to installed apps, and the old community hot code push plugins are not maintained. For Cordova that leaves Appflow until the end of 2027, a self-hosted update server, or Capgo.

Capgo supports Cordova through [`@capgo/cordova-updater`](/plugins/cordova-updater/), which mirrors the Capacitor updater API and uses the same backend, channels, and CLI. It requires Cordova iOS 7+ and Cordova Android 13+, and it must not be combined with `cordova-plugin-ionic-webview`. Install it with your Capgo app ID:

```bash
cordova plugin add @capgo/cordova-updater --variable APP_ID=com.example.app
cordova prepare android ios
```

Call `cordova.plugins.Updater.notifyAppReady()` after `deviceready` on every launch, then add one step to your CI for web-only releases:

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel=production
```

Plugin additions or upgrades still need a store build; Capgo flags bundles whose native plugins differ from the live one. Details in the [Cordova updater docs](/docs/plugins/cordova-updater/) and [live update compatibility](/docs/live-updates/compatibility/). The full pipeline, including the live update job, is in [CI/CD for Cordova apps](/blog/ci-cd-for-cordova-apps/).

## Optional: what moving to Capacitor adds in CI

You do not have to migrate to get live updates. Teams that do migrate mostly do it for the build side.

Capacitor runs most Cordova plugins as is, keeps your web code, and commits the native projects to Git instead of generating them, which makes CI builds more predictable. Your Capgo app ID and channels carry over, only the updater plugin changes. Once migrated:

- Your Linux CI job runs `bun run build`, `bunx cap sync`, and one `bunx @capgo/cli@latest build request` per platform. No macOS runner needed for iOS.
- Web-only releases go out as live updates with channels, rollbacks, and compatibility checks: `bunx @capgo/cli@latest bundle upload --channel production`.
- `bunx @capgo/cli@latest build needed` tells the pipeline whether a native build is required at all.

Migration guide: [Migrating from Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/). If you want help, see [Cordova to Capacitor](/solutions/cordova-to-capacitor/).

## How to choose

| Your situation | Good fit |
| --- | --- |
| Code on GitHub, small team, comfortable with YAML | GitHub Actions |
| Code on self-managed GitLab or on-premises requirements | GitLab CI with own Mac runners, Appcircle Server, or Azure DevOps Server |
| Want the closest replacement for App Center builds | Bitrise or Codemagic |
| No CI at all, just need binaries | VoltBuilder |
| Need live updates after Appflow or App Center | Any CI above plus Capgo with `@capgo/cordova-updater` |
| Want iOS builds without macOS runners | Migrate to Capacitor, then Capgo Build |

## Migration checklist from App Center or Appflow

- Download your Android upload keystore and iOS distribution `.p12` with private keys. If the old platform generated them, export before you lose access.
- Record current version codes and build numbers so the first build on the new platform does not collide.
- Create a Google Play service account and an App Store Connect API key for the new CI.
- List every environment variable the old platform injected at build time.
- Run one internal-track and one TestFlight build before switching production.
- Decide your live update plan before the old service turns off, not after.

For the iOS and Android decisions in more depth, read [Comparing CI/CD platforms for iOS apps](/blog/comparing-ci-cd-platforms-for-ios-apps/) and [Comparing CI/CD platforms for Android apps](/blog/comparing-ci-cd-platforms-for-android-apps/).
