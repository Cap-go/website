---
slug: how-to-take-and-edit-photos-in-a-capacitor-app
title: "How to Take and Edit Photos in a Capacitor App"
description: "Take and edit photos in a Capacitor app with the Camera 8 API: capture, gallery picking, in-app crop, live preview, compression, EXIF, and uploads."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Taking and editing a photo with the camera inside a Capacitor app"
keywords: capacitor camera, take photo capacitor, edit photo capacitor, capacitor camera takePhoto, ionic camera, capacitor camera preview, capacitor image crop, capacitor photo upload
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I take and edit a photo in a Capacitor app?"
    answer: "Install @capacitor/camera 8.1 or newer and call Camera.takePhoto({ editable: 'in-app' }). The user takes the picture, then crops or rotates it in the built-in editor, and the promise resolves with a MediaResult containing a file uri and a webPath you can show in an img tag."
  - question: "Is Camera.getPhoto deprecated?"
    answer: "Yes. Since @capacitor/camera 8.1, getPhoto and pickImages are deprecated in favor of takePhoto, chooseFromGallery, editPhoto and editURIPhoto. The old methods still work in Capacitor 8 but will be removed in a future major version."
  - question: "What permissions does the Capacitor Camera plugin need?"
    answer: "On iOS, add NSCameraUsageDescription, NSPhotoLibraryUsageDescription and NSPhotoLibraryAddUsageDescription to Info.plist. On Android, no permission is needed for capture or picking because the plugin uses system intents and the Android Photo Picker. Storage permissions are only needed for saveToGallery on old Android versions."
  - question: "How do I detect that the user cancelled the camera?"
    answer: "Catch the rejection and compare error.code with CameraErrorCode.TakePhotoCancelled (OS-PLUG-CAMR-0006), CameraErrorCode.ChooseMediaCancelled or CameraErrorCode.EditPhotoCancelled. Treat those as a normal outcome, not a crash."
  - question: "How do I build a custom camera screen in Capacitor?"
    answer: "Use @capgo/camera-preview. It renders the native camera behind or inside your web layout, so you can draw your own shutter button, overlays, zoom and flash controls in HTML, then call capture() to get the photo."
---

To take and edit photos in a Capacitor app, use `@capacitor/camera` 8.1 or later: `Camera.takePhoto()` opens the camera, `editable: 'in-app'` adds a crop and rotate step, and `chooseFromGallery()` picks existing photos through the system picker. For a custom camera screen with your own controls, use `@capgo/camera-preview`. This guide covers capture, editing, permissions, compression, metadata, saving, and uploading, with code for Capacitor 8.

## Pick the right tool

| Need | Plugin | Why |
| --- | --- | --- |
| Take a photo with the system camera UI | `@capacitor/camera` `takePhoto` | No custom UI to maintain, works everywhere |
| Let the user crop or rotate | `@capacitor/camera` `editable`, `editPhoto`, `editURIPhoto` | Built-in in-app editor on iOS and Android |
| Pick one or many photos or videos | `@capacitor/camera` `chooseFromGallery` | Uses the Android Photo Picker and PHPicker, no broad permission |
| Custom camera screen (overlays, ID card frame, face guide) | [`@capgo/camera-preview`](/plugins/capacitor-camera-preview/) | Native preview you control from HTML and JS |
| Browse the whole library inside your own grid | [`@capgo/capacitor-photo-library`](/plugins/capacitor-photo-library/) | Paginated library access with thumbnails |
| Shrink, resize or convert HEIC | [`@capgo/capacitor-file-compressor`](/plugins/capacitor-file-compressor/) | Native encoder, strips EXIF |
| Upload large photos reliably | [`@capgo/capacitor-uploader`](/plugins/capacitor-uploader/) | Native background upload with progress |

## Install and configure the Camera plugin

```bash
bun add @capacitor/camera
bunx cap sync
```

