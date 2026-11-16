---
slug: cordova-plugin-media-alternative
title: "cordova-plugin-media Alternative for Capacitor"
description: "cordova-plugin-media alternative for Capacitor playback: @capgo/capacitor-native-audio for preload, queues, progress events, and background audio without Media callbacks."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-16T09:00:00.000Z
updated_at: 2026-11-16T13:09:24.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a media playback plugin guide"
keywords: cordova-plugin-media alternative, capacitor native audio, @capgo/capacitor-native-audio, Media cordova playback migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the cordova-plugin-media alternative for playback in Capacitor?"
    answer: "@capgo/capacitor-native-audio replaces new Media(src) instances with preload plus play, promise APIs, and addListener progress events instead of Media status callbacks."
  - question: "Is cordova-plugin-media still maintained?"
    answer: "npm lists cordova-plugin-media at version 7.0.0 with a registry modified date of 13 September 2023. The source lives in apache/cordova-plugin-media."
  - question: "Does @capgo/native-audio still exist?"
    answer: "Yes on npm as a legacy name at 8.4.2. New installs should use @capgo/capacitor-native-audio at 8.5.4."
  - question: "What about recording with cordova-plugin-media?"
    answer: "Use @capgo/capacitor-audio-recorder for microphone capture. This article covers playback only."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/native-audio/, npm @capgo/capacitor-native-audio, and GitHub Cap-go/capacitor-native-audio."
---

