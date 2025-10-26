---
locale: en
---
# Using @capgo/camera-preview

The `@capgo/camera-preview` package provides camera preview functionality for your Capacitor app. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/camera-preview
npx cap sync
```

## Usage

### Start Camera Preview

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.start({
  position: 'rear',
  width: window.screen.width,
  height: window.screen.height,
  x: 0,
  y: 0,
});
```

### Stop Camera Preview

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.stop();
```

### Capture Photo

```typescript
import { CameraPreview } from '@capgo/camera-preview';

const result = await CameraPreview.capture({
  quality: 90,
});

console.log('Photo:', result.value);
```

That's it! You have successfully integrated camera preview into your Capacitor app.
