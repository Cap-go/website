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
