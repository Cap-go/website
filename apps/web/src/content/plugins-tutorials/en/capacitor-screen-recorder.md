---
locale: en
---
# Using @capgo/capacitor-screen-recorder

Capacitor Screen Recorder Plugin for recording the device screen. Allows you to capture video recordings of the screen with optional audio.

## Install

```bash
bun add @capgo/capacitor-screen-recorder
bunx cap sync
```

## What This Plugin Exposes

- `start` - Start recording the device screen.
- `stop` - Stop the current screen recording.

## Example Usage

### `start`

Start recording the device screen.

```typescript
import { ScreenRecorder } from '@capgo/capacitor-screen-recorder';

// Start recording without audio
await ScreenRecorder.start();

// Start recording with audio
await ScreenRecorder.start({ recordAudio: true });
```

### `stop`

Stop the current screen recording.

```typescript
import { ScreenRecorder } from '@capgo/capacitor-screen-recorder';

await ScreenRecorder.stop();
console.log('Recording saved to gallery');
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-screen-recorder/
- Docs: /docs/plugins/screen-recorder/

## Keep going from Using @capgo/capacitor-screen-recorder

If you are using **Using @capgo/capacitor-screen-recorder** to plan native media and interface behavior, connect it with [@capgo/capacitor-screen-recorder](/docs/plugins/screen-recorder/) for the implementation detail in @capgo/capacitor-screen-recorder, [Getting Started](/docs/plugins/screen-recorder/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
