---
slug: cordova-plugin-speechrecognition-alternative
title: "cordova-plugin-speechrecognition Alternative for Capacitor"
description: "cordova-plugin-speechrecognition alternative for Capacitor: speech to text with @capgo/capacitor-speech-recognition, partial results, and on-device recognition."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-19T09:00:00.000Z
updated_at: 2026-11-19T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a speech recognition plugin guide"
keywords: cordova-plugin-speechrecognition alternative, capacitor speech recognition, @capgo/capacitor-speech-recognition, window.plugins.speechRecognition
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-speechrecognition alternative in Capacitor?"
    answer: "@capgo/capacitor-speech-recognition maps isRecognitionAvailable, startListening, stopListening, getSupportedLanguages, hasPermission and requestPermission to available, start, stop, getSupportedLanguages, checkPermissions and requestPermissions, and adds partialResults listeners, forceStop, and optional on-device recognition."
  - question: "Is cordova-plugin-speechrecognition still maintained?"
    answer: "npm lists cordova-plugin-speechrecognition at version 1.2.0 with a registry modified date of 14 June 2022. Source: pbakondy/cordova-plugin-speechrecognition on GitHub."
  - question: "Does the Capgo plugin need the network?"
    answer: "The Cordova README says the plugin requires an internet connection. @capgo/capacitor-speech-recognition supports useOnDeviceRecognition when isOnDeviceRecognitionAvailable returns true for your locale."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/speech-recognition/, npm @capgo/capacitor-speech-recognition, and GitHub Cap-go/capacitor-speech-recognition."
---

The practical **cordova-plugin-speechrecognition alternative** for a Capacitor app is [`@capgo/capacitor-speech-recognition`](/plugins/capacitor-speech-recognition/). It maps `window.plugins.speechRecognition` callbacks to `SpeechRecognition` promises, streams partial transcripts through listeners, and documents optional on-device recognition in `definitions.ts`. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-speechrecognition in Capacitor

**cordova-plugin-speechrecognition** on npm is version **1.2.0**. The registry `modified` timestamp is **14 June 2022**. The npm repository URL points to [pbakondy/cordova-plugin-speechrecognition](https://github.com/pbakondy/cordova-plugin-speechrecognition).

The README documents `window.plugins.speechRecognition` with:

- `isRecognitionAvailable(success, error)` returning a boolean
- `startListening(success, error, options)` with `language`, `matches`, `prompt`, `showPopup`, `showPartial`
- `stopListening(success, error)`
- `getSupportedLanguages(success, error)` returning a string array
- `hasPermission(success, error)` and `requestPermission(success, error)` returning booleans

In a Capacitor codebase the Cordova plugin still uses callback style results and the README notes that Android stops when the speaker finishes a sentence while iOS needs a manual `stopListening` call.

[`@capgo/capacitor-speech-recognition`](https://www.npmjs.com/package/@capgo/capacitor-speech-recognition) latest on npm is **8.6.0** with a `modified` date of **17 November 2026**. `src/definitions.ts` documents `available()`, `start`, `stop`, `forceStop`, `getSupportedLanguages`, `isListening`, `checkPermissions`, `requestPermissions`, `addListener('partialResults')`, `addListener('listeningState')`, and `useOnDeviceRecognition`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-speech-recognition
bunx cap sync
```

On iOS add `NSSpeechRecognitionUsageDescription` and `NSMicrophoneUsageDescription` to `Info.plist`. On Android declare `RECORD_AUDIO` when you use inline recognition without the system popup.

## Usage example

```ts
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

export async function dictateOnce() {
  const { available } = await SpeechRecognition.available();
  if (!available) throw new Error('Speech recognition unavailable');

  const permission = await SpeechRecognition.requestPermissions();
  if (permission.speechRecognition !== 'granted') {
    throw new Error('Permission denied');
  }

  await SpeechRecognition.addListener('partialResults', (event) => {
    console.log('partial', event.matches?.[0] ?? event.accumulatedText);
  });

  const { matches } = await SpeechRecognition.start({
    language: 'en-US',
    maxResults: 5,
    partialResults: true,
    popup: false,
  });

  await SpeechRecognition.stop();
  return matches?.[0];
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.speechRecognition.startListening(
  function (matches) {
    console.log(matches);
  },
  function (err) {
    console.error(err);
  },
  { language: 'en-US', showPartial: true, showPopup: false },
);
```

```ts
// After (Capacitor)
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.addListener('partialResults', ({ matches }) => {
  console.log(matches?.[0]);
});

const { matches } = await SpeechRecognition.start({
  language: 'en-US',
  partialResults: true,
  popup: false,
  maxResults: 5,
});
console.log(matches);
```

```js
// Before (Cordova)
window.plugins.speechRecognition.isRecognitionAvailable(success, error);
```

```ts
// After (Capacitor)
const { available } = await SpeechRecognition.available();
```

### API mapping table

| cordova-plugin-speechrecognition (`window.plugins.speechRecognition`) | @capgo/capacitor-speech-recognition |
| --- | --- |
| `isRecognitionAvailable(success, error)` | `available()` returns `{ available }` |
| `startListening(success, error, options)` | `start({ language, maxResults, prompt, popup, partialResults, ... })` returns `{ matches }` |
| `options.matches` | `maxResults` |
| `options.showPopup` | `popup` |
| `options.showPartial` | `partialResults` plus `addListener('partialResults', ...)` |
| `stopListening(success, error)` | `stop()` or `forceStop({ timeout })` |
| `getSupportedLanguages(success, error)` | `getSupportedLanguages()` returns `{ languages }` |
| `hasPermission(success, error)` | `checkPermissions()` returns `{ speechRecognition }` |
| `requestPermission(success, error)` | `requestPermissions()` |
| Not in Cordova | `isListening`, `isOnDeviceRecognitionAvailable`, `useOnDeviceRecognition`, `addListener('listeningState')`, `addListener('audioLevel')` |
| Cordova plugin install | `bun add @capgo/capacitor-speech-recognition` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/speech-recognition/](/docs/plugins/speech-recognition/)
- Marketing page: [/plugins/capacitor-speech-recognition/](/plugins/capacitor-speech-recognition/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-speech-recognition](https://www.npmjs.com/package/@capgo/capacitor-speech-recognition)
- GitHub: [https://github.com/Cap-go/capacitor-speech-recognition/](https://github.com/Cap-go/capacitor-speech-recognition/)
- Cordova upstream: [https://github.com/pbakondy/cordova-plugin-speechrecognition](https://github.com/pbakondy/cordova-plugin-speechrecognition)

Microphone and speech permission strings ship in the native binary. Use [Capgo Build](/native-build/) for store builds, then ship transcript UI with [Capgo live updates](/live-update/) where the logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).