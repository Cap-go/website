---
slug: how-to-bypass-app-store-review
title: How to update Capacitor JS apps without repeat store review
description: >-
  A practical, policy-aware playbook for shipping Capacitor JavaScript updates on
  iOS and Android without submitting a full app review for every small fix.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2026-02-23T02:14:43.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor bypass illustration
keywords: Apple App Store, Google Play, Capacitor, Capgo, OTA updates, live updates, app store review
tag: Tutorial
published: true
locale: en
next_blog: app-store-vs-direct-updates-what-developers-need-to-know
---

_Glad you asked._

I am not giving legal advice. I am sharing what’s practical and widely used across teams shipping Capacitor apps safely.

The important distinction is this:

- **Native submission** is still required for new native behavior and major capabilities.
- **Live updates** are for JavaScript/web fixes and adjustments inside your existing app scope.

Both iOS and Android can use this model, but you must treat it as a **policy-safe workflow**, not a loophole.

## What Apple and Google allow in simple terms

You can treat Apple and Google as sharing a similar boundary:

1. You can deliver code interpreted by the embedded web layer (HTML/CSS/JS) without resubmitting.
2. You should not use that channel for major feature additions that change app purpose.
3. You should not alter critical security or distribution controls through JS alone.

Apple’s official guidance around WebKit/JavaScript updates is the core of this model. Google is typically less restrictive for web-based updates, but the same principle applies: keep native changes in a native release.

## What Capgo is good for

Capgo is for:

- hotfixing web bugs,
- safe UI copy / style / flow fixes,
- minor logic corrections in existing pages,
- fast experimentation for internal QA.

Capgo is not for:

- adding permissions or new native capabilities,
- shipping new core capabilities that should go through review,
- changing signing, encryption, or package identity behavior.

## Recommended release strategy

Think in two tracks:

### Track 1: native track (store review)

Use your normal Capacitor release process for:

- new plugin updates,
- app shell or manifest changes,
- permissions updates,
- platform-specific functionality changes.

These require:

```bash
bun run build
bunx cap sync
# then App Store / Google Play submission flow
```

### Track 2: JS track (Capgo)

For safe, small runtime changes:

```bash
bun run build
bunx @capgo/cli deploy --channel staging
bunx @capgo/cli deploy --channel production
```

This gives you fast iteration without new binary uploads while keeping the binary
itself stable.

## How to avoid “oops, this needed a native release”

Before every Capgo rollout, run this quick gate:

1. Does the change require a new native dependency or permission?
2. Does it change the app’s advertised capabilities?
3. Does it alter authentication/security boundaries?
4. Can we describe it as a non-breaking JavaScript fix?

If the answer is yes to (1)-(3), submit a native release.
If yes only to (4), send through Capgo.

## What this means for compliance teams

- You keep app review bandwidth for meaningful changes.
- You preserve rollback control and fast patching.
- You reduce production risk by testing updates in channels before full rollout.

This is the same approach people use on large Capacitor programs in production: fast updates for JS-only fixes, native review only for real binaries.

If you want to go deeper, pair this with a strict environment strategy based on channels so QA never receives production mistakes. That is the Capgo-native way to keep staging, beta, and production clean.
