---
slug: expo-development-client
title: Your Guide to the Expo Development Client
description: 'Create, build, and use the Expo development client with this complete guide. Learn EAS builds, debugging, CI/CD integration, and fixes for common issues.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-06-03T07:30:28.903Z
updated_at: 2026-06-03T07:30:29.588Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/69d13467-1ded-48a3-afa8-660e9b56e7f7/expo-development-client-title-slide.jpg'
head_image_alt: Your Guide to the Expo Development Client
keywords: 'expo development client, expo dev client, react native, eas build, mobile development'
tag: 'expo development client, expo dev client, react native, eas build, mobile development'
published: true
locale: en
next_blog: ''
---
You're usually ready for the Expo development client at the exact moment Expo Go starts lying to you.

The app works in the sandbox. Fast refresh feels great. Then you add a native dependency, wire up push notifications, test an OAuth flow, or try to mirror the way your production app launches. Suddenly the gap becomes obvious. You aren't debugging your app anymore. You're debugging a simplified environment.

That's where the Expo development client changes the workflow. It keeps the fast JavaScript loop people like about Expo, but moves testing into a custom native binary that behaves much more like the app you'll eventually ship. For solo developers, that means fewer surprises late in the cycle. For teams, it means a development process that can support shared builds, QA, preview environments, and update validation without pretending Expo Go can cover everything.

<a id="why-you-need-to-move-beyond-expo-go"></a>

