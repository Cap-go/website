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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getCapabilities` | Return the machine-readable capability matrix for the current platform. |
| `reencodeVideo` | Queue a video re-encode job. |
| `convertImage` | Convert a still image into another format. |
| `convertAudio` | Convert audio into another container or codec. |

## Examples

### `getCapabilities()`

Return the machine-readable capability matrix for the current platform.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

const result = await CapacitorFFmpeg.getCapabilities();
console.log(result);
```

### `reencodeVideo()`

Queue a video re-encode job.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

const result = await CapacitorFFmpeg.reencodeVideo({
  inputPath: 'path/to/file',
  outputPath: 'path/to/file',
  width: 1,
  height: 1,
});
console.log(result);
```

### `convertImage()`

Convert a still image into another format.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

const result = await CapacitorFFmpeg.convertImage({
  inputPath: 'path/to/file',
  outputPath: 'path/to/file',
  format: 'webp',
});
console.log(result);
```

### `convertAudio()`

Convert audio into another container or codec.

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

const result = await CapacitorFFmpeg.convertAudio({
  inputPath: 'path/to/file',
  outputPath: 'path/to/file',
  format: 'm4a',
});
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-ffmpeg/)
- [Documentation](/docs/plugins/ffmpeg/)
- [API reference](/docs/plugins/ffmpeg/getting-started/)

## Keep going from Using @capgo/capacitor-ffmpeg

If you are using **Using @capgo/capacitor-ffmpeg** to plan dashboard and API operations, connect it with [@capgo/capacitor-ffmpeg](/docs/plugins/ffmpeg/) for the implementation detail in @capgo/capacitor-ffmpeg, [Getting Started](/docs/plugins/ffmpeg/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
