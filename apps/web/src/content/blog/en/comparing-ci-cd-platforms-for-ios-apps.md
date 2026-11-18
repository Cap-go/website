---
slug: comparing-ci-cd-platforms-for-ios-apps
title: "Best iOS CI/CD Platform for Apps in 2026, Compared"
description: "Which iOS CI/CD platform fits your app? Compare GitHub Actions, GitLab, Bitrise, Codemagic, Xcode Cloud, CircleCI, Azure DevOps, and Appcircle for signing, TestFlight, and cloud Mac runners in 2026."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-11-18T10:35:00.000Z
head_image: /RBW_XCode_Cloud_building.webp
head_image_alt: "Comparison of CI/CD platforms building iOS apps on macOS runners"
keywords: iOS CI, iOS CI/CD, best CI/CD for iOS apps, iOS CI pipeline, iOS CI runners, CocoaPods CI, Xcode 26 CI, Apple Silicon CI runners, Xcode Cloud vs Bitrise, GitHub Actions iOS, CircleCI iOS
tag: CI/CD, iOS, Alternatives
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best CI platform for iOS apps?"
    answer: "There is no single winner. Native Swift teams that only ship Apple platforms often start with Xcode Cloud. Teams that want managed signing and mobile-focused steps pick Bitrise, Codemagic, or Appcircle. Teams that already use GitHub or GitLab usually add macOS runners and fastlane. Capacitor or Ionic apps can keep Linux CI and call Capgo Build for the iOS compile and TestFlight upload, as described in the Capacitor CI/CD comparison on capgo.app."
  - question: "Does Xcode 26 work with CI/CD platforms yet?"
    answer: "Yes, on the major hosted Mac runners that publish an image matrix. GitHub Actions documents macOS 26 arm64 runners with multiple Xcode versions. GitLab documents macos-26-xcode-26 images. Bitrise and Codemagic publish new Xcode stacks after Apple releases them. Self-hosted Macs must install Xcode 26 or later locally. App Store Connect requires builds made with Xcode 26 or later and the iOS 26 SDK or later since April 28, 2026."
  - question: "What is the best CI/CD platform for CocoaPods iOS projects?"
    answer: "Any platform in this comparison that runs pod install on a macOS job works for CocoaPods. Bitrise, Codemagic, and Appcircle ship steps for CocoaPods and signing. GitHub Actions, GitLab CI, CircleCI, and Azure DevOps need your own scripts or fastlane, usually archiving from the .xcworkspace after pod install. Xcode Cloud runs pod install in ci_post_clone.sh when you add it. Match the job to where your repo and secrets already live."
  - question: "How do you run iOS CI/CD builds in the cloud on Apple Silicon?"
    answer: "Pick a service with hosted Apple Silicon macOS runners, select an image that includes your Xcode version, and run xcodebuild or fastlane in the job. GitHub Actions, GitLab.com, CircleCI, Bitrise, and Codemagic all document Apple Silicon macOS executors. Point signing at an App Store Connect API key, install certificates and profiles or use the platform's managed signing, then upload with fastlane or a built-in publish step."
  - question: "What is the best CI/CD platform for Ionic apps?"
    answer: "This page focuses on native iOS CI/CD. For Ionic and Capacitor hybrid apps, use the dedicated comparison at capgo.app/blog/comparing-ci-cd-platforms-for-capacitor-apps/, which covers Linux CI plus cloud native builds and live updates. Codemagic and Bitrise also list Ionic and Capacitor in their docs, and Capgo Build can handle the iOS binary from any Linux pipeline."
  - question: "Is Swift a CI/CD tool like CircleCI or GitLab CI?"
    answer: "No. Swift is Apple's programming language for iOS and other Apple platforms. CircleCI and GitLab CI are continuous integration services that run builds on macOS agents. Searches such as swift vs CircleCI usually mean comparing an iOS app written in Swift against a pipeline hosted on CircleCI, or choosing CircleCI versus GitLab CI for the same Swift or Xcode project. Compare vendors on runners, signing, TestFlight upload, and price, not the language name."
---

