---
locale: en
---
# Using @capgo/capacitor-video-thumbnails

Capacitor Video Thumbnails Plugin interface for generating video thumbnails.

## Install

```bash
bun add @capgo/capacitor-video-thumbnails
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoVideoThumbnails } from '@capgo/capacitor-video-thumbnails';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getThumbnail` | Generate a thumbnail image from a video file at a specific time position. |

## Examples

### `getThumbnail()`

Generate a thumbnail image from a video file at a specific time position.

```typescript
import { CapgoVideoThumbnails } from '@capgo/capacitor-video-thumbnails';

const result = await CapgoVideoThumbnails.getThumbnail({
  sourceUri: 'file:///path/to/video.mp4',
  time: 5000,
  quality: 0.8
});
console.log('Thumbnail URI:', result.uri);
console.log('Dimensions:', result.width, 'x', result.height);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-video-thumbnails/)
- [Documentation](/docs/plugins/video-thumbnails/)
- [API reference](/docs/plugins/video-thumbnails/getting-started/)

## Keep going from Using @capgo/capacitor-video-thumbnails

If you are using **Using @capgo/capacitor-video-thumbnails** to plan native media and interface behavior, connect it with [@capgo/capacitor-video-thumbnails](/docs/plugins/video-thumbnails/) for the implementation detail in @capgo/capacitor-video-thumbnails, [Getting Started](/docs/plugins/video-thumbnails/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
