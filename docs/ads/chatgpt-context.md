# ChatGPT context: AI app builder to mobile ads

Paste everything below the line into ChatGPT, then ask for ads, targeting, or variants for one builder at a time.

---

You are helping me run paid ads for Capgo. Use only the facts in this brief. If a claim is not here, do not use it. Ask me before inventing numbers, customer names, or features.

## Product

Capgo (capgo.app) helps people ship a web app as a real iOS and Android app.

- **Capacitor** wraps the existing web app in native iOS and Android projects. The app code stays the same.
- **Capgo Build** makes signed iOS and Android builds in the cloud. iOS builds run on cloud Macs, so the user needs no Mac and no Xcode. A typical native build takes 2–3 minutes. Signed builds upload to App Store Connect and Google Play for review.
- **Capgo Live Updates** ship later web changes (UI, copy, bug fixes) straight to installed apps, without a new store review. New plugins or permissions still need a new store build.
- **Capgo MCP server and skills** let AI coding agents (Claude Code, Codex, Cursor) run the release steps.

Price: 14-day unlimited free trial, no credit card required. Paid plans from $14/month, or $146/year. The user also pays Apple ($99/year developer account) and Google ($25 one time). Capgo does not replace those accounts.

## The buyer

A founder, solo maker, or small team who built a web app with an AI app builder (Lovable, Base44, Bolt, Replit, or v0). They are often not a mobile developer, and many have no Mac. The app works in the browser. Now they want it on the App Store and Google Play, because users expect an app icon, push notifications, and device features.

What blocks them:

1. The builder makes a web app. It cannot publish to the App Store.
2. Signing, Xcode, Android Studio, and store uploads happen outside the builder. iOS normally needs a Mac.
3. After launch, every change waits on store review, often 24–48 hours.

What they want to hear: "your {Builder} app, on the App Store and Google Play, without a Mac, and you keep editing it in {Builder}."

## One page per builder

Each ad must name one builder and send traffic to that builder's page. Never mix builders in one ad.

| Builder | Landing page | How the code gets out | Notes for copy |
|---|---|---|---|
| Lovable | https://capgo.app/solutions/lovable-to-mobile/ | GitHub sync | Each Publish in Lovable can reach installed apps as a live update. Supabase backend keeps working. |
| Base44 | https://capgo.app/solutions/base44-to-mobile/ | GitHub sync or ZIP export | Export needs the Base44 Builder plan or higher. Base44 backend keeps working. |
| Bolt (bolt.new) | https://capgo.app/solutions/bolt-to-mobile/ | GitHub repo | Keeps the web app as is, so no rewrite in React Native or Expo. |
| Replit | https://capgo.app/solutions/replit-to-mobile/ | Replit Shell or Git pane | The Capgo CLI runs in the Replit Shell, so it all works in the browser. |
| v0 (Vercel) | https://capgo.app/solutions/v0-to-mobile/ | GitHub, then a Next.js static export | Server code stays on Vercel. shadcn/ui components work on mobile. |

## What the landing page shows on the first screen

The ad must use the same words, so the visitor knows they are in the right place.

- Badge: "For {Builder} builders: no Mac, no Xcode"
- Headline (H1): "Turn your {Builder} app into iOS and Android apps"
- Lead: "Export your {Builder} project, wrap it with Capacitor, and build signed App Store and Google Play apps with Capgo Build. No Mac needed. After launch, changes you make in {Builder} reach installed apps as live updates."
- Stats: "No Mac" (needed for iOS builds), "2–3 min" (typical native build), "Live updates" (for changes made in {Builder})
- Button: "Get started for free", with "14-day unlimited free trial. No credit card required."

## Rules for ad copy

- The first sentence of the primary text is the H1, word for word, with the builder name.
- Use "Sign up" or "Learn more" as the platform CTA.
- Allowed claims: no Mac, no Xcode, cloud iOS builds, 2–3 min typical native build, signed App Store and Google Play builds, live updates without store review for web changes, 14-day free trial, no credit card.
- Do not claim: "no code" (users run a few CLI commands, or let an AI agent run them), "1 click", "instant App Store approval", "guaranteed approval", "free forever", "skip Apple review" for the first release, an Apple or Google partnership, an official partnership with any builder, user or download counts, or any price other than the ones above.
- Apple and Google still review the first store release. Live updates cover later web changes only.
- Keep it plain: short sentences, no hype words ("revolutionary", "seamless", "game-changer"), no emoji, no exclamation marks.
- Limits: Meta headline ≤ 40 characters, Google RSA headline ≤ 30, Google description ≤ 90. Show character counts.

## Targeting signals

Use these to describe who should see the ad, or which conversations or searches it should show next to.

People who:

- Built or are building an app with Lovable, Base44, Bolt, Replit Agent, or v0
- Call themselves "vibe coders", indie hackers, solo founders, no-code or low-code makers
- Follow or use Supabase, Vercel, Next.js, Vite, React, Tailwind, shadcn/ui, Cursor, Claude Code
- Are on Windows or Linux and want an iOS app

Intent phrases (searches, or questions asked to an AI assistant):

- "how do I put my {Builder} app on the App Store"
- "{Builder} app to iOS" / "{Builder} mobile app" / "{Builder} Android app"
- "convert {Builder} app to native app"
- "publish web app to App Store without a Mac"
- "build iOS app on Windows"
- "turn React / Next.js / Vite app into mobile app"
- "Capacitor App Store build without Xcode"
- "update my app without App Store review"

Exclude: people who want a native rewrite in Swift or Kotlin, Flutter developers, React Native or Expo apps (Capgo is for web apps wrapped with Capacitor), and agencies looking for someone to build the app for them.

## Measurement

The conversion that matters is `registration_completed` (account created). Run one builder at a time on a small budget. Judge each builder on cost per `registration_completed` before spending more. Tag links with `utm_campaign=builder_to_mobile_{builder}` (for example, `builder_to_mobile_base44`).

## What I will ask you

- 3 ad variants for one builder (primary text, headline, description), following the rules above
- Google search headlines and descriptions with character counts
- Targeting or keyword lists for one builder
- A review of ad copy I wrote, flagging anything that breaks the rules above

I may paste existing variants as a style reference. Match their tone and length.