## Table of Contents
- [Why You Need to Move Beyond Expo Go](#why-you-need-to-move-beyond-expo-go)
  - [What breaks first](#what-breaks-first)
  - [Why the development client is the right next step](#why-the-development-client-is-the-right-next-step)
  - [The mindset change](#the-mindset-change)
- [Prerequisites and Project Configuration](#prerequisites-and-project-configuration)
  - [Start with the account and CLI layer](#start-with-the-account-and-cli-layer)
  - [Install the package that makes the workflow possible](#install-the-package-that-makes-the-workflow-possible)
  - [Check your app configuration early](#check-your-app-configuration-early)
  - [What a good first configuration looks like](#what-a-good-first-configuration-looks-like)
- [Building Your Custom Client with EAS](#building-your-custom-client-with-eas)
  - [The basic EAS flow](#the-basic-eas-flow)
  - [What your build profile is really doing](#what-your-build-profile-is-really-doing)
  - [Installing the result](#installing-the-result)
  - [What not to expect](#what-not-to-expect)
- [Running and Debugging with Your New Client](#running-and-debugging-with-your-new-client)
  - [A normal development session](#a-normal-development-session)
  - [The debugging tools that matter](#the-debugging-tools-that-matter)
  - [What works well and what doesn't](#what-works-well-and-what-doesnt)
- [Integrating with CI/CD and Live Updates](#integrating-with-cicd-and-live-updates)
  - [Where CI/CD fits](#where-cicd-fits)
  - [The role of live updates](#the-role-of-live-updates)
  - [Team habits that prevent chaos](#team-habits-that-prevent-chaos)
- [Troubleshooting Common Pitfalls and Fixes](#troubleshooting-common-pitfalls-and-fixes)
  - [When the client won't connect to Metro](#when-the-client-wont-connect-to-metro)
  - [When rebuilds seem random](#when-rebuilds-seem-random)
  - [Build failures and team drift](#build-failures-and-team-drift)

## Why You Need to Move Beyond Expo Go

Expo Go is useful at the beginning. It removes setup friction, gets a React Native project running quickly, and gives you a fast feedback loop. That's exactly why many teams start there.

The problem starts when the app stops being a prototype. Expo documents Expo Go as a **sandbox** and notes that it can't accurately simulate some native capabilities like notifications or OAuth authentication, while the development build model is built around `expo-dev-client` and positioned as a **“Debug” build for production-grade apps** in the [Expo development builds introduction](https://docs.expo.dev/develop/development-builds/introduction/).

![A comparison chart outlining the key differences and limitations between Expo Go and Expo Development Client tools.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/da875cff-113f-4905-a0ef-ab5d07d0b0a5/expo-development-client-comparison-chart.jpg)

<a id="what-breaks-first"></a>
### What breaks first

In practice, the first breakage is usually one of these:

- **Native dependencies:** A package needs native code that Expo Go doesn't include.
- **Authentication:** An OAuth flow behaves differently once the app uses real native configuration.
- **Notifications and device features:** The sandbox doesn't reflect how the production app will request permissions or receive events.
- **Team QA:** A tester needs a stable binary that represents the app's real native setup.

Those aren't edge cases. They're normal stages in a real mobile project.

> Expo Go is great for proving an interface. It's a weak place to validate production behavior.

<a id="why-the-development-client-is-the-right-next-step"></a>
### Why the development client is the right next step

The Expo development client gives you a custom app binary with Expo's development tooling built in. That means you keep a strong developer experience, but the native layer is now yours. The installed client becomes the thing your team tests against, instead of relying on a generic container.

That shift matters more than it sounds. Once you move to a custom client, the question changes from “does this run in Expo Go?” to “does this work in the app we're building?” That's the right question.

If you're also comparing broader app delivery models, Capgo's write-up on an [alternative to Expo](https://capgo.app/blog/alternative-to-expo/) is useful context because it highlights where teams start looking beyond sandbox-first workflows.

<a id="the-mindset-change"></a>
### The mindset change

The biggest mistake I see is treating the Expo development client like a one-time setup task. It isn't. It's a workflow choice.

You're accepting one trade-off to gain control:

| Workflow | What stays fast | What requires more ceremony |
|---|---|---|
| Expo Go | Basic JavaScript iteration | Anything that depends on native reality |
| Expo development client | JavaScript changes inside a custom app | Native dependency changes and native config changes |

That's a good trade in professional app development. You stop optimizing for easiest demo and start optimizing for reliable delivery.

<a id="prerequisites-and-project-configuration"></a>
## Prerequisites and Project Configuration

Before you build anything, get the project into a state that can survive repeatable builds. Most failed first attempts come from skipping basic configuration, not from Expo itself.

Expo's documentation and ecosystem guidance describe development builds as a **“fully featured development environment”** that's representative of a real production environment once apps depend on custom native code or production-grade QA, as covered in Draftbit's overview of [Expo dev tools and development builds](https://draftbit.com/blog/maximizing-efficiency-and-productivity-with-expo-dev-tools/).

<a id="start-with-the-account-and-cli-layer"></a>
### Start with the account and CLI layer

You need two things working before the app layer matters:

1. **Expo CLI access**
2. **EAS CLI access**

You'll also want to be logged into your Expo account from the terminal. Teams often gloss over this because local commands can appear fine until the first remote build or credential prompt appears.

A clean setup usually includes:

- **Your Expo account session:** This ties local work to remote build services and project ownership.
- **EAS CLI installed:** EAS is what turns your project into a shareable iOS or Android binary.
- **A project that already runs locally:** Don't introduce build complexity before basic app startup works.

<a id="install-the-package-that-makes-the-workflow-possible"></a>
### Install the package that makes the workflow possible

The center of this setup is `expo-dev-client`. Without it, you don't have the custom launcher and debug-oriented native shell that defines the Expo development client workflow.

Install it in the app project, then verify your Expo config is coherent. The exact commands may vary with your package manager, but the architectural point doesn't: this package is what transforms the app from “runs in a shared sandbox” into “runs inside our own development binary.”

> **Practical rule:** Build the development client once the native dependency list is stable enough for teammates to install and use the same binary.

<a id="check-your-app-configuration-early"></a>
### Check your app configuration early

A lot of confusion comes from treating `app.json` or `app.config.js` as metadata only. It's not. These files define identity.

Make sure the project has:

- **A unique app name:** Helpful when developers install multiple variants on one device.
- **A unique bundle or package identifier:** Critical for native builds and later signing.
- **Clear environment intent:** If the team uses separate staging and production identities, reflect that deliberately.

If your local environment is messy, it's worth tightening it up before the first build. Capgo's guide to [setting up a Capacitor local environment](https://capgo.app/blog/setting-up-capacitor-local-environment/) isn't Expo-specific, but it's a good reminder that reproducible mobile work starts with stable local tooling and explicit config.

<a id="what-a-good-first-configuration-looks-like"></a>
### What a good first configuration looks like

Use this checklist before kicking off EAS:

| Check | Why it matters |
|---|---|
| `expo-dev-client` is installed | Enables the custom development client behavior |
| Expo account is linked | Required for smooth EAS usage |
| App identifiers are unique | Prevents native build and install conflicts |
| Project starts locally | Avoids mixing runtime issues with build issues |
| Team knows when to rebuild | Reduces confusion after native changes |

The goal isn't perfection. The goal is making the first build boring. That's a win.

<a id="building-your-custom-client-with-eas"></a>
## Building Your Custom Client with EAS

This is the point where the workflow becomes real. You stop talking about a custom client and generate one.

Expo recommends a development build workflow for apps with custom native code: install `expo-dev-client`, generate a native app with EAS Build or locally, then run `npx expo start --dev-client`. Expo also notes in the [workflow overview](https://docs.expo.dev/workflow/overview/) that JavaScript-only changes stay fast, while native-code changes require a new development build.

![A four-step infographic illustrating the process of building an Expo development client using EAS CLI tools.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/0e02ea5a-a5fe-486a-bbe0-53f0c9f2f9e5/expo-development-client-build-process.jpg)

<a id="the-basic-eas-flow"></a>
### The basic EAS flow

The sequence is straightforward even if the first run feels foreign:

1. **Install and authenticate with EAS CLI**
2. **Initialize or confirm build configuration**
3. **Create a development build profile**
4. **Trigger a build for iOS or Android**
5. **Install the resulting binary on a device or simulator**

What EAS gives you is consistency. Instead of each developer improvising local native build state, the team can produce binaries from a shared build definition.

<a id="what-your-build-profile-is-really-doing"></a>
### What your build profile is really doing

A `development` profile isn't just a label. It tells the build system that this binary is intended for active development, not store distribution.

That usually means the installed app should:

- include the development client behavior
- be easy for developers and testers to launch
- connect to a Metro server during day-to-day work
- remain reusable until native dependencies change

This is also where CI starts becoming practical. Once a build profile exists and behaves predictably, you can automate it.

If your team is thinking more broadly about how React Native fits into larger modernization work, Wonderment Apps has a useful perspective on [React Native for AI modernization](https://www.wondermentapps.com/blog/react-native-development-services/). It's relevant because the development client often becomes part of the operational base layer when teams are shipping more frequent product changes across mobile surfaces.

A short walkthrough can help if you want to see the flow in action:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/FdjczjkwQKE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="installing-the-result"></a>
### Installing the result

Once the build finishes, treat the output like a real app binary, because that's what it is.

- **On Android:** You'll typically install an `.apk` on a physical device or emulator.
- **On iOS:** You'll work with an `.ipa` or simulator-compatible output depending on the target.
- **For teammates:** Share the build through the normal EAS mechanisms instead of asking everyone to create their own from scratch unless necessary.

> A development build is easiest to manage when the team agrees on one rule: rebuild for native changes, not for every code change.

<a id="what-not-to-expect"></a>
### What not to expect

Don't expect the first build to eliminate native complexity. It puts that complexity in the right place.

If you add a new native module, change permissions, update SDK-level native dependencies, or modify plugin-driven native config, you'll need a fresh development build. That's normal. The reward is that your day-to-day JavaScript work still moves quickly inside a client that reflects your app.

<a id="running-and-debugging-with-your-new-client"></a>
## Running and Debugging with Your New Client

The first time you open your installed client and connect it to Metro, the difference is obvious. It feels like Expo, but no longer in the toy-box sense.

Start the server with `npx expo start --dev-client`. Then open the development client on your simulator, emulator, or physical device and connect through the launcher UI. That launcher is one of the important changes introduced by `expo-dev-client`, alongside debugging support like network request inspection, as documented in the [Expo SDK page for dev client](https://docs.expo.dev/versions/latest/sdk/dev-client/).

![A male software developer writing code on a laptop computer in a professional office workspace environment.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b2a6ccb5-cef2-4886-91f9-9555247c1bfe/expo-development-client-software-developer.jpg)

<a id="a-normal-development-session"></a>
### A normal development session

A typical session looks like this:

You pull the latest branch. The installed development client is already on your device. You start Metro, launch the app, and connect to the current server. Then you work mostly as you did before, changing JavaScript and seeing updates quickly.

The big difference appears when you need to inspect behavior that depends on a real native environment. The custom client lets you test those flows without stepping outside your regular loop.

<a id="the-debugging-tools-that-matter"></a>
### The debugging tools that matter

The extra tooling isn't decorative. It solves daily problems.

- **Launcher UI:** Useful when switching between environments or teammate-hosted servers.
- **Developer menu:** Gives you the actions you expect during active iteration.
- **Network inspection:** Helps when the UI looks broken but the actual issue is request failure, auth state, or incorrect environment wiring.

> When API calls fail in a development client, inspect the request path and environment assumptions before touching UI code. The bug is often outside the component you're staring at.

Here's the practical advantage. A single installed binary can validate multiple environments without recompiling every time. That's especially helpful when a reviewer wants to test a PR preview, a QA engineer wants staging, and a developer wants a local branch.

If your team also ships web-based mobile shells, Capgo's [ultimate guide to debugging Capacitor apps](https://capgo.app/blog/ultimate-guide-to-debugging-capacitor-apps/) is worth reading for the broader debugging mindset. The tooling differs, but the discipline is similar: inspect transport, environment, and runtime behavior before guessing.

<a id="what-works-well-and-what-doesnt"></a>
### What works well and what doesn't

What works well:

| Situation | Why the development client helps |
|---|---|
| Testing auth redirects | Native app behavior is closer to production |
| Verifying API integration | Network inspection shortens the feedback loop |
| Switching environments | Launcher UI avoids unnecessary rebuilds |
| Team QA on one binary | Everyone tests the same native setup |

What doesn't work well:

- **Treating the client as disposable:** If the team doesn't maintain it, confusion creeps in fast.
- **Ignoring native rebuild boundaries:** Once native dependencies change, stale clients waste time.
- **Assuming all connection failures are app bugs:** Many are just local environment issues.

<a id="integrating-with-cicd-and-live-updates"></a>
## Integrating with CI/CD and Live Updates

The Expo development client becomes much more valuable when it stops being a personal setup and becomes part of team operations.

A mature workflow usually separates concerns. Native changes produce a new development build. JavaScript and asset changes move through a faster update path. Reviewers and QA don't need to ask whether they're testing the right thing because the team has agreed on channels, build profiles, and update destinations.

![A professional team collaborating on a CI/CD pipeline automation workflow on a large office display screen.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/3abb7e88-32c9-491b-9224-9ca50f5b3557/expo-development-client-automated-workflow.jpg)

<a id="where-cicd-fits"></a>
### Where CI/CD fits

The development client works well with CI because it gives automation a stable target.

A common pattern looks like this:

- **Pull request changes:** CI creates or validates a development build when native dependencies have changed.
- **Branch-based environments:** Different branches map to different update channels or server targets.
- **Shared tester workflow:** QA installs one or more known dev clients and switches context through launcher and update configuration.

That structure reduces ambiguity. Developers know when they need a rebuild. Testers know whether they're validating a native change or an update delivered on top of an existing binary.

<a id="the-role-of-live-updates"></a>
### The role of live updates

The development client often enables teams to save the most time operationally. The development client is a strong place to validate update behavior before release because it can switch between development servers and published updates in a production-like app shell, as described earlier in the Expo documentation.

That opens a useful split:

| Change type | Delivery path |
|---|---|
| New native module or permission change | New development build |
| JavaScript behavior fix | Publish update |
| Copy or asset adjustment | Publish update |
| Environment validation | Switch channel or server in the installed client |

For teams outside the Expo update stack, [Capgo's CI/CD integration guide for OTA updates](https://capgo.app/blog/capacitor-ota-updates-cicd-integration-guide/) shows a comparable operational model on the Capacitor side. It's one option for teams that want controlled rollout channels and automation around update delivery.

> The reliable pattern is simple. Build when native code changes. Publish when the installed binary already contains everything the change needs.

<a id="team-habits-that-prevent-chaos"></a>
### Team habits that prevent chaos

The technical setup matters, but the operating rules matter more:

- **Name channels clearly:** `staging`, `production`, and preview names should be obvious.
- **Document rebuild triggers:** New plugin, permission change, or native SDK update should never be a judgment call.
- **Keep one installable client per environment strategy:** Too many variants create support noise.
- **Make update validation explicit:** Someone should verify that the update applies and launches inside the same binary the team expects.

At this point, the Expo development client stops being a developer convenience and becomes release infrastructure.

<a id="troubleshooting-common-pitfalls-and-fixes"></a>
## Troubleshooting Common Pitfalls and Fixes

Most Expo development client issues are ordinary once you know where to look. They feel mysterious because failures often happen across boundaries: laptop to device, Metro to app, native config to JavaScript runtime.

One of the most common and under-discussed problems is failure to connect to Metro on physical devices due to local network segmentation, VPNs, or firewall rules in enterprise and distributed-team environments, a point surfaced in this [Expo Dev Client troubleshooting video](https://www.youtube.com/watch?v=p75oQTJaLGo).

<a id="when-the-client-wont-connect-to-metro"></a>
### When the client won't connect to Metro

This is the issue that burns the most time because it looks like a broken app when the app is often fine.

Check these first:

- **Same network assumptions:** Devices and laptops may appear connected while sitting on isolated segments.
- **VPN interference:** A corporate or personal VPN can redirect traffic in ways Metro doesn't tolerate well.
- **Firewall rules:** Security tooling may block local development traffic without making it obvious.
- **Corporate device policies:** Managed devices sometimes restrict the traffic patterns development tools rely on.

If the project works in a simulator but not on a physical device, suspect the network before suspecting your React code.

> Don't debug connection failures from inside the app first. Confirm the device can actually reach the machine running Metro.

<a id="when-rebuilds-seem-random"></a>
### When rebuilds seem random

Another common frustration is the feeling that some changes appear instantly and others stubbornly don't.

That usually means the team hasn't internalized the rebuild boundary:

| Symptom | Likely cause | Fix |
|---|---|---|
| JavaScript updates apply normally | Expected behavior | Keep working in the existing client |
| New native dependency doesn't appear | Native layer changed | Create a new development build |
| Permission-related behavior is inconsistent | Native config changed | Rebuild and reinstall |
| One teammate sees different behavior | Different client binary installed | Align on the same build |

This isn't a flaw in the workflow. It's the workflow doing exactly what it should do.

<a id="build-failures-and-team-drift"></a>
### Build failures and team drift

When builds fail, the root cause is often one of these:

- **Dependency mismatch:** A package version doesn't align with the rest of the project.
- **Native plugin assumptions:** A config plugin expects setup the project doesn't have.
- **Credential confusion:** Signing or account access isn't consistent across the team.
- **Stale local expectations:** Someone assumes a fresh build isn't needed when it is.

Capgo's article on [common live update issues and solutions for developers](https://capgo.app/blog/common-live-update-issues-and-solutions-for-developers/) is useful supplemental reading for the release side of this problem. Different stack, same lesson: many “app bugs” are really delivery, environment, or version-alignment bugs.

The Expo development client works best when the team treats environment reliability as part of engineering. Not as an afterthought. Once you do that, the setup becomes predictable, and predictable is what you want from mobile tooling.

---

If your team also ships Capacitor apps and needs a controlled way to deliver JavaScript, asset, and config updates without waiting for store review, [Capgo](https://capgo.app) is one option to evaluate. It provides live updates, rollout controls, and CI/CD integrations for Capacitor and Electron workflows.
