---
slug: cordova-plugin-camera-preview-alternative
title: "cordova-plugin-camera-preview Alternative for Capacitor"
description: "cordova-plugin-camera-preview alternative for Capacitor: replace Cordova camera preview callbacks with @capgo/camera-preview, live overlay UI, capture, and video."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-12T09:00:00.000Z
updated_at: 2026-11-12T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a camera preview plugin guide"
keywords: cordova-plugin-camera-preview alternative, capacitor camera preview, live camera overlay capacitor, @capgo/camera-preview, cordova camera preview migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-camera-preview alternative for Capacitor?"
    answer: "@capgo/camera-preview is a Capacitor-native plugin based on cordova-plugin-camera-preview. It exposes start, stop, capture, video recording, barcode scanning, and camera controls through promises and Capacitor listeners."
  - question: "Is cordova-plugin-camera-preview still maintained?"
    answer: "npm shows version 0.14.0 published on 12 July 2025. The GitHub repository cordova-plugin-camera-preview/cordova-plugin-camera-preview had commits in 2026. It remains a Cordova plugin, not a Capacitor package."
  - question: "Do I need a transparent WebView for toBack preview?"
    answer: "Yes. When toBack is true, set your html, body, or Ionic content background to transparent so the native preview shows behind your HTML overlay, same as the Cordova plugin documented."
  - question: "Which permissions are required?"
    answer: "Android needs CAMERA in AndroidManifest.xml. iOS needs NSCameraUsageDescription in Info.plist. Microphone, photo library, and location permissions apply only when you enable audio, saveToGallery, or EXIF location in plugin options."
  - question: "Can I scan barcodes without leaving the preview?"
    answer: "Yes. Pass barcodeScanner true in start options or call startBarcodeScanner while the preview is running. Listen for barcodeScanned events from the plugin."
  - question: "Where are docs and source?"
    answer: "Capgo docs at https://capgo.app/docs/plugins/camera-preview/, npm https://www.npmjs.com/package/@capgo/camera-preview, GitHub https://github.com/Cap-go/capacitor-camera-preview/."
---

If you need a **cordova-plugin-camera-preview alternative** in a Capacitor app, use [`@capgo/camera-preview`](/plugins/capacitor-camera-preview/). The Capgo plugin is explicitly **based on cordova-plugin-camera-preview** and keeps the same idea: a native camera stream behind or in front of your HTML so you can build custom scanners, AR-style overlays, and inline capture screens. This guide covers maintenance context, install steps, a short example, and an API map from Cordova callbacks to Capacitor promises.

## Why migrate off the Cordova plugin

`cordova-plugin-camera-preview` still ships on npm. The latest version is **0.14.0** (npm `modified` **12 July 2025**). The community GitHub repo received commits in **2026**, and the README states releases are still updated.

For Capacitor teams the blocker is the runtime model:

- Methods such as `CameraPreview.startCamera` use Cordova success and error callbacks, not promises.
- The plugin installs through `cordova plugin add`, not `@capacitor/cli` sync.
- Capacitor 8 projects avoid the Cordova compatibility layer when they can, because it complicates permissions, debugging, and store review (CallKit and microphone edge cases on iOS).

