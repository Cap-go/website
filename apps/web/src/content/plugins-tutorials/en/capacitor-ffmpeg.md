---
locale: en
---
# Using @capgo/capacitor-ffmpeg

Exposes the FFmpeg API to Capacitor.

## Install

```bash
bun add @capgo/capacitor-ffmpeg
bunx cap sync
```

## What This Plugin Exposes

- `getCapabilities` - Return the machine-readable capability matrix for the current platform.
- `reencodeVideo` - Queue a video re-encode job.
- `convertImage` - Convert a still image into another format.
- `convertAudio` - Convert audio into another container or codec.

## Example Usage

### `getCapabilities`

Return the machine-readable capability matrix for the current platform.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

await CapacitorFFmpeg.getCapabilities();
```

### `reencodeVideo`

Queue a video re-encode job.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

await CapacitorFFmpeg.reencodeVideo({} as ReencodeVideoOptions);
```

### `convertImage`

Convert a still image into another format.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

await CapacitorFFmpeg.convertImage({} as ConvertImageOptions);
```

### `convertAudio`

Convert audio into another container or codec.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

await CapacitorFFmpeg.convertAudio({} as ConvertAudioOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-ffmpeg/
- Docs: /docs/plugins/ffmpeg/
