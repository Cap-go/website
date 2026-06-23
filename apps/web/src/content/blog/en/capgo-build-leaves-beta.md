---
slug: capgo-build-leaves-beta
title: Capgo Build Leaves Beta
description: >-
  Capgo Build is out of beta. How our cloud build service for Capacitor grew
  up: guided onboarding, AI build analysis, and production-ready stability.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2026-05-29T00:00:00.000Z
updated_at: 2026-06-18T14:21:30.000Z
head_image: /capgo-build-leaves-beta.jpg
head_image_alt: "Capgo Build Leaves Beta Capgo blog illustration"
keywords: Capgo Build, Capacitor, cloud build, iOS build, Android build, native build, code signing, TestFlight, OTA updates
tag: Product
published: false
locale: en
next_blog: ''
---

<!-- DRAFT — not ready to publish. Pending: confirm Android onboarding has shipped to prod, plus a final copy pass. When ready, set published: true and remove this comment. -->

Hey, I am [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny), Capgo's lead software engineer. Today I get to share something the whole team has been building toward for months: **Capgo Build is officially out of beta.**

If you have not tried it yet, Capgo Build compiles the native parts of your Capacitor app - iOS and Android - in the cloud, from a single command. No local Xcode, no Android Studio, no Mac sitting in a closet just to ship an iOS release. We held onto the "beta" label until we were sure. Now we're sure: Build is ready for real release pipelines.

Here is the story of how it got here.

## The half of the problem we had not solved

Capgo started as a live update system. For years that was the whole pitch: push JavaScript, HTML, and CSS changes to your users instantly, without waiting on app store review. That part works beautifully and it is still the thing most of you use every single day.

But live updates only ever solved half of the problem. The moment you touch something *native* - add a Capacitor plugin, change a permission, bump the Capacitor major version, or simply submit your very first build - over-the-air updates cannot help you. That drops you straight back into the part everyone hates — Xcode, signing, and fighting a store upload that breaks without telling you why.

That is the gap Capgo Build closes — and getting it reliable enough to call stable is exactly what the beta period was for.

## What Capgo Build does today

Before the story, the short version of where we landed:

- **One CLI for iOS and Android.** The same `bunx @capgo/cli build` command builds either platform — pass `--platform ios` or `--platform android` — and runs from your laptop or any CI (GitHub Actions, GitLab CI, Jenkins).
- **Real Apple hardware.** Builds run on dedicated Mac Mini M4 machines with Xcode 26.2 and Android Studio 2025 already installed and maintained.
- **Automatic code signing** for certificates, provisioning profiles, and keystores.
- **Direct store submission** to App Store Connect / TestFlight and Google Play.
- **Real-time logs** streamed straight to your terminal so you can watch a build happen.
- **A security model we are proud of:** credentials live in memory only for the duration of the build, every environment is ephemeral and destroyed afterward, logs are never stored on our servers, and only the native platform folder is uploaded - never your full source.

## From beta to production: the timeline

We launched Capgo Build in November 2025 and have shipped steadily ever since. Here is how it went.