[`@capgo/camera-preview`](https://www.npmjs.com/package/@capgo/camera-preview) lists the same feature set in its README (live preview, photo capture, video, effects, tap to focus, `toBack` overlays) and adds Capacitor-only capabilities such as barcode scanning, permission helpers, and optional integration with [`@capgo/capacitor-uploader`](/plugins/capacitor-uploader/) when `storeToFile` saves captures to disk.

Capgo maintains the plugin for current Capacitor major versions (v8.x for Capacitor 8 per the README compatibility table). Issues and fixes follow the Capgo open source workflow described in the repository.

## Install

```bash
bun add @capgo/camera-preview
bunx cap sync
```

**Android:** in `android/app/src/main/AndroidManifest.xml` add at minimum:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Add `RECORD_AUDIO` only when `disableAudio` is false. Add storage or location permissions only when you enable gallery save or EXIF location options documented in the README.

**iOS:** in `ios/App/App/Info.plist` set `NSCameraUsageDescription`. Add `NSMicrophoneUsageDescription` when recording video with audio, or set `disableAudio: true` to skip the microphone prompt.

**Web:** import the web implementation once (for example in your Ionic entry module) so Capacitor registers the plugin: `import '@capgo/camera-preview'`.

Rebuild native binaries after permission or CallKit configuration changes. JavaScript-only tweaks can ship with [Capgo live updates](/live-update/) afterward.

## Usage example

```ts
import { CameraPreview } from '@capgo/camera-preview';

export async function openScannerOverlay() {
  await CameraPreview.start({
    position: 'rear',
    toBack: true,
    width: window.innerWidth,
    height: window.innerHeight,
    disableAudio: true,
    barcodeScanner: true,
  });

  const handle = await CameraPreview.addListener('barcodeScanned', async (event) => {
    console.log(event.value);
    await CameraPreview.stop();
    await handle.remove();
  });
}
```

When `toBack` is true, keep the WebView background transparent so touches reach your HTML controls while the camera sits underneath.

## Migrating from Cordova to Capacitor

Unregister Cordova `CameraPreview` globals and import from `@capgo/camera-preview`. Replace callback arguments with `await` and use `addListener` for events such as barcode scans.

### API mapping table

| cordova-plugin-camera-preview | @capgo/camera-preview |
| --- | --- |
| `CameraPreview.startCamera(options, success, error)` | `CameraPreview.start(options)` |
| `CameraPreview.stopCamera(success, error)` | `CameraPreview.stop()` |
| `CameraPreview.switchCamera(success, error)` | `CameraPreview.flip()` |
| `CameraPreview.takePicture(options, success, error)` | `CameraPreview.capture(options)` |
| `CameraPreview.takeSnapshot(options, success, error)` | `CameraPreview.captureSample(options)` |
| `CameraPreview.show()` / `hide()` | Use `stop()` and `start()` or opacity via `setOpacity()` |
| `CameraPreview.startRecordVideo(options, success, error)` | `CameraPreview.startRecordVideo(options)` |
| `CameraPreview.stopRecordVideo(success, error)` | `CameraPreview.stopRecordVideo()` |
| `CameraPreview.setZoom(zoom, ...)` | `CameraPreview.setZoom({ level })` |
| `CameraPreview.getZoom(cb, ...)` | `CameraPreview.getZoom()` |
| `CameraPreview.setFlashMode(mode, ...)` | `CameraPreview.setFlashMode({ mode })` |
| `CameraPreview.getSupportedFlashModes(cb, ...)` | `CameraPreview.getSupportedFlashModes()` |
| `CameraPreview.tapToFocus(x, y, ...)` | `CameraPreview.setFocus({ x, y })` |
| `CameraPreview.setColorEffect(effect, ...)` | Check README for effect helpers or post-process frame |
| `CameraPreview.setPreviewSize(dimensions, ...)` | Pass updated `width` / `height` in `start()` options or layout APIs |
| `options.storeToFile` | `storeToFile: true` on `start()` / `capture()` (returns file path) |
| `options.toBack` | `toBack: true` plus transparent WebView CSS |
| `options.camera` BACK / FRONT | `position: 'rear'` or `'front'` |

Cordova option names such as `tapPhoto` map to Capgo capture settings documented in the README. Prefer the TypeScript `CameraPreviewOptions` interface in [`@capgo/camera-preview`](https://github.com/Cap-go/capacitor-camera-preview/) when you port advanced exposure or white balance calls.

### iOS CallKit note

The Capgo README documents optional `iosCallKit` in `capacitor.config`. It defaults to false so camera-only apps avoid App Store CallKit review friction in regions where CallKit apps are restricted. Enable it only when you need phone-call-aware microphone recovery.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/camera-preview/](/docs/plugins/camera-preview/)
- Marketing page: [/plugins/camera-preview/](/plugins/capacitor-camera-preview/)
- npm: [https://www.npmjs.com/package/@capgo/camera-preview](https://www.npmjs.com/package/@capgo/camera-preview)
- GitHub: [https://github.com/Cap-go/capacitor-camera-preview/](https://github.com/Cap-go/capacitor-camera-preview/)
- Cordova upstream: [https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview](https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview)

For the wider Cordova move, see [migrating Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/). Cloud builds after native plugin changes: [Capgo Build](/native-build/).
