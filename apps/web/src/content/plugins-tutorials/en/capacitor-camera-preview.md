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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CameraPreview } from '@capgo/camera-preview';
```

## API at a glance

| Method | Description |
| --- | --- |
| `start` | Starts the camera preview. |
| `stop` | Stops the camera preview. |
| `capture` | Captures a picture from the camera. |
| `captureSample` | Captures a single frame from the camera preview stream. |
| `startBarcodeScanner` | Starts barcode scanning on the active camera preview. |
| `stopBarcodeScanner` | Stops barcode scanning while keeping the camera preview running. |
| `getSupportedFlashModes` | Gets the flash modes supported by the active camera. |
| `setAspectRatio` | Set the aspect ratio of the camera preview. |
| `getAspectRatio` | Gets the current aspect ratio of the camera preview. |
| `setGridMode` | Sets the grid mode of the camera preview overlay. |
| `getGridMode` | Gets the current grid mode of the camera preview overlay. |
| `checkPermissions` | Checks the current camera (and optionally microphone) permission status without prompting the system dialog. |
| `requestPermissions` | Requests camera (and optional microphone) permissions. If permissions are already granted or denied, the current status is returned without prompting. When `showSettingsAlert` is true and permissions are denied, a platform specific alert guiding the user to the app settings will be presented. |
| `getHorizontalFov` | Gets the horizontal field of view (FoV) for the active camera. Note: This can be an estimate on some devices. |
| `getSupportedPictureSizes` | Gets the supported picture sizes for all cameras. |
| `setFlashMode` | Sets the flash mode for the active camera. |
| `flip` | Toggles between the front and rear cameras. |
| `setOpacity` | Sets the opacity of the camera preview. |
| `stopRecordVideo` | Stops an ongoing video recording. |
| `startRecordVideo` | Starts recording a video. |
| `setVideoQuality` | Sets the video recording quality for the active camera session. |
| `getVideoQuality` | Gets the current video recording quality. |
| `getSupportedVideoQualities` | Returns the video qualities supported by the active camera. |
| `setVideoCodec` | Sets the video codec used when recording. |
| `getVideoCodec` | Gets the current video codec used for recording. |
| `getSupportedVideoCodecs` | Returns the video codecs supported by the active camera. |
| `isVideoStabilizationSupported` | Checks whether video stabilization is supported by the active camera. |
| `getSupportedVideoStabilizationModes` | Returns the video stabilization modes supported by the active camera. |
| `getVideoStabilizationMode` | Gets the current video stabilization mode. |
| `setVideoStabilizationMode` | Sets the video stabilization mode for recording. Cannot be changed while a recording is in progress. You can also pass `videoStabilizationMode` in `startRecordVideo()` options. |
| `isRunning` | Checks if the camera preview is currently running. |
| `getAvailableDevices` | Gets all available camera devices. |
| `getZoom` | Gets the current zoom state, including min/max and current lens info. |
| `getZoomButtonValues` | Returns zoom button values for quick switching. - iOS/Android: includes 0.5 if ultra-wide available; 1 and 2 if wide available; 3 if telephoto available - Web: unsupported. |
| `setZoom` | Sets the zoom level of the camera. |
| `getFlashMode` | Gets the current flash mode. |
| `setDeviceId` | Switches the active camera to the one with the specified `deviceId`. |
| `getDeviceId` | Gets the ID of the camera device that is currently bound. On Android, if a physical-lens request falls back to a logical camera, this returns the bound logical camera ID. |
| `getPreviewSize` | Gets the current preview size and position. |
| `setPreviewSize` | Sets the preview size and position. |
| `setFocus` | Sets the camera focus to a specific point in the preview. |
| `deleteFile` | Deletes a file at the given absolute path on the device. Use this to quickly clean up temporary images created with `storeToFile`. On web, this is not supported and will throw. |
| `getSafeAreaInsets` | Gets the safe area insets for devices. Returns the orientation-aware notch/camera cutout inset and the current orientation. In portrait mode: returns top inset (notch at top). In landscape mode: returns left inset (notch moved to side). This specifically targets the cutout area (notch, punch hole, etc.) that all modern phones have. |
| `getOrientation` | Gets the current device orientation in a cross-platform format. |
| `getExposureModes` | Returns the exposure modes supported by the active camera. Modes can include: 'locked', 'auto', 'continuous', 'custom'. |
| `getExposureMode` | Returns the current exposure mode. |
| `setExposureMode` | Sets the exposure mode. |
| `getExposureCompensationRange` | Returns the exposure compensation (EV bias) supported range. |
| `getExposureCompensation` | Returns the current exposure compensation (EV bias). |
| `setExposureCompensation` | Sets the exposure compensation (EV bias). Value will be clamped to range. |
| `getWhiteBalanceModes` | Returns the white-balance modes supported by the active camera. Modes can include: 'AUTO', 'LOCK', 'CONTINUOUS'. `CUSTOM` is not listed until manual gains support is implemented. |
| `getWhiteBalanceMode` | Returns the current white-balance mode. |
| `setWhiteBalanceMode` | Sets the white-balance mode. `CONTINUOUS` keeps auto white balance running (recommended; avoids a warm/yellow cast), `LOCK` freezes the current gains, `AUTO` performs a one-time adjustment. `CUSTOM` is reserved and rejected until manual gains support is implemented. |
| `getSupportedVideoFrameRates` | Lists the video frame rates supported by the active camera for the current format. Supported values depend on the selected camera, lens, and video quality. |
| `getVideoFrameRate` | Returns the configured video frame rate for the active camera. On Android the actual recording frame rate can still vary in low light or under thermal pressure. |
| `setVideoFrameRate` | Sets the target video frame rate for the active camera session. Prefer passing `frameRate` to `startRecordVideo()` when starting a recording. Rejects unsupported values with a clear error. |

## Examples

### `start()`

Starts the camera preview.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

const result = await CameraPreview.start({ parent: 'parent' });
console.log(result);
```

### `stop()`

Stops the camera preview.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.stop();
```

### `capture()`

Captures a picture from the camera.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

const result = await CameraPreview.capture({ height: 1920 });
console.log(result);
```

### `captureSample()`

Captures a single frame from the camera preview stream.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

const result = await CameraPreview.captureSample({ quality: 85 });
console.log(result);
```

### `startBarcodeScanner()`

Starts barcode scanning on the active camera preview.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.startBarcodeScanner();
```

### `stopBarcodeScanner()`

Stops barcode scanning while keeping the camera preview running.

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.stopBarcodeScanner();
```

The table above lists the 56 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-camera-preview/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CameraPreview.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-camera-preview/)
- [Documentation](/docs/plugins/camera-preview/)
- [API reference](/docs/plugins/camera-preview/getting-started/)

## Keep going from Using @capgo/camera-preview

If you are using **Using @capgo/camera-preview** to plan native media and interface behavior, connect it with [@capgo/camera-preview](/docs/plugins/camera-preview/) for the implementation detail in @capgo/camera-preview, [Getting Started](/docs/plugins/camera-preview/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