Make sure you have version 8.1 or newer. The methods in this guide (`takePhoto`, `chooseFromGallery`, `editPhoto`, `editURIPhoto`) were added in 8.1, and `CameraErrorCode` in 8.2. The older `getPhoto` and `pickImages` are deprecated.

### iOS

Add these keys to `ios/App/App/Info.plist`. Apple rejects builds with vague strings, so explain the real reason:

```xml
<key>NSCameraUsageDescription</key>
<string>Take a photo for your profile or attach it to a report.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Choose existing photos to attach.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save photos you take to your library.</string>
```

### Android

Capture and gallery picking need no permission. The plugin starts the system camera activity and uses the Android Photo Picker on Android 11+ devices that support it, falling back to `ACTION_OPEN_DOCUMENT` elsewhere. To get the backported picker on older devices with Google Play services, add this inside `<application>` in `AndroidManifest.xml`. The snippet uses the `tools` namespace, so also add `xmlns:tools="http://schemas.android.com/tools"` to the root `<manifest>` element if it is not there yet (a new Capacitor project only declares `xmlns:android`):

```xml
<service android:name="com.google.android.gms.metadata.ModuleDependencies"
    android:enabled="false"
    android:exported="false"
    tools:ignore="MissingClass">
    <intent-filter>
        <action android:name="com.google.android.gms.metadata.MODULE_DEPENDENCIES" />
    </intent-filter>
    <meta-data android:name="photopicker_activity:0:required" android:value="" />
</service>
```

Only `saveToGallery: true` needs storage permissions, and only on old Android versions:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />
```

Avoid adding `READ_MEDIA_IMAGES` unless your app's core purpose is a gallery or editor. Google Play's photo and video permissions policy requires apps with occasional photo needs to use the picker instead, and builds that declare the permission without justification get rejected.

## Take a photo

```typescript
import { Camera, CameraDirection, CameraErrorCode, EncodingType } from '@capacitor/camera';

export async function takePicture() {
  try {
    const photo = await Camera.takePhoto({
      quality: 85,
      targetWidth: 2048,
      targetHeight: 2048,
      correctOrientation: true,
      encodingType: EncodingType.JPEG,
      cameraDirection: CameraDirection.Rear, // iOS and web
      includeMetadata: true,
    });

    // webPath works directly in <img src>
    document.querySelector<HTMLImageElement>('#preview')!.src = photo.webPath!;
    return photo;
  } catch (e: any) {
    if (e.code === CameraErrorCode.TakePhotoCancelled) return null;
    if (e.code === CameraErrorCode.CameraPermissionDenied) {
      // show a screen that explains how to enable the camera in Settings
      return null;
    }
    throw e;
  }
}
```

What you get back is a `MediaResult`:

- `uri`: native file URI of the full image (not on web). Pass it to Filesystem, an uploader, or `editURIPhoto`.
- `webPath`: a URL the WebView can load. Use it for previews instead of base64.
- `thumbnail`: a base64 thumbnail on native, the full image on web.
- `metadata`: size, format, resolution, creation date and EXIF when `includeMetadata` is true.
- `saved`: whether `saveToGallery` succeeded.

`targetWidth` and `targetHeight` must be set together. They are the cheapest way to avoid uploading 12 MP photos when you only need a 2048 pixel image.

## Edit the photo: crop and rotate

### Edit right after capture

Set `editable` and the user lands in an editor before the promise resolves:

```typescript
const photo = await Camera.takePhoto({
  quality: 85,
  editable: 'in-app', // 'in-app' | 'external' | 'no'
});
```

`'external'` hands the image to another installed editor on Android (for example Google Photos) and falls back to the in-app editor. iOS has no external editing and always uses `'in-app'`.

### Edit an existing photo

To edit a picked photo or one you stored earlier, pass its URI:

```typescript
const edited = await Camera.editURIPhoto({
  uri: photo.uri!,
  saveToGallery: false,
  includeMetadata: false,
});
```

If you only have base64 (for example from a canvas or a server response), use `editPhoto`. The input must be raw base64 without a `data:` prefix:

```typescript
const { outputImage } = await Camera.editPhoto({ inputImage: base64 });
img.src = `data:image/jpeg;base64,${outputImage}`;
```

Neither method is available on the web. If you need filters, stickers, text or freeform drawing, the built-in editor is not enough. Render the image in a `<canvas>` and apply the edits there, or use a JavaScript cropper such as Cropper.js for fixed aspect ratios like avatars. A canvas export (`canvas.toBlob(cb, 'image/jpeg', 0.85)`) gives you a Blob you can upload directly.

## Pick photos from the gallery

```typescript
import { Camera, MediaTypeSelection } from '@capacitor/camera';

