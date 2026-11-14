---
slug: cordova-plugin-audioroute-alternative
title: "cordova-plugin-audioroute Alternative for Capacitor"
description: "cordova-plugin-audioroute alternative for Capacitor VoIP and media apps: route headphones, speaker override, and interruptions with @capgo/capacitor-audio-session."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-14T09:00:00.000Z
updated_at: 2026-11-14T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an audio route plugin guide"
keywords: cordova-plugin-audioroute alternative, capacitor audio session, ios audio routing, @capgo/capacitor-audio-session, audioroute migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-audioroute alternative on Capacitor?"
    answer: "@capgo/capacitor-audio-session ports saghul/cordova-plugin-audioroute for Capacitor with currentOutputs, overrideOutput, routeChanged events, and interruption listeners on iOS."
  - question: "Does the plugin work on Android?"
    answer: "No. Both the Cordova plugin README and the Capgo README state iOS only. Android and web resolve to stubs with empty outputs."
  - question: "Is cordova-plugin-audioroute still maintained?"
    answer: "npm lists version 0.1.2 with modified 13 June 2022. The GitHub repository saghul/cordova-plugin-audioroute last committed in April 2017."
  - question: "How do I force speaker during a call?"
    answer: "Call AudioSession.overrideOutput('speaker') and restore with overrideOutput('default') when the session ends."
  - question: "How do route changes compare to Cordova?"
    answer: "Cordova fires document audioroute-changed. Capgo uses addListener('routeChanged', ...) with typed payloads."
  - question: "Where are docs?"
    answer: "https://capgo.app/docs/plugins/audiosession/, npm @capgo/capacitor-audio-session, GitHub Cap-go/capacitor-audiosession."
---

The **cordova-plugin-audioroute alternative** for Capacitor iOS apps is [`@capgo/capacitor-audio-session`](/plugins/capacitor-audiosession/). The Capgo plugin is a port of [saghul/cordova-plugin-audioroute](https://github.com/saghul/cordova-plugin-audioroute) and exposes `currentOutputs()`, `overrideOutput()`, and Capacitor listeners for route changes and audio session interruptions instead of `cordova.plugins.audioroute` callbacks and DOM events. This guide covers maintenance facts, install steps, a short example, and an API mapping table.

## Why migrate off cordova-plugin-audioroute

`cordova-plugin-audioroute` on npm is version **0.1.2**. The registry `modified` date is **13 June 2022**, and the package homepage points to [saghul/cordova-plugin-audioroute](https://github.com/saghul/cordova-plugin-audioroute). The repository's latest commit is from **April 2017**.

The Cordova API is small but dated for Capacitor:

- Methods live under `cordova.plugins.audioroute` with success and error callbacks.
- Route updates use a `document.addEventListener('audioroute-changed', ...)` hook with a string `reason`.
- Installation uses `cordova plugin add cordova-plugin-audioroute`.

[`@capgo/capacitor-audio-session`](https://www.npmjs.com/package/@capgo/capacitor-audio-session) keeps the same iOS-only scope and adds `addListener('interruption', ...)` for phone calls and other AVAudioSession interruptions. Capgo maintains the v8 line for Capacitor 8 with the same open source workflow where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-audio-session
bunx cap sync
```

No extra `Info.plist` keys are required beyond what your VoIP or media stack already uses, but you should configure `AVAudioSession` category and options in your native audio or WebRTC plugin before calling routing helpers. Rebuild iOS after adding the Capacitor plugin.

## Usage example

```ts
import { AudioSession } from '@capgo/capacitor-audio-session';

export async function enableSpeakerForCall() {
  const routeListener = await AudioSession.addListener('routeChanged', (event) => {
    console.log('Route reason', event.reason);
  });

  await AudioSession.overrideOutput('speaker');

  const outputs = await AudioSession.currentOutputs();
  console.log('Active ports', outputs);
}
```

Call `AudioSession.overrideOutput('default')` when the user ends the call so Bluetooth or the receiver can take over again.

## Migrating from Cordova to Capacitor

Remove `cordova.plugins.audioroute` and the `audioroute-changed` document listener. Import `AudioSession` and use promises plus Capacitor listeners.

### API mapping table

| cordova-plugin-audioroute | @capgo/capacitor-audio-session |
| --- | --- |
| `cordova.plugins.audioroute.currentOutputs(success, error)` | `AudioSession.currentOutputs()` |
| `cordova.plugins.audioroute.overrideOutput(output, success, error)` | `AudioSession.overrideOutput(type)` with `speaker` or `default` |
| `document.addEventListener('audioroute-changed', fn)` | `addListener('routeChanged', fn)` |
| Event `reason` strings (new-device-available, override, ...) | `routeChanged` payload `reason` |
| No Cordova API for interruptions | `addListener('interruption', fn)` |
| iOS only | iOS only (empty arrays on Android and web) |

Port output type strings directly: Cordova accepts `default` and `speaker`, which match Capgo `OutputOverrideType`.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/audiosession/](/docs/plugins/audiosession/)
- Marketing page: [/plugins/capacitor-audiosession/](/plugins/capacitor-audiosession/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-audio-session](https://www.npmjs.com/package/@capgo/capacitor-audio-session)
- GitHub: [https://github.com/Cap-go/capacitor-audiosession/](https://github.com/Cap-go/capacitor-audiosession/)
- Cordova upstream: [https://github.com/saghul/cordova-plugin-audioroute](https://github.com/saghul/cordova-plugin-audioroute)

Pair this plugin with your media or VoIP stack, ship native builds through [Capgo Build](/native-build/), and iterate call UI with [Capgo live updates](/live-update/). Broader migration: [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).