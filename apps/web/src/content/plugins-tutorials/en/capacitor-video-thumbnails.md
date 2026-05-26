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

## What This Plugin Exposes

- `getThumbnail` - Generate a thumbnail image from a video file at a specific time position.

## Example Usage

### `getThumbnail`

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

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-video-thumbnails/
- Docs: /docs/plugins/video-thumbnails/

## Keep going from Using @capgo/capacitor-video-thumbnails

If you are using **Using @capgo/capacitor-video-thumbnails** to plan native media and interface behavior, connect it with [@capgo/capacitor-video-thumbnails](/docs/plugins/video-thumbnails/) for the implementation detail in @capgo/capacitor-video-thumbnails, [Getting Started](/docs/plugins/video-thumbnails/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