The **cordova-plugin-media alternative** for Capacitor playback is [`@capgo/capacitor-native-audio`](/plugins/capacitor-native-audio/). It replaces the Cordova `Media` constructor and status callbacks with promise-based `NativeAudio` calls, asset ids, and listeners for completion and progress. Install `@capgo/capacitor-native-audio` on new projects; npm still publishes the older [`@capgo/native-audio`](https://www.npmjs.com/package/@capgo/native-audio) name for existing apps. This guide focuses on playback, lists verifiable npm facts, and maps the Cordova `Media` API from `www/Media.js`.

## Why leave cordova-plugin-media for playback

**cordova-plugin-media** on npm is version **7.0.0**. The registry `modified` timestamp is **13 September 2023**. The Apache plugin constructs audio with `new Media(src, success, error, statusCallback, durationUpdateCallback)` and exposes `play`, `pause`, `stop`, `seekTo`, `getDuration`, `getCurrentPosition`, `setVolume`, `setRate`, and `release` on the prototype (see [apache/cordova-plugin-media](https://github.com/apache/cordova-plugin-media/blob/master/www/Media.js)).

In a Capacitor codebase, keeping Cordova `Media` for playback means:

- one object per file with callback-based status codes (`MEDIA_RUNNING`, `MEDIA_PAUSED`, and similar)
- duration and position updates driven by native messages instead of typed listeners
- no built-in preload queue, Now Playing metadata, or `playOnce` helper for UI sounds

[`@capgo/capacitor-native-audio`](https://www.npmjs.com/package/@capgo/capacitor-native-audio) latest on npm is **8.5.4** with `modified` **13 November 2026**. The legacy package [`@capgo/native-audio`](https://www.npmjs.com/package/@capgo/native-audio) is **8.4.2**. Capgo maintains the line for Capacitor 8 where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-native-audio
bunx cap sync
```

**iOS:** when you enable `showNotification: true` in `configure()`, read the README trade-off about interrupting background music versus mixing with other apps.

**Android:** background playback may require foreground service permissions listed in the plugin README when you set `backgroundPlayback: true`.

## Usage example

```ts
import { NativeAudio } from '@capgo/capacitor-native-audio';

export async function playTrack(trackUrl: string) {
  await NativeAudio.configure({ focus: true, showNotification: true });

  await NativeAudio.preload({
    assetId: 'episode-1',
    assetPath: trackUrl,
    isUrl: true,
    notificationMetadata: { title: 'Episode 1', artist: 'Example Podcast' },
  });

  const progress = await NativeAudio.addListener('progress', (event) => {
    if (event.assetId === 'episode-1') {
      console.log(event.position, '/', event.duration);
    }
  });

  await NativeAudio.play({ assetId: 'episode-1' });

  await NativeAudio.addListener('complete', async (event) => {
    if (event.assetId === 'episode-1') {
      await progress.remove();
      await NativeAudio.unload({ assetId: 'episode-1' });
    }
  });
}
```

For short UI sounds, use `playOnce({ assetPath: 'public/beep.mp3' })` instead of manual preload and unload.

## Migrating from Cordova to Capacitor

Cordova playback keeps a `Media` instance and optional status callback. Capacitor uses a stable `assetId` string.

```js
// Before (Cordova playback)
const media = new Media(
  'https://cdn.example.com/clip.mp3',
  () => console.log('done'),
  (code) => console.error(code),
  (status) => console.log('status', status),
);
media.play();
```

```ts
// After (Capacitor)
import { NativeAudio } from '@capgo/capacitor-native-audio';

await NativeAudio.preload({
  assetId: 'clip',
  assetPath: 'https://cdn.example.com/clip.mp3',
  isUrl: true,
});
await NativeAudio.addListener('playbackState', (event) => {
  if (event.assetId === 'clip') console.log(event.state, event.reason);
});
await NativeAudio.play({ assetId: 'clip' });
```

Do not migrate recording calls on the same Cordova `Media` object here. Point recording flows to [`@capgo/capacitor-audio-recorder`](/plugins/capacitor-audio-recorder/) instead of `startRecord()` on `Media`.

### API mapping table (playback)

| cordova-plugin-media (`Media` playback) | @capgo/capacitor-native-audio |
| --- | --- |
| `new Media(src, success, error, statusCb)` | `preload({ assetId, assetPath, isUrl? })` then listeners |
| `media.play(options)` | `play({ assetId, time?, volume? })` |
| `media.pause()` | `pause({ assetId })` |
| `media.stop()` | `stop({ assetId })` |
| Resume after pause | `resume({ assetId })` |
| Looping (manual) | `loop({ assetId })` |
| `media.seekTo(milliseconds)` | `setCurrentTime({ assetId, time: seconds })` |
| `media.getCurrentPosition(success, fail)` | `getCurrentTime({ assetId })` returns `{ currentTime }` |
| `media.getDuration()` cached field | `getDuration({ assetId })` returns `{ duration }` |
| `media.setVolume(volume)` | `setVolume({ assetId, volume })` |
| `media.setRate(rate)` (iOS/Android) | `setRate({ assetId, rate })` |
| `media.release()` | `unload({ assetId })` |
| `statusCallback(MEDIA_*)` | `addListener('playbackState', ...)` and `addListener('complete', ...)` |
| Duration updates | `addListener('progress', ...)` and `addListener('currentTime', ...)` |
| One-shot sound | no direct helper | `playOnce({ assetPath, isUrl?, deleteAfterPlay? })` |
| Cordova plugin install | `bun add @capgo/capacitor-native-audio` plus `bunx cap sync` |

Capgo adds queue APIs (`setQueue`, `queueNext`, `queuePrevious`) and route helpers (`setSpeaker`, `setEarpiece`, `getAudioRoute`) that Cordova `Media` does not document. Map them when you outgrow single-file playback.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/native-audio/](/docs/plugins/native-audio/)
- Marketing page: [/plugins/capacitor-native-audio/](/plugins/capacitor-native-audio/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-native-audio](https://www.npmjs.com/package/@capgo/capacitor-native-audio)
- Legacy npm name: [https://www.npmjs.com/package/@capgo/native-audio](https://www.npmjs.com/package/@capgo/native-audio)
- GitHub: [https://github.com/Cap-go/capacitor-native-audio/](https://github.com/Cap-go/capacitor-native-audio/)
- Cordova upstream: [https://github.com/apache/cordova-plugin-media](https://github.com/apache/cordova-plugin-media)
- Recording follow-up: [/blog/cordova-plugin-media-recorder-alternative/](/blog/cordova-plugin-media-recorder-alternative/)

Playback changes ship in a native binary, so plan a store build with [Capgo Build](/native-build/). For the full Cordova to Capacitor move, read the [migration guide](/blog/migrating-cordova-to-capacitor/).