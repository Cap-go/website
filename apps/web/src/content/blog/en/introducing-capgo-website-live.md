---
slug: introducing-capgo-website-live
title: 'Capgo Website Live: Your Website Now Updates Your App'
description: >-
  Website Live keeps your Capacitor app in sync with the static website you
  already deploy. No CLI, no uploads, unlimited updates and devices for $12/month.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-10-07T00:00:00.000Z
updated_at: 2026-10-07T00:00:00.000Z
head_image: /blog-images/introducing-capgo-website-live.webp
head_image_alt: 'Capgo Website Live: your website now updates your app, Capgo blog illustration'
keywords: 'capgo website live, capacitor live updates, lovable mobile app, vibe coding, ota updates, static site'
tag: News, Product, Updates
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: How much does Website Live cost?
    answer: >-
      $12 per month or $120 per year per organization, with unlimited updates
      and unlimited devices. There is no bandwidth billing because the files
      come from your own website.
  - question: What does Website Live not include?
    answer: >-
      Channels, staged or percentage rollouts, update stats and device logs,
      end-to-end encryption, bundle history and native builds. You can switch
      to a full Capgo plan from app settings whenever you need them.
  - question: Does my site need to be static?
    answer: >-
      Yes. The website must be a static client build, the same files Capacitor
      packages into the app. Server-rendered pages such as Next.js server routes
      do not work.
---

A lot of the Capacitor apps we see now start life on Lovable, Bolt, v0 or Cursor. Someone builds a web app, it works, they wrap it with Capacitor and ship it to the stores. Then the second week arrives, they fix a bug on the website, and the mobile app is still running last week's code.

Full Capgo solves that with bundle uploads, channels and CI. That is the right setup for a team that releases on a schedule and wants to know exactly which device runs which build. For a solo founder who just wants the app to match the website, it is a lot of moving parts.

So we built something smaller. It's called [Website Live](/website-live/).

## How it works

Your deployed website becomes the source of truth for the app.

1. You add the `@capgo/capacitor-updater` plugin to your Capacitor project, set `websiteMode: true` in its Capacitor config, and call `notifyAppReady()` once the app has loaded.
2. In the Capgo console, you create the app, choose Website Live and enter the domain where the site is deployed.
3. You ship the native app to the stores once.

After that you deploy your site the way you already do, on Vercel, Netlify, Cloudflare Pages or anything else that serves static files. When the app checks for an update, it asks Capgo two things: is this app allowed to update, and which domain should it use. Then it downloads the files straight from your website and applies them right away.

If a new version fails to start, meaning the app never calls `notifyAppReady()`, the updater goes back to the version that last worked. Fix the site, deploy again, and devices pick up the fix.

No CLI. No bundle uploads. No CI step to keep alive.

## What it costs

$12 per month, or $120 per year (two months free), per organization. Updates and devices are unlimited and there is no MAU limit. There is no bandwidth line either, because the downloads come from your own website, not from us.

## What it does not do

We would rather say this up front. Website Live leaves out:

- Channels (production, beta, internal)
- Staged and percentage rollouts
- Update stats and device logs
- End-to-end encryption
- Bundle history and rollback to old versions from the dashboard
- Native iOS and Android builds

There is also one hard requirement. Your website has to be a static client build, the same files Capacitor packages into the app. A Vite build or a static export works. Next.js server pages, or any SSR shell, do not, because there is nothing static to download.

If a website change depends on a new native plugin, you still need to ship a new native build through the stores first. Older installs do not have that plugin, so the new code would fail to start there and roll back.

## What about App Store rules?

Website Live downloads HTML, CSS and JavaScript that runs in the WebView, the same thing Capgo live updates have always done. Apple allows downloaded interpreted code as long as it does not change the primary purpose of the app, bypass the security of the operating system, or create a store for other code (section 3.3.1(B) of the Developer Program License Agreement). Guideline 4.2 still applies to every app: it needs to be more than a repackaged website. Our [compliance guide](/docs/live-updates/compliance/) goes into more detail.

## When you need more

At some point you may want a beta channel, a 10% rollout, or to see which devices are stuck on an old version. Open your app settings in the Capgo console and switch to the full Capgo experience. A guided onboarding sets up CLI uploads, and channels, stats, encryption and bundle history come back. You can also change your Website Live domain from the same settings at any time.

Website Live is the simplest way to keep an app current. Full Capgo is for when you want control and visibility over each release. Compare both on the [pricing page](/pricing/), or [create an account](https://console.capgo.app/register/) and connect your domain.