const { results } = await Camera.chooseFromGallery({
  mediaType: MediaTypeSelection.Photo,
  allowMultipleSelection: true,
  limit: 5,            // Android 13+ and iOS
  quality: 85,
  targetWidth: 2048,
  targetHeight: 2048,
});

const urls = results.map((r) => r.webPath);
```

For a single photo, `allowMultipleSelection: false` plus `editable: 'in-app'` gives you pick-then-crop in one call. Set `mediaType: MediaTypeSelection.All` to accept videos too.

On iOS, users can grant limited access. `pickLimitedLibraryPhotos()` lets them change the selection and `getLimitedLibraryPhotos()` returns what you can see. With the system picker you rarely need either, because picked items are always readable.

### Building your own gallery grid

If your app shows the user's library inside your own UI (a photo printing app, a backup app), use `@capgo/capacitor-photo-library`:

```typescript
import { PhotoLibrary } from '@capgo/capacitor-photo-library';

const { state } = await PhotoLibrary.requestAuthorization();
if (state === 'authorized' || state === 'limited') {
  const { assets, hasMore } = await PhotoLibrary.getLibrary({
    limit: 60,
    offset: 0,
    thumbnailWidth: 256,
    thumbnailHeight: 256,
  });
  // assets[i].thumbnail?.webPath for the grid, getPhotoUrl({ id }) for full size
}
```

The same plugin's `pickMedia()` opens the system picker and copies the selection into the cache, if you want one plugin for both flows. Remember the Google Play policy above before requesting full library access on Android.

## Build a custom camera screen

The system camera UI cannot show an ID card frame, a document outline, or your brand. `@capgo/camera-preview` renders the native camera feed and lets you draw the UI in HTML:

```bash
bun add @capgo/camera-preview
bunx cap sync
```

```typescript
import { CameraPreview } from '@capgo/camera-preview';

await CameraPreview.start({
  position: 'rear',
  toBack: true,          // preview behind the WebView
  aspectRatio: '4:3',
  storeToFile: true,     // capture() returns a file path instead of base64
  disableAudio: true,
});

await CameraPreview.setFlashMode({ flashMode: 'auto' });
await CameraPreview.setZoom({ level: 2 });

const { value: filePath, exif } = await CameraPreview.capture({ quality: 85 });

await CameraPreview.stop();
```

With `toBack: true`, the preview sits behind the WebView, so the page and every parent element must have a transparent background while the camera is active. A common pattern is a `camera-active` class on `body` that sets `background: transparent` and hides the rest of the app. Add `NSCameraUsageDescription` on iOS, and on Android the plugin requests the `CAMERA` runtime permission through `requestPermissions()`. Always call `stop()` when the screen closes to release the camera.

## Display, compress and convert

Use `webPath` (or `Capacitor.convertFileSrc(path)` for paths from other plugins) to show images. Avoid base64 in `<img>` tags for full-size photos: a 4 MB JPEG becomes a 5.3 MB string in JS memory and crosses the bridge.

Before uploading, shrink the image:

```typescript
import { FileCompressor } from '@capgo/capacitor-file-compressor';

