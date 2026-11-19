---
slug: cordova-plugin-media-recorder-alternative
title: "cordova-plugin-media Recorder Alternative for Capacitor"
description: "cordova-plugin-media alternative for recording: @capgo/capacitor-audio-recorder with start/stop/pause, amplitude metering, formats, and permission APIs instead of Media.startRecord."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-16T09:00:00.000Z
updated_at: 2026-11-16T13:09:59.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an audio recording plugin guide"
keywords: cordova-plugin-media alternative, capacitor audio recorder, @capgo/capacitor-audio-recorder, Media startRecord cordova migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-media alternative for recording?"
    answer: "@capgo/capacitor-audio-recorder exposes startRecording, stopRecording, pauseRecording, and getCurrentAmplitude as Capacitor promises instead of Media.startRecord callbacks."
  - question: "Is cordova-plugin-media still maintained?"
    answer: "npm lists cordova-plugin-media at version 7.0.0 with a registry modified date of 13 September 2023."
  - question: "Where does the recorded file go?"
    answer: "stopRecording returns uri on iOS and Android with duration in milliseconds, per the plugin TypeScript definitions."
  - question: "Can I meter the microphone while recording?"
    answer: "Yes. getCurrentAmplitude returns a 0 to 1 value while recording is active on each platform."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/audio-recorder/, npm @capgo/capacitor-audio-recorder, and GitHub Cap-go/capacitor-audio-recorder."
---

The **cordova-plugin-media alternative** for microphone capture in Capacitor is [`@capgo/capacitor-audio-recorder`](/plugins/capacitor-audio-recorder/). Cordova reuses the same `Media` object for playback and recording with `startRecord`, `stopRecord`, and amplitude callbacks. Capgo splits recording into a dedicated plugin with permission helpers, pause and resume, format options, and structured `stopRecording` results. This article covers only the recording angle; for playback, see the [cordova-plugin-media alternative guide](/blog/cordova-plugin-media-alternative/).

## Why stop using Media.startRecord in Capacitor

**cordova-plugin-media** on npm is version **7.0.0** with `modified` **13 September 2023**. Recording APIs on the Cordova side are `startRecord`, `stopRecord`, `pauseRecord`, `resumeRecord`, and `getCurrentAmplitude(success, fail)` on the same `Media` instance that also handles playback (see `www/Media.js` in [apache/cordova-plugin-media](https://github.com/apache/cordova-plugin-media)).

That design is awkward in Capacitor apps because:

- recording reuses a playback-oriented constructor and file path in `src`
- pause and resume availability depends on the Cordova native implementation without a typed status enum
- there is no Capacitor permission API integration or `recordingStopped` event payload with duration and uri

[`@capgo/capacitor-audio-recorder`](https://www.npmjs.com/package/@capgo/capacitor-audio-recorder) latest on npm is **8.4.1** with `modified` **12 November 2026**. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-audio-recorder
bunx cap sync
```

**iOS:** declare `NSMicrophoneUsageDescription` in `Info.plist`. Optional `StartRecordingOptions` such as `format: 'aac'` or `audioSessionMode` are documented in the plugin definitions.

**Android:** the plugin uses the standard microphone permission flow through `requestPermissions()` and `checkPermissions()`.

## Usage example

```ts
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

export async function recordVoiceNote() {
  const perm = await CapacitorAudioRecorder.requestPermissions();
  if (perm.recordAudio !== 'granted') {
    throw new Error('Microphone permission denied');
  }

  await CapacitorAudioRecorder.addListener('recordingStopped', (event) => {
    console.log('Saved', event.uri, event.duration);
  });

  await CapacitorAudioRecorder.startRecording({
    format: 'm4a',
    sampleRate: 44100,
  });

  const meter = setInterval(async () => {
    const { value } = await CapacitorAudioRecorder.getCurrentAmplitude();
    console.log('Level', value);
  }, 100);

  const file = await CapacitorAudioRecorder.stopRecording();
  clearInterval(meter);
  return file.uri;
}
```

Call `cancelRecording()` when the user discards a take instead of `stopRecording()`.

## Migrating from Cordova to Capacitor

Cordova binds recording to a `Media` object and a destination path in `src`. Capacitor picks the output path natively when recording stops.

```js
// Before (Cordova recording)
const media = new Media('myrecording.m4a', onDone, onError);
media.startRecord();
// later
media.stopRecord();
media.getCurrentAmplitude((amp) => console.log(amp), console.error);
```

```ts
// After (Capacitor)
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.requestPermissions();
await CapacitorAudioRecorder.startRecording();
const { value } = await CapacitorAudioRecorder.getCurrentAmplitude();
console.log(value);
const { uri, duration } = await CapacitorAudioRecorder.stopRecording();
console.log(uri, duration);
```

Remove the Cordova `Media` instance for capture entirely. Playback of the saved file can use [`@capgo/capacitor-native-audio`](/plugins/capacitor-native-audio/) or the WebView `<audio>` tag with `Capacitor.convertFileSrc()` on the returned `uri`.

### API mapping table (recording)

| cordova-plugin-media (`Media` recording) | @capgo/capacitor-audio-recorder |
| --- | --- |
| `new Media(filePath, ...)` before record | no constructor; permissions plus `startRecording(options?)` |
| `media.startRecord()` | `startRecording(options?)` |
| `media.stopRecord()` | `stopRecording()` returns `{ uri?, duration?, blob? }` |
| `media.pauseRecord()` | `pauseRecording()` |
| `media.resumeRecord()` | `resumeRecording()` |
| Discard partial take | `cancelRecording()` |
| `media.getCurrentAmplitude(success, fail)` | `getCurrentAmplitude()` returns `{ value }` (0 to 1) |
| Implicit recording state | `getRecordingStatus()` returns `INACTIVE`, `RECORDING`, or `PAUSED` |
| Error callbacks | `addListener('recordingError', ...)` |
| Record finished notification | `addListener('recordingStopped', ...)` and `stopRecording()` result |
| iOS interruption during call | `addListener('recordingInterruptionBegan', ...)` and `addListener('recordingInterruptionEnded', ...)` |
| Cordova plugin install | `bun add @capgo/capacitor-audio-recorder` plus `bunx cap sync` |

Capgo recording supports `format: 'm4a' | 'aac'`, `sampleRate`, `bitRate`, and iOS-only session options that Cordova does not expose on `startRecord()`. Pick `aac` when you need crash-resilient ADTS frames as described in the plugin docs.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/audio-recorder/](/docs/plugins/audio-recorder/)
- Marketing page: [/plugins/capacitor-audio-recorder/](/plugins/capacitor-audio-recorder/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-audio-recorder](https://www.npmjs.com/package/@capgo/capacitor-audio-recorder)
- GitHub: [https://github.com/Cap-go/capacitor-audio-recorder/](https://github.com/Cap-go/capacitor-audio-recorder/)
- Cordova upstream: [https://github.com/apache/cordova-plugin-media](https://github.com/apache/cordova-plugin-media)
- Playback companion: [/blog/cordova-plugin-media-alternative/](/blog/cordova-plugin-media-alternative/)

Recording requires microphone permission and native code, so ship a store build with [Capgo Build](/native-build/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).