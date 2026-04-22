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