**Quick answer:** The best iOS CI/CD platform depends on your stack and where your code already lives. **Native Swift, Apple-only teams** often start with [Xcode Cloud](https://developer.apple.com/xcode-cloud/). **Mobile teams that want managed signing** lean toward Bitrise, Codemagic, or Appcircle. **Teams on GitHub or GitLab** usually keep those tools and add **macOS runners plus fastlane**. **Capacitor apps** can keep Linux CI and call [Capgo Build](/native-build/) for the iOS compile and TestFlight step. For hybrid Ionic or Capacitor workflows, see [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/).

| Platform | Hosted Apple Silicon Mac | Xcode 26 in image docs | Managed signing | Android in same service |
| --- | --- | --- | --- | --- |
| GitHub Actions | Yes (`macos-latest` arm64) | Yes (macOS 26 runner images) | No | Yes |
| GitLab CI | Yes (hosted beta on GitLab.com) | Yes (`macos-26-xcode-26`) | No | Yes |
| Bitrise | Yes | Yes (stack updates after Apple releases) | Yes | Yes |
| Codemagic | Yes | Yes (stack updates after Apple releases) | Yes | Yes |
| Appcircle | Yes | Check current stack list | Yes | Yes |
| Xcode Cloud | Apple-managed | Yes (Apple toolchain) | Yes | No |
| CircleCI | Yes | Yes (macOS/Xcode images) | No | Yes |
| Azure DevOps | Hosted macOS (`macOS-latest`; ARM64 preview labels such as `macos-26-arm64` where enabled) | Check agent software list | Partial (install tasks) | Yes |
| Capgo Build | Capgo-managed (Capacitor only) | Yes (see [Xcode 26 requirement](/blog/xcode-26-requirement-for-capacitor-apps/)) | Yes | Yes |

The best CI/CD platform for an iOS app depends on three things: what the app is built with, where your code already lives, and how much signing and Mac maintenance you want to own. This comparison covers each vendor with the facts that matter for iOS CI pipelines, iOS CI runners, and cloud iOS CI/CD servers in 2026.

## What changed for iOS CI/CD in 2026

- **Xcode 26 or later is mandatory.** Since April 28, 2026, App Store Connect rejects uploads that were not built with Xcode 26 or later and the iOS 26 SDK or later. Any platform you choose must offer Xcode 26 images, and self-hosted Macs must be upgraded. Details in [Apple's Xcode 26 requirement](/blog/xcode-26-requirement-for-capacitor-apps/).
- **Apple Silicon is the default.** Hosted macOS runners on GitHub, GitLab, CircleCI, Bitrise, and Codemagic run on Apple Silicon. Intel images are being retired.
- **Two managed services left.** Microsoft App Center retired on March 31, 2025. Ionic Appflow stopped new sales in February 2025 and ends service on December 31, 2027. Teams on either need a new home.
- **App Store Connect API keys replaced Apple ID logins.** Every serious platform now authenticates with a `.p8` API key, which avoids two-factor prompts that used to hang CI jobs.

## Does Xcode 26 work with CI/CD platforms yet?

For App Store uploads in 2026, the build must use **Xcode 26 or later and the iOS 26 SDK or later**. Apple's deadline is documented in [Apple's Xcode 26 requirement](/blog/xcode-26-requirement-for-capacitor-apps/).

Public vendor docs and image lists, as covered in the sections below, show **Xcode 26 on hosted Mac runners** for:

- **GitHub Actions:** `macos-latest` points at macOS 26 arm64 with selectable Xcode versions via `xcode-select` or `setup-xcode`.
- **GitLab CI:** hosted images named for macOS and Xcode, such as `macos-26-xcode-26`.
- **Bitrise and Codemagic:** mobile stacks that add new Xcode versions after Apple ships them.
- **CircleCI and Azure DevOps:** macOS executor images; confirm the label on your account matches Xcode 26 before you switch production pipelines.
- **Xcode Cloud:** uses Apple's own toolchain inside the Apple Developer ecosystem.

**Self-hosted Mac agents** (GitHub, GitLab, Azure DevOps, or your own iOS CI/CD server) only support Xcode 26 after you install it on that machine and point the job at that `xcode-select` path.

## CI/CD for CocoaPods iOS projects

A **CocoaPods** iOS app builds from the **`.xcworkspace` that `pod install` generates** (for example `YourApp.xcworkspace`, or `ios/App/App.xcworkspace` in a typical Capacitor tree), not from the `.xcodeproj` alone. That applies to any **iOS CI pipeline**:

1. Run `pod install` (or `bundle exec pod install`) on the macOS job before `xcodebuild` or fastlane.
2. Archive using the **workspace** path in fastlane or `xcodebuild -workspace`.
3. Cache the Pods directory or use a lockfile-keyed cache so runners do not download every pod on each commit.

Bitrise, Codemagic, and Appcircle document CocoaPods steps in their mobile workflows. GitHub Actions, GitLab CI, CircleCI, and Azure DevOps rely on your YAML plus fastlane or shell scripts. Xcode Cloud can run `pod install` in `ci_post_clone.sh`. For workspace versus SPM pitfalls in hybrid apps, see [CI/CD for Capacitor: common pitfalls](/blog/ci-cd-for-capacitor-common-pitfalls/).

## iOS CI/CD on Apple Silicon cloud runners

**Apple Silicon cloud Mac runners** are the default for hosted iOS CI/CD in 2026. They cut build time versus older Intel Macs and match what Apple optimizes Xcode for.

| Need | Typical approach |
| --- | --- |
| Hosted Mac, minimal ops | GitHub Actions, GitLab.com, CircleCI, Bitrise, or Codemagic Apple Silicon images; Azure DevOps only where ARM64 preview agents are enabled for your org |
| Apple-only, managed signing | Xcode Cloud |
| Regulated cloud or on-prem Mac | Appcircle Server or self-hosted agents |
| Capacitor, no Mac in CI | Linux job plus [Capgo Build](/native-build/) for the iOS binary |

Configure the job with an **App Store Connect API key**, install or manage signing assets, then upload to TestFlight with fastlane or the platform's publish module. For a GitHub Actions walkthrough on Capacitor iOS, see [Automatic Capacitor iOS build with GitHub Actions](/blog/automatic-capacitor-ios-build-github-action/).

## Swift vs CircleCI or GitLab CI: language vs CI service

**Swift** is a programming language. **CircleCI**, **GitLab CI**, and **GitHub Actions** are CI services. Queries such as **swift vs CircleCI** or **GitLab CI vs Swift** usually mean one of these:

- You write the app in **Swift** and want to know whether **CircleCI** or **GitLab CI** is a better host for the Xcode job.
- You confuse the language name with a product name.

What to compare instead:

| Compare | Not this |
| --- | --- |
| macOS runner availability, Apple Silicon, and Xcode 26 images | Swift the language |
| Managed signing versus DIY fastlane and keychain scripts | GitLab "vs Swift" as if Swift were a CI product |
| TestFlight upload built in versus custom steps | |
| Billing model (minutes, credits, parallel jobs) | |
| Whether Android builds share the same CI | |

Both CircleCI and GitLab CI run the same Swift or Objective-C Xcode project if the job runs on a Mac with the right Xcode version. Pick based on where the rest of your pipelines already live.

## What to compare

An iOS pipeline has more moving parts than a web one. These are the questions that separate platforms:

1. **Who provides the Mac?** Hosted, self-hosted, or abstracted away.
2. **How is signing handled?** Manual secrets and keychain scripts, or managed certificates and profiles.
3. **Can it upload to TestFlight and submit for review** without extra tooling?
4. **How fast do new Xcode versions arrive?**
5. **How is it billed?** Per minute, credits, concurrency, or included hours.
6. **Does it build Android too?** Most apps ship both.

## Feature matrix

| Platform | Mac provided | Managed signing | TestFlight upload | Android | Pricing model |
| --- | --- | --- | --- | --- | --- |
| GitHub Actions | Hosted arm64 runners (`macos-15`, `macos-26`) or self-hosted | No, secrets plus scripts or fastlane | Via fastlane or `altool` | Yes | Per minute, macOS rate higher than Linux; free for public repos |
| GitLab CI | Hosted macOS runners (beta, Premium/Ultimate) or self-managed | No, but an App Store Connect integration stores the API key | Via fastlane | Yes | Compute minutes per tier |
| Bitrise | Hosted Apple Silicon stacks | Yes, certificate and profile management | Built-in steps | Yes | Credits per build minute, plan tiers |
| Codemagic | Hosted Apple Silicon Mac minis | Yes, fetches or creates profiles via API key | Built-in publishing | Yes | Pay per minute or fixed annual plans |
| Appcircle | Hosted, or self-hosted Appcircle Server | Yes, signing identity store | Built-in publish module | Yes | Plan tiers, enterprise self-hosted |
| Xcode Cloud | Apple-managed | Yes, automatic | Built-in | No | 25 hours/month included with membership, more by subscription |
| CircleCI | Hosted Apple Silicon resource classes | No, secrets plus fastlane | Via fastlane | Yes | Credits per minute by resource class |
| Azure DevOps | Microsoft-hosted macOS agents or self-hosted | Partial, tasks install certificates and profiles | App Store extension task | Yes | Parallel jobs |
| Capgo Build | Capgo-managed, called from any CI | Yes, guided setup with `build init` | Built-in, plus submit for review | Yes | Build minutes, see [pricing](/pricing/) |

Notes on the matrix: "managed signing" means the platform stores or generates certificates and profiles for you, not just secret storage. Capgo Build only builds Capacitor apps; the others build native Swift projects too.

## Platform by platform

### GitHub Actions

The default for many teams because the workflow lives next to the code. GitHub hosts Apple Silicon macOS runners (`macos-latest` currently points at macOS 26 arm64) with several Xcode versions installed, and you select one with `xcode-select` or `maxim-lobanov/setup-xcode`.

Everything iOS-specific is yours: decoding the `.p12` into a temporary keychain, installing profiles, bumping build numbers, uploading. Most teams use fastlane for this. macOS minutes on private repositories bill at a much higher rate than Linux minutes, so running iOS builds on every pull request gets expensive fast.

Best for: teams on GitHub that are comfortable maintaining fastlane. Walkthrough: [Automatic Capacitor iOS build with GitHub Actions](/blog/automatic-capacitor-ios-build-github-action/).

### GitLab CI

GitLab offers hosted macOS runners on GitLab.com for Premium and Ultimate tiers, still labeled beta, on Apple Silicon machines (M1 and M2 Pro). Images are named by OS and Xcode, such as `macos-26-xcode-26`. On self-managed GitLab, you register your own Macs.

GitLab's Mobile DevOps features include a project integration for App Store Connect that exposes the API key to jobs, which makes fastlane setup cleaner. Signing itself is still your scripts.

Best for: teams already on GitLab Premium. Guide: [Set up CI/CD in GitLab](/blog/setup-ci-and-cd-in-gitlab/).

### Bitrise

A mobile-first CI with a large step library. Bitrise maintains macOS stacks on Apple Silicon with each supported Xcode version and usually publishes new Xcode stacks shortly after Apple releases them. Code signing can be managed through App Store Connect API integration, which downloads or generates certificates and profiles during the build. Steps cover TestFlight upload, App Store deploy, and many testing tools. It also has release management features for staged rollouts.

Pricing is credit-based, so iOS builds on larger machines consume credits faster. It is one of the more expensive options for small teams and one of the most complete for large mobile teams.

### Codemagic

Started with Flutter and now covers native iOS, Android, React Native, Ionic, and Capacitor. Builds run on Apple Silicon Mac mini instances. Configuration lives in `codemagic.yaml` or a UI editor. Automatic code signing uses your App Store Connect API key to fetch or create the right certificate and profile, which removes most keychain scripting. Publishing to TestFlight and App Store review is built in.

Pricing is either pay-as-you-go per build minute or a fixed annual plan, with a free monthly allowance for personal accounts. See [Capacitor iOS builds with Codemagic](/blog/automatic-capacitor-ios-build-codemagic/).

### Appcircle

A mobile CI/CD platform that bundles builds, a signing identity store, tester distribution, an enterprise app store, and store publishing. Its differentiator is deployment choice: you can use the cloud service or run Appcircle Server on your own infrastructure, which matters for regulated industries that cannot send code or signing keys to a shared cloud. Hybrid frameworks are built through workflow steps and custom scripts.

### Xcode Cloud

Apple's own CI, configured from Xcode or App Store Connect. Signing is automatic because it runs inside Apple's account system, and TestFlight distribution is a checkbox. Apple Developer Program membership includes 25 compute hours per month, and more hours are sold as a subscription. It connects to GitHub, GitLab, and Bitbucket, including self-managed instances.

Limits: it only builds Apple platforms, so Android needs another CI. Custom tooling goes in `ci_scripts` shell hooks. For a Capacitor app you install Node in `ci_post_clone.sh`, build the web layer, and run `cap sync`. See [How to build a Capacitor app in Xcode Cloud](/blog/how-to-build-capacitor-app-in-xcode-cloud/).

### CircleCI

A general-purpose CI with macOS executors on Apple Silicon resource classes and Xcode images. Configuration is YAML with reusable orbs. Signing and uploads are DIY, typically with fastlane and `match`. Billing uses credits, and macOS resource classes consume more credits per minute than Linux ones. A solid choice if CircleCI already runs your backend.

### Azure DevOps

Azure Pipelines provides Microsoft-hosted macOS agents. Microsoft documents `macOS-latest` as the standard macOS 15 hosted image. Apple Silicon ARM64 builds use a separate preview agent label such as `macos-26-arm64` where your organization has access. Self-hosted Mac agents are also supported. It has built-in tasks that iOS teams actually use: `InstallAppleCertificate@2` and `InstallAppleProvisioningProfile@1` handle keychain and profile setup from secure files, `Xcode@5` archives and exports, and the App Store extension's `AppStoreRelease@1` task uploads to TestFlight. Pricing is by parallel jobs rather than per minute. It fits Microsoft-centric organizations, especially those migrating off App Center.

### Capgo Build

[Capgo Build](/native-build/) is not a CI. It is a build service your pipeline calls from a Linux job (GitHub Actions, GitLab, Bitbucket, Gitea, Azure DevOps, or similar). That job runs the web build and `cap sync ios`, then requests an iOS build from Capgo Build:

```bash
bunx @capgo/cli@latest build request com.example.app --platform ios --build-mode release
```

Capgo Build compiles and signs the iOS app in the cloud, streams logs back to the Linux CI job, increments the build number from App Store Connect, and uploads to TestFlight. `--submit-to-store-review` sends it to App Review. Run `bunx @capgo/cli@latest build init --platform ios` once during setup to save credentials locally. For CI, use `bunx @capgo/cli@latest build credentials manage` to export the signing and App Store Connect values as CI secrets, then pass those values and `CAPGO_TOKEN` to `bunx @capgo/cli@latest build request`.

Limits worth knowing: it only builds Capacitor apps, and a single build has a 10-minute limit. Its main advantage is that no job in your pipeline needs a macOS runner, and the same CLI ships [live updates](/live-update/) for web-only changes so many releases skip the native build entirely.

### Argent Cloud

[Argent Cloud](https://argent.swmansion.com/cloud/) by Software Mansion is not a build service either. It covers the step after the build: running the app on iOS simulators. You get dedicated Apple hardware with isolated, preconfigured iOS simulators and reach them over the network. That lets a Linux CI job, or an AI coding agent running on Linux, drive an iOS simulator without your team building and maintaining its own Mac fleet.

It works with Maestro, Appium, and custom scripts, and with [Argent](https://argent.swmansion.com/), Software Mansion's MCP toolkit that lets agents such as Claude Code, Cursor, and Codex tap through the app, read logs and network requests, and profile it. Pricing is flat: each Runner gives up to 6 parallel simulators on hardware that is not shared with other customers, starting at $299 per month with unlimited simulator time.

Argent Cloud complements a build platform rather than replacing one: keep any of the services above for compiling, signing, and TestFlight uploads, and point your UI tests and agents at Argent Cloud's simulators. Its main advantage is that long test suites and agent sessions no longer consume per-minute macOS time.

## Ionic Appflow and App Center

Both still show up in search results. App Center is gone. Appflow works for existing customers until December 31, 2027 and accepts no new customers. If you are on either, plan the move now. Migration guides: [App Center migration](/blog/appcenter-migration/) and [Alternative to Appflow](/blog/alternative-to-appflow/).

## How to choose

| Your situation | Good fit |
| --- | --- |
| Native Swift, Apple platforms only, small team | Xcode Cloud |
| Native iOS and Android, dedicated mobile team, want managed signing | Bitrise, Codemagic, or Appcircle |
| Must self-host the whole platform | Appcircle Server, or self-hosted runners on GitLab, GitHub, or Azure DevOps |
| Everything already on GitHub or GitLab, team knows fastlane | GitHub Actions or GitLab CI with macOS runners |
| Microsoft shop, coming from App Center | Azure DevOps |
| Capacitor app, want to keep current CI and avoid macOS runners | Capgo Build called from your CI |
| Capacitor app that ships frequent web changes | Any of the above plus [Capgo live updates](/live-update/) |
| UI tests or AI agents need iOS simulators from Linux CI | Any build platform above plus Argent Cloud |

## Cost: what actually drives the bill

Exact prices change often, so compare the model rather than a number:

- **Per-minute hosted macOS** (GitHub, GitLab, CircleCI, Codemagic pay-as-you-go): cost scales with build count and duration. Caching CocoaPods or Swift packages and skipping native builds for web-only changes cut it the most.
- **Credits and tiers** (Bitrise, CircleCI, Appcircle): predictable monthly spend, but larger machines burn credits faster.
- **Included hours** (Xcode Cloud): cheap until you exceed the included 25 hours.
- **Parallel jobs** (Azure DevOps): you pay for concurrency, not minutes.
- **Flat monthly simulators** (Argent Cloud, for testing): a fixed price per block of reserved simulators, so long test runs do not raise the bill.
- **Self-hosted Macs**: no per-minute fee, but hardware, electricity, and an engineer's time for Xcode upgrades and keychain issues.

The cheapest iOS build is the one you do not run. For hybrid apps, sending JavaScript-only changes as live updates instead of new binaries usually saves more than switching CI vendors.

## FAQ

### What is the best CI platform for iOS apps?

There is no single winner. Native Swift teams that only ship Apple platforms often start with Xcode Cloud. Teams that want managed signing and mobile-focused steps pick Bitrise, Codemagic, or Appcircle. Teams that already use GitHub or GitLab usually add macOS runners and fastlane. Capacitor or Ionic apps can keep Linux CI and call Capgo Build for the iOS compile and TestFlight upload, as described in [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/).

### Does Xcode 26 work with CI/CD platforms yet?

Yes, on the major hosted Mac runners that publish an image matrix. GitHub Actions, GitLab, Bitrise, Codemagic, CircleCI, and Xcode Cloud document Xcode 26 toolchains. Self-hosted Macs must install Xcode 26 or later. App Store Connect requires builds made with Xcode 26 or later and the iOS 26 SDK or later since April 28, 2026.

### What is the best CI/CD platform for CocoaPods iOS projects?

Any platform in this comparison that runs `pod install` on a macOS job works for CocoaPods. Bitrise, Codemagic, and Appcircle ship steps for CocoaPods and signing. GitHub Actions, GitLab CI, CircleCI, and Azure DevOps need your own scripts or fastlane, usually archiving from the generated `.xcworkspace`. Match the job to where your repo and secrets already live.

### How do you run iOS CI/CD builds in the cloud on Apple Silicon?

Pick a service with hosted Apple Silicon macOS runners, select an image that includes your Xcode version, and run `xcodebuild` or fastlane in the job. GitHub Actions, GitLab.com, CircleCI, Bitrise, and Codemagic document Apple Silicon macOS executors. Point signing at an App Store Connect API key, install certificates and profiles or use the platform's managed signing, then upload with fastlane or a built-in publish step.

### What is the best CI/CD platform for Ionic apps?

This page focuses on native iOS CI/CD. For Ionic and Capacitor hybrid apps, use [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/), which covers Linux CI plus cloud native builds and live updates. Codemagic and Bitrise also list Ionic and Capacitor in their docs, and Capgo Build can handle the iOS binary from any Linux pipeline.

### Is Swift a CI/CD tool like CircleCI or GitLab CI?

No. Swift is Apple's programming language for iOS and other Apple platforms. CircleCI and GitLab CI are continuous integration services that run builds on macOS agents. Compare vendors on runners, signing, TestFlight upload, and price, not the language name.

## Troubleshooting checklist when switching platforms

- Export your distribution certificate as `.p12` with its private key before you leave the old platform. Some services generated it and never showed you the private key.
- Create an App Store Connect API key with App Manager access for the new platform instead of reusing a personal Apple ID.
- Check that the new platform's default Xcode is 26 or later.
- Move build number logic. If the old platform bumped it automatically, your first build on the new one may collide.
- Keep `ITSAppUsesNonExemptEncryption` in `Info.plist` so builds do not wait on export compliance.

For pipeline-specific errors, see [CI/CD for Capacitor: common pitfalls](/blog/ci-cd-for-capacitor-common-pitfalls/). For a Capacitor-focused comparison that also covers live updates, see [Comparing CI/CD platforms for Capacitor apps](/blog/comparing-ci-cd-platforms-for-capacitor-apps/). For the Android side of the same decision, see [Comparing CI/CD platforms for Android apps](/blog/comparing-ci-cd-platforms-for-android-apps/).