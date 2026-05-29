---
slug: how-to-keep-capgo-updates-lean-and-fast
title: "How to Keep Capgo Updates Lean and Fast"
description: >-
  A practical Capgo guide to smaller, safer live updates: delta bundles,
  channel-based rollout, native baseline refreshes, PR previews, and direct
  update guardrails.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-04-14T15:12:19.000Z
updated_at: 2026-05-29T11:34:25.000Z
head_image: /capgo_lean_updates_hero.webp
head_image_alt: Capgo lean live updates workflow
keywords: Capgo, live updates, OTA updates, delta updates, channels, Capacitor, PR previews, mobile performance
tag: Tutorial
published: true
locale: en
next_blog: staging-environments-with-capgo-channels
---

The best live update is the one your users barely notice.

That usually means three things:

1. The download is small.
2. The rollout is controlled.
3. Recovery is instant if something goes wrong.

The same "keep OTA lean" advice that works in React Native land also applies to Capgo. The difference is that Capgo gives Capacitor teams a few extra levers: [Delta updates](/docs/live-updates/differentials/), [channels](/docs/live-updates/channels/), [automatic rollbacks](/docs/live-updates/rollbacks/), [version targeting](/docs/live-updates/version-targeting/), and optional [end-to-end encryption](/docs/live-updates/encryption/).

If you use those together, you get smaller payloads, faster installs, and much less operational mess.

## Lean matters even when MAU stays the same

One useful Capgo-specific detail: Capgo MAU is effectively the number of monthly active devices that contacted the update service in the last 30 days.

So slimming a bundle is not mainly a trick to reduce MAU counting. It matters because it improves the parts users and teams actually feel:

- Faster downloads on cellular or weak Wi-Fi
- Better experience with [direct updates](/docs/live-updates/update-behavior/)
- Less wasted bandwidth on failed or rolled-back releases
- Smaller blast radius when testing or staging a release

Lean updates are really about speed, safety, and operational discipline.

## 1. Default to Delta updates

If you do only one thing, do this.

Capgo's [Delta updates](/docs/live-updates/differentials/) send only files that changed between versions instead of re-downloading the full web bundle. That is the biggest single win for routine OTA performance.

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel staging --delta
```

When your QA pass is done:

```bash
bunx @capgo/cli@latest bundle upload --channel production --delta
```

If you want CI to stay strict, use `--delta-only` so nobody accidentally falls back to full-bundle uploads:

```bash
bunx @capgo/cli@latest bundle upload --channel production --delta-only
```

Only use `--delta-only` when your production fleet supports Delta updates. On mixed plugin versions, older devices that do not support manifest-based delta delivery will not be able to download that update.

This matters even more if you use `directUpdate`, because the time between "update found" and "app reloaded" becomes visible to the user.

## 2. Treat assets like assets, not JavaScript baggage

Large assets are where OTA bundles quietly get bloated.

Some practical rules:

- Do not inline big images or media inside JavaScript when a normal asset file will do.
- Keep frequently changing content on your own CDN or API if it does not need to live inside the shipped app bundle.
- Be careful with marketing images, onboarding videos, and one-off campaign assets that get replaced every release.
- Let stable assets stay stable. With Delta updates, unchanged files are reused instead of downloaded again.

This is one of the easiest ways to keep Capgo fast as your app grows. The worst pattern is a tiny UI fix that forces users to download a pile of unrelated media.

## 3. Keep native releases for real native changes

Capgo updates the web layer: HTML, CSS, JavaScript, and assets loaded at runtime.

It is not the right channel for:

- new native plugins,
- permission changes,
- `capacitor.config.ts` changes,
- anything that modifies iOS or Android native project state.

That line matters for performance too. If you keep shoving major structural changes into the OTA lane, your update strategy gets heavier and riskier over time.

Use two release lanes on purpose:

### Native lane

For plugin changes, permission changes, and native configuration:

```bash
bun run build
bunx cap sync
```

Then ship a normal store release.

### Capgo lane

For safe web-layer iteration:

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel production --delta
```

Also refresh your native baseline regularly if you recently added a lot of long-lived assets. A fresh store build embeds that new baseline, which keeps future Capgo diffs smaller.

## 4. Use channels to keep rollout size small

A "lean" update is not only about megabytes. It is also about how many devices receive the update before you know it is good.

Capgo's [channel system](/docs/live-updates/channels/) is the cleanest way to control that:

