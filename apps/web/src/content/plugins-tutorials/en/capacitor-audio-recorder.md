---
locale: en
---
# Using @capgo/capacitor-audio-recorder

Capacitor plugin contract for recording audio.

## Install

```bash
bun add @capgo/capacitor-audio-recorder
bunx cap sync
```

## What This Plugin Exposes

- `startRecording` - Start recording audio using the device microphone.
- `pauseRecording` - Pause the ongoing recording. Only available on Android (API 24+), iOS, and Web.
- `resumeRecording` - Resume a previously paused recording.
- `stopRecording` - Stop the current recording and persist the recorded audio.

## Example Usage

### `startRecording`

Start recording audio using the device microphone.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.startRecording();
```

### `pauseRecording`

Pause the ongoing recording. Only available on Android (API 24+), iOS, and Web.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.pauseRecording();
```

### `resumeRecording`

Resume a previously paused recording.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.resumeRecording();
```

### `stopRecording`

Stop the current recording and persist the recorded audio.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.stopRecording();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-audio-recorder/
- Docs: /docs/plugins/audio-recorder/

## Keep going from Using @capgo/capacitor-audio-recorder

If you are using **Using @capgo/capacitor-audio-recorder** to plan native media and interface behavior, connect it with [@capgo/capacitor-audio-recorder](/docs/plugins/audio-recorder/) for the implementation detail in @capgo/capacitor-audio-recorder, [Getting Started](/docs/plugins/audio-recorder/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
