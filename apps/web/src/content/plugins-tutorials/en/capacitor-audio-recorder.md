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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startRecording` | Start recording audio using the device microphone. |
| `pauseRecording` | Pause the ongoing recording. Only available on Android (API 24+), iOS, and Web. |
| `resumeRecording` | Resume a previously paused recording. |
| `stopRecording` | Stop the current recording and persist the recorded audio. |
| `cancelRecording` | Cancel the current recording and discard any captured audio. |
| `getRecordingStatus` | Retrieve the current recording status. |
| `getCurrentAmplitude` | Retrieve the current input amplitude (microphone level) as a normalized number in the `[0, 1]` range. |
| `checkPermissions` | Return the current permission state for accessing the microphone. |
| `requestPermissions` | Request permission to access the microphone. |

## Examples

### `startRecording()`

Start recording audio using the device microphone.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.startRecording();
```

### `pauseRecording()`

Pause the ongoing recording. Only available on Android (API 24+), iOS, and Web.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.pauseRecording();
```

### `resumeRecording()`

Resume a previously paused recording.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.resumeRecording();
```

### `stopRecording()`

Stop the current recording and persist the recorded audio.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

const result = await CapacitorAudioRecorder.stopRecording();
console.log(result);
```

### `cancelRecording()`

Cancel the current recording and discard any captured audio.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

await CapacitorAudioRecorder.cancelRecording();
```

### `getRecordingStatus()`

Retrieve the current recording status.

```typescript
import { CapacitorAudioRecorder } from '@capgo/capacitor-audio-recorder';

const result = await CapacitorAudioRecorder.getRecordingStatus();
console.log(result);
```

The [API reference](/docs/plugins/audio-recorder/getting-started/) covers the other 3 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorAudioRecorder.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-audio-recorder/)
- [Documentation](/docs/plugins/audio-recorder/)
- [API reference](/docs/plugins/audio-recorder/getting-started/)

## Keep going from Using @capgo/capacitor-audio-recorder

If you are using **Using @capgo/capacitor-audio-recorder** to plan native media and interface behavior, connect it with [@capgo/capacitor-audio-recorder](/docs/plugins/audio-recorder/) for the implementation detail in @capgo/capacitor-audio-recorder, [Getting Started](/docs/plugins/audio-recorder/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