<style>
.cb-tl { position: relative; margin: 2rem 0; padding-left: 2rem; border-left: 2px solid rgba(255,255,255,0.12); }
.cb-tl__item { position: relative; padding-bottom: 2rem; }
.cb-tl__item:last-child { padding-bottom: 0; }
.cb-tl__dot { position: absolute; left: -2.6rem; top: 0.2rem; width: 0.85rem; height: 0.85rem; border-radius: 9999px; background: #34d399; box-shadow: 0 0 0 4px rgba(52,211,153,0.15); }
.cb-tl__item--ga .cb-tl__dot { background: #60a5fa; box-shadow: 0 0 0 4px rgba(96,165,250,0.2); }
.cb-tl__date { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #34d399; }
.cb-tl__item--ga .cb-tl__date { color: #60a5fa; }
.cb-tl__title { font-size: 1.05rem; font-weight: 700; color: #fff; margin-top: 0.25rem; }
.cb-tl__desc { font-size: 0.95rem; color: #94a3b8; margin-top: 0.3rem; line-height: 1.55; }
@media (max-width: 640px) { .cb-tl { padding-left: 1.5rem; } .cb-tl__dot { left: -2.1rem; } }
/* This post only: drop Tailwind Typography's default backtick quotes around inline code. */
.blog.prose code::before, .blog.prose code::after { content: none; }
</style>
<div class="cb-tl">
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">October 2025</div>
    <div class="cb-tl__title">The project begins</div>
    <div class="cb-tl__desc">The first cloud build jobs run for iOS and Android.</div>
  </div>
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">November 2025</div>
    <div class="cb-tl__title">Public launch</div>
    <div class="cb-tl__desc">One-command iOS and Android builds go live, with code signing and store credentials.</div>
  </div>
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">December 2025</div>
    <div class="cb-tl__title">Architecture rewrite for stability</div>
    <div class="cb-tl__desc">We rebuild the build backend from the ground up — fewer moving parts, far fewer failed builds.</div>
  </div>
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">January 2026</div>
    <div class="cb-tl__title">Capacitor 8 and live logs</div>
    <div class="cb-tl__desc">Capacitor 8 support, direct Play Store upload, and real-time WebSocket build logs.</div>
  </div>
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">February 2026</div>
    <div class="cb-tl__title">Real-time logs and dependable status</div>
    <div class="cb-tl__desc">Rebuilt log streaming and pass/fail reporting, so you always know exactly what your build did.</div>
  </div>
  <div class="cb-tl__item">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">April 2026</div>
    <div class="cb-tl__title">Android flavors and QR installs</div>
    <div class="cb-tl__desc">Android product flavors, plus instant QR install links on a successful build.</div>
  </div>
  <div class="cb-tl__item cb-tl__item--ga">
    <div class="cb-tl__dot"></div>
    <div class="cb-tl__date">May 2026</div>
    <div class="cb-tl__title">AI analysis, and out of beta</div>
    <div class="cb-tl__desc">AI build-log analysis ships — and Capgo Build leaves beta.</div>
  </div>
</div>

## What graduated during beta

Three things turned Capgo Build from "promising" into "production-ready." They are the reason I am comfortable taking the beta label off.

### Guided onboarding

The single biggest source of friction in the early beta was the first build. Signing is genuinely hard - certificates, provisioning profiles, App Store Connect keys, Android keystores - and getting any one of them wrong meant a cryptic failure.

So we built `build onboarding` (also available as `build init`), an interactive terminal wizard that automates the entire iOS credential setup. Instead of roughly ten manual steps spread across the Apple Developer portal, App Store Connect, and the CLI, you hand it a single App Store Connect API key — the `.p8` file — and it does the rest: generates the signing request, creates and packages your distribution certificate, registers the bundle ID, creates the provisioning profile, and saves everything locally.

It also handles the parts that used to trip people up. If you have hit Apple's certificate limit, it offers to revoke an old one and retries. If you quit halfway through, it picks up where you left off instead of leaving you with a half-created certificate to untangle by hand. When it finishes, it can kick off your first build right away, with the logs streaming live in your terminal.

Android signing is a different headache — a keystore plus a Google Play service account, scattered across Google Cloud and the Play Console. `build init --platform android` handles that one too: it generates your keystore, you sign in to Google once, and from there it creates the Google Cloud project, enables the Play API, creates a service account, and grants it access to your Play Console — then saves everything and can run your first Android build.

### AI build analysis

Native build failures are notoriously opaque. A wall of Xcode or Gradle output, and somewhere in it the one line that matters.

So we added AI analysis. Turn it on with `build request --ai-analytics`, and when a build fails the CLI offers to read the log for you. It pulls out the part that actually matters, runs it through an AI model, and prints back a plain-language diagnosis of what went wrong and how to fix it, rendered right there in your terminal. No dashboard to open, no log to scroll: you pick `Capgo AI`, `Local AI` (which hands the prompt to any model you want to run yourself), or `Skip`, and you have an answer in seconds.

### Stability

Most of the beta was reliability work, not new features. The main changes:

- Rebuilt the build backend on a new architecture, retiring the older machine setup.
- Every build now has one source of truth for its status, with updates that can't be overwritten or lost to a race.
- A full audit trail records every state change, so the exact path a build took is always there to inspect.
- A background check reconciles any build whose status report goes missing, so jobs no longer get stuck showing "running".
- Jobs retry automatically when a machine doesn't pick them up in time, instead of failing.
- Stuck builds get caught and cleaned up within a minute.

## How it works alongside Live Updates

Capgo Build does not replace live updates - the two are meant to be used together, and most teams will:

- Use **[Live Updates](/live-update/)** every day for JavaScript, HTML, and CSS changes that ship instantly.
- Use **Capgo Build** whenever you change native code - a new plugin, a permission, a Capacitor upgrade, a new icon, or your first store submission.

One platform now covers the entire update lifecycle of a Capacitor app, from a one-line CSS fix to a fully signed binary in the store.

## Try Capgo Build

If you have been waiting for the "stable" label before putting cloud builds in your pipeline, this is it.

```bash
bunx @capgo/cli@latest build com.example.app --platform ios --submit
```

- See everything it does on the [Capgo Build page](/native-build/).
- Follow the [getting-started guide](/docs/builder/getting-started/) for your first build.
- New to building from a non-Mac machine? Read [how to build an iOS app from Windows](/blog/build-ios-app-from-windows-capacitor-capgo-build/).

Native builds are included in your Capgo plan, with credit-based billing for extra build minutes. I cannot wait to see what you ship.
