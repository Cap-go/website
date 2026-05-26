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

## Keep going from Using @capgo/capacitor-ffmpeg

If you are using **Using @capgo/capacitor-ffmpeg** to plan dashboard and API operations, connect it with [@capgo/capacitor-ffmpeg](/docs/plugins/ffmpeg/) for the implementation detail in @capgo/capacitor-ffmpeg, [Getting Started](/docs/plugins/ffmpeg/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
