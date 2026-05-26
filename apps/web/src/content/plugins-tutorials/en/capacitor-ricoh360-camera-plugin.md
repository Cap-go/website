---
locale: en
---
# Using @capgo/ricoh360

Provides an SDK for the Ricoh360 cameras for Capacitor.

## Install

```bash
bun add @capgo/ricoh360
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initializes the SDK with camera URL.
- `getCameraAsset` - Retrieves a camera asset from a URL and returns it as base64.
- `listFiles` - Lists files stored on the camera.
- `capturePicture` - Captures a picture.

## Example Usage

### `initialize`

Initializes the SDK with camera URL.

```typescript
import { Ricoh360Camera } from '@capgo/ricoh360';

await Ricoh360Camera.initialize({} as InitializeOptions);
```

### `getCameraAsset`

Retrieves a camera asset from a URL and returns it as base64.

```typescript
import { Ricoh360Camera } from '@capgo/ricoh360';

await Ricoh360Camera.getCameraAsset({} as GetCameraAssetOptions);
```

### `listFiles`

Lists files stored on the camera.

```typescript
import { Ricoh360Camera } from '@capgo/ricoh360';

await Ricoh360Camera.listFiles();
```

### `capturePicture`

Captures a picture.

```typescript
import { Ricoh360Camera } from '@capgo/ricoh360';

await Ricoh360Camera.capturePicture();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-ricoh360-camera-plugin/
- Docs: /docs/plugins/ricoh360-camera/

## Keep going from Using @capgo/ricoh360

If you are using **Using @capgo/ricoh360** to plan native media and interface behavior, connect it with [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player, [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
