---
locale: en
---
# Using @capgo/native-audio

A native plugin for native audio engine.

## Install

```bash
bun add @capgo/native-audio
bunx cap sync
```

## What This Plugin Exposes

- `configure` - Configure the audio player.
- `preload` - Load an audio file.
- `playOnce` - Play an audio file once with automatic cleanup.
- `isPreloaded` - Check if an audio file is preloaded.

## Example Usage

### `configure`

Configure the audio player.

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.configure({} as ConfigureOptions);
```

### `preload`

Load an audio file.

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.preload({} as PreloadOptions);
```

### `playOnce`

Play an audio file once with automatic cleanup.

```typescript
import { NativeAudio } from '@capgo/native-audio';

// Simple one-shot playback
await NativeAudio.playOnce({ assetPath: 'audio/notification.mp3' });

// Play and delete the file after completion
await NativeAudio.playOnce({
  assetPath: 'file:///path/to/temp/audio.mp3',
  isUrl: true,
  deleteAfterPlay: true
});

// Get the assetId to control playback
const { assetId } = await NativeAudio.playOnce({
  assetPath: 'audio/long-track.mp3',
  autoPlay: true
});
// Later, you can stop it manually if needed
await NativeAudio.stop({ assetId });
```

### `isPreloaded`

Check if an audio file is preloaded.

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.isPreloaded({} as PreloadOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-audio/
- Docs: /docs/plugins/native-audio/
