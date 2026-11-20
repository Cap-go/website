---
slug: cordova-plugin-tts-alternative
title: "cordova-plugin-tts Alternative for Capacitor"
description: "cordova-plugin-tts alternative for Capacitor: @capgo/capacitor-speech-synthesis with speak, cancel, voices, events, and synthesizeToFile instead of TTS.speak promises."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-20T09:00:00.000Z
updated_at: 2026-11-20T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a text to speech plugin guide"
keywords: cordova-plugin-tts alternative, capacitor text to speech, @capgo/capacitor-speech-synthesis, TTS speak cordova migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-tts alternative in Capacitor?"
    answer: "@capgo/capacitor-speech-synthesis maps TTS.speak and TTS.stop to speak() and cancel(), adds pause and resume, getVoices, start and end listeners, and synthesizeToFile on iOS and Android."
  - question: "Is cordova-plugin-tts still maintained?"
    answer: "npm lists cordova-plugin-tts at version 0.2.3 with a registry modified date of 16 January 2024. Source: vilic/cordova-plugin-tts on GitHub."
  - question: "How do I interrupt speech like Cordova's empty string trick?"
    answer: "Call SpeechSynthesis.cancel() or speak with queueStrategy Flush. The Capgo plugin documents cancel() as stopping all queued utterances."
  - question: "Does Capgo support offline TTS files?"
    answer: "synthesizeToFile() in definitions.ts saves spoken audio to a file path on iOS and Android."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/speech-synthesis/, npm @capgo/capacitor-speech-synthesis, and GitHub Cap-go/capacitor-speech-synthesis."
---

The practical **cordova-plugin-tts alternative** for a Capacitor app is [`@capgo/capacitor-speech-synthesis`](/plugins/capacitor-speech-synthesis/). It keeps text to speech on native AVSpeech and Android TTS engines, expands the Cordova `TTS` object into typed promises, and documents queue control, voice lists, and file export. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-tts in Capacitor

**cordova-plugin-tts** on npm is version **0.2.3**. The registry `modified` timestamp is **16 January 2024**. The npm repository URL points to [vilic/cordova-plugin-tts](https://github.com/vilic/cordova-plugin-tts).

The README documents a global `TTS` object with:

- `speak(text)` or `speak({ text, locale, rate, category })` returning a Promise
- `stop()` to halt speech
- `checkLanguage()` returning a language string
- `openInstallTts()` to open the Android TTS installer
- an empty `speak('')` call to interrupt queued speech

Cordova exposes a minimal surface: no pause or resume, no utterance events, no voice picker API, and rate is documented as **0 to 1** on the Cordova side.

[`@capgo/capacitor-speech-synthesis`](https://www.npmjs.com/package/@capgo/capacitor-speech-synthesis) latest on npm is **8.0.29** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `speak`, `synthesizeToFile`, `cancel`, `pause`, `resume`, `isSpeaking`, `isAvailable`, `getVoices`, `getLanguages`, `addListener('start' | 'end' | 'boundary' | 'error')`, and iOS `activateAudioSession`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-speech-synthesis
bunx cap sync
```

No extra plist keys are required beyond what your app already uses for playback. On Android, ensure the device has a TTS engine installed (the Cordova plugin used `openInstallTts()` for that case).

## Usage example

```ts
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

export async function announceTurn(direction: string) {
  const { isAvailable } = await SpeechSynthesis.isAvailable();
  if (!isAvailable) throw new Error('Speech synthesis unavailable');

  const { utteranceId } = await SpeechSynthesis.speak({
    text: direction,
    language: 'en-US',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    queueStrategy: 'Flush',
  });

  await new Promise<void>((resolve) => {
    void SpeechSynthesis.addListener('end', (event) => {
      if (event.utteranceId === utteranceId) {
        console.log('Finished', utteranceId);
        resolve();
      }
    });
  });
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
TTS.speak({ text: 'hello, world!', locale: 'en-GB', rate: 0.75 });
```

```ts
// After (Capacitor)
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.speak({
  text: 'hello, world!',
  language: 'en-GB',
  rate: 0.75,
});
```

```js
// Before (Cordova)
TTS.stop();
```

```ts
// After (Capacitor)
await SpeechSynthesis.cancel();
```

### API mapping table

| cordova-plugin-tts (`TTS`) | @capgo/capacitor-speech-synthesis |
| --- | --- |
| `speak(text)` | `speak({ text })` returns `{ utteranceId }` |
| `speak({ text, locale, rate })` | `speak({ text, language: locale, rate })` (Capgo rate range is 0.1 to 10.0 per `SpeakOptions`) |
| `speak({ category })` (iOS ambient) | `activateAudioSession({ category: 'Ambient' or 'Playback' })` |
| `stop()` | `cancel()` |
| Empty string interrupt via `speak('')` | `cancel()` or `speak({ text: '...', queueStrategy: 'Flush' })` |
| `checkLanguage()` | `getLanguages()` or `isLanguageAvailable({ language })` |
| `openInstallTts()` (Android) | Open system TTS settings from your UI; not wrapped in Capgo |
| Not in Cordova | `pause()`, `resume()`, `isSpeaking()`, `getVoices()`, `synthesizeToFile()`, `addListener('start', 'end', 'boundary', 'error')` |
| Cordova plugin install | `bun add @capgo/capacitor-speech-synthesis` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/speech-synthesis/](/docs/plugins/speech-synthesis/)
- Marketing page: [/plugins/capacitor-speech-synthesis/](/plugins/capacitor-speech-synthesis/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-speech-synthesis](https://www.npmjs.com/package/@capgo/capacitor-speech-synthesis)
- GitHub: [https://github.com/Cap-go/capacitor-speech-synthesis/](https://github.com/Cap-go/capacitor-speech-synthesis/)
- Cordova upstream: [https://github.com/vilic/cordova-plugin-tts](https://github.com/vilic/cordova-plugin-tts)

Ship native builds with [Capgo Build](/native-build/), then deliver prompt copy changes with [Capgo live updates](/live-update/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).