- `staging` for QA
- `beta` for invited testers
- `production` for everyone
- `hotfix` for emergency recovery

A simple flow looks like this:

1. Upload to `staging`.
2. Validate on real devices.
3. Roll out gradually, whether through controlled channels or percentage-based rollout.
4. Roll back immediately if health drops.

If your app has multiple native baselines in the wild, pair channels with [version targeting](/docs/live-updates/version-targeting/). That keeps incompatible or unnecessarily heavy bundles away from older binaries.

For teams that want even tighter review loops, Capgo also works well for [PR previews](/blog/turn-every-pr-into-installable-preview/). That lets product, QA, and stakeholders test JS-only changes without waiting on new TestFlight or Play internal builds.

## 5. If you enable direct updates, optimize startup hard

The faster you want an update applied, the more disciplined your startup path needs to be.

Capgo's [update behavior](/docs/live-updates/update-behavior/) docs explicitly recommend pairing `directUpdate` with Delta updates. That is the right default.

The second guardrail is `notifyAppReady()`.

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

If your app does not report ready within the default 10-second `notifyAppReady()` window, or within whatever `appReadyTimeout` you set in your Capacitor config, Capgo can mark that bundle invalid and restore the previous good version. That rollback behavior is what you want in production, but it also means you should keep startup clean:

- Call `notifyAppReady()` in the right place
- Avoid slow boot-time work in the critical path
- Save and restore app state carefully if you reload immediately
- Test bad-network and low-end-device scenarios before broad rollout

If you have not reviewed it recently, the [notifyAppReady guide](/docs/plugins/updater/notify-app-ready/) is worth re-reading.

## 6. Use internal update channels instead of unnecessary native rebuilds

A lot of mobile teams waste time building binaries for changes that are clearly web-only.

If the change is:

- copy,
- UI polish,
- onboarding flow,
- pricing screen logic,
- analytics wiring,
- feature flags,
- prompt or API response rendering,

then a Capgo update is often the faster review artifact.

That means fewer native rebuilds, less TestFlight churn, and a tighter feedback loop for the team. It is one of the most underused benefits of Capgo: you can move more review and QA work into the OTA lane without breaking the native/web boundary.

Our guide on [staging with one mobile app ID](/blog/staging-environments-with-capgo-channels/) covers a practical way to keep this clean over time.

## 7. Keep lean separate from secret

Small bundles and secure bundles solve different problems.

Channels control eligibility. They do not make a bundle confidential by themselves.

If you need stronger delivery guarantees:

- enable [Live Update encryption](/docs/live-updates/encryption/),
- use [custom storage or self-hosted delivery](/docs/live-updates/custom-storage/),
- keep private keys only in CI or secured operator workflows.

That does not make update size irrelevant. It just means you should optimize for both dimensions:

- lean for speed,
- encrypted for delivery control,
- channels for rollout control,
- rollback for recovery.

## A practical "lean Capgo" workflow

If you want a simple default operating model, use this:

1. Keep native and OTA release lanes separate.
2. Upload JS changes with `--delta` by default.
3. Use `staging` and `beta` channels before `production`.
4. Watch [update stats and logs](/docs/webapp/logs/) after rollout, not just before it.
5. Turn PRs into installable previews when a native build is unnecessary.
6. Keep large, frequently changing media out of the bundle where possible.
7. Refresh the native baseline after major asset growth or native changes.
8. Treat `notifyAppReady()` and rollback behavior as part of release engineering, not setup trivia.

That combination stays fast much longer than the common "just upload whatever changed" approach.

## Closing thought

For Capgo teams, "lean and fast" is not just a bundle-size problem.

It is a release design problem.

Use Delta updates for payload size, channels for rollout size, and rollbacks for failure size. Once you think about OTA that way, your updates stay quick even as the app, team, and user base get bigger.

## Keep going from How to Keep Capgo Updates Lean and Fast

If you are using **How to Keep Capgo Updates Lean and Fast** to plan channel routing and staged rollout, connect it with [Channels](/docs/live-updates/channels/) for the implementation detail in Channels, [Channels](/docs/public-api/channels/) for the implementation detail in Channels, [Channels](/docs/webapp/channels/) for the implementation detail in Channels, [Beta Testing Solution](/solutions/beta-testing/) for the product workflow in Beta Testing Solution, and [Version Targeting Solution](/solutions/version-targeting/) for the product workflow in Version Targeting Solution.
