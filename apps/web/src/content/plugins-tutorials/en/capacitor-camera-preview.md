---
locale: en
---
# Using @capgo/camera-preview

The main interface for the CameraPreview plugin.

## Install

```bash
bun add @capgo/camera-preview
bunx cap sync
```

## What This Plugin Exposes

- `start` - Starts the camera preview.
- `stop` - Stops the camera preview.
- `capture` - Captures a picture from the camera.
- `captureSample` - Captures a single frame from the camera preview stream.

## Example Usage

### `start`

Starts the camera preview.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.start({} as CameraPreviewOptions);
```

### `stop`

Stops the camera preview.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.stop();
```

### `capture`

Captures a picture from the camera.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.capture({} as CameraPreviewPictureOptions);
```

### `captureSample`

Captures a single frame from the camera preview stream.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.captureSample({} as CameraSampleOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-camera-preview/
- Docs: /docs/plugins/camera-preview/