const { path } = await FileCompressor.compressImage({
  path: photo.uri!,
  width: 1600,          // keeps aspect ratio
  quality: 0.75,
  mimeType: 'image/jpeg',
});
```

The compressor accepts HEIC input from iPhones, so the same call converts HEIC to JPEG for backends that cannot read HEIC. It writes the result to a temporary directory, so move it with `@capacitor/filesystem` if you need to keep it.

## EXIF metadata and location privacy

With `includeMetadata: true`, `metadata.exif` contains the EXIF block of the photo. Photos from the camera roll can include GPS coordinates. Two rules keep you out of trouble:

1. Strip location before uploading photos that become public (profile pictures, marketplace listings). `@capgo/capacitor-file-compressor` removes EXIF on all platforms as part of compression.
2. If you need location (field reports, inspections), read it from EXIF before compressing and send it as a separate field. Then disclose it in your App Store privacy label and Play data safety form. See our [privacy manifest guide](/blog/privacy-manifest-for-capacitor-apps-guide/) for the iOS side.

## Save to the gallery or app storage

`saveToGallery: true` on `takePhoto` or `editURIPhoto` writes the image to the camera roll and sets `saved` on the result. To keep a photo private to your app, copy it into app storage:

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

await Filesystem.copy({
  from: photo.uri!,
  to: `photos/${Date.now()}.jpg`,
  toDirectory: Directory.Data,
});
```

Files in the cache directory can be removed by the OS at any time, so do not store long-lived references to them.

## Upload the photo

For small photos, `fetch` with `FormData` is enough:

```typescript
const blob = await fetch(photo.webPath!).then((r) => r.blob());
const form = new FormData();
form.append('file', blob, 'photo.jpg');
await fetch('https://api.example.com/photos', { method: 'POST', body: form });
```

For large files or flaky networks, use a native uploader that keeps going when the app is backgrounded:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';

const { id } = await Uploader.startUpload({
  filePath: path,
  serverUrl: 'https://api.example.com/photos',
  method: 'POST',
  mimeType: 'image/jpeg',
});

await Uploader.addListener('events', (event) => {
  console.log(event.name, event.payload);
});
```

## Example: profile picture flow

1. Show an action sheet with "Take photo" and "Choose from library".
2. Call `takePhoto` or `chooseFromGallery` with `editable: 'in-app'`, `targetWidth: 1024`, `targetHeight: 1024`.
3. Crop to a square in a canvas if you need a guaranteed 1:1 ratio.
4. Compress with `quality: 0.8` and EXIF removed.
5. Upload, then show the server URL, not the local file, so the avatar survives reinstalls.

## Troubleshooting

**The app crashes on iOS when the camera opens**: a usage description key is missing in `Info.plist`.

**The photo is rotated on Android**: set `correctOrientation: true` (the default) and avoid reading raw pixels without applying EXIF orientation.

**The app restarts after taking a photo on low-memory Android devices**: Android may kill your activity while the camera is open. Listen to `appRestoredResult` from `@capacitor/app` to recover the result after the restart.

**`webPath` does not load**: you saved the `webPath` and reused it after a restart. Persist the `uri` or a Filesystem path and convert it again with `Capacitor.convertFileSrc`.

**Camera preview shows a black screen**: an element above the WebView still has a background color, or `start()` was called before the permission was granted.

**Play Console rejects the build for photo permissions**: remove `READ_MEDIA_IMAGES` and `READ_MEDIA_VIDEO` unless you filed a declaration that your app needs broad access.

## Ship fixes without a store release

Image sizes, compression levels, crop ratios and upload endpoints all live in your web code. With [Capgo live updates](/live-update/) you can change them for every user without waiting for review, while native changes like new plugins go through a regular build. If you need iOS builds without a Mac, [Capgo Build](/native-build/) handles signing and uploads with Xcode 26, which App Store Connect requires since April 2026.
