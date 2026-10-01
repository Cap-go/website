---
locale: en
---
# Using @capgo/capacitor-file-picker

Capacitor File Picker Plugin interface for selecting files, images, videos, and directories.

## Install

```bash
bun add @capgo/capacitor-file-picker
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';
```

## API at a glance

| Method | Description |
| --- | --- |
| `pickFiles` | Pick one or more files from the device. |
| `pickImages` | Pick one or more images from the gallery. Android/iOS only. |
| `pickVideos` | Pick one or more videos from the gallery. Android/iOS only. |
| `pickMedia` | Pick one or more images or videos from the gallery. Android/iOS only. |
| `pickDirectory` | Pick a directory from the device. Android/iOS only. |
| `convertHeicToJpeg` | Convert a HEIC image to JPEG format. iOS only. |
| `copyFile` | Copy a file to a new location. |
| `checkPermissions` | Check broad storage or media permission state. Picker-only flows should not gate `pickFiles()`, `pickImages()`, `pickVideos()`, or `pickMedia()` on this permission on Android 13+. Android only. |
| `requestPermissions` | Request broad storage or media permissions. Do not request or declare `READ_MEDIA_IMAGES` or `READ_MEDIA_VIDEO` only to use picker APIs. Google Play allows these permissions only when picker alternatives are not sufficient for core app functionality. Use `@capgo/capacitor-file-picker` picker methods instead for user-selected file, image, or video access. Android only. |

## Examples

### `pickFiles()`

Pick one or more files from the device.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickFiles({
  types: ['application/pdf', 'image/*'],
  limit: 5,
  readData: false
});
console.log('Picked files:', result.files);
```

### `pickImages()`

Pick one or more images from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickImages({
  limit: 10,
  readData: false
});
console.log('Picked images:', result.files);
```

### `pickVideos()`

Pick one or more videos from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickVideos({
  limit: 3,
  skipTranscoding: true
});
console.log('Picked videos:', result.files);
```

### `pickMedia()`

Pick one or more images or videos from the gallery. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickMedia({
  limit: 5,
  readData: true
});
console.log('Picked media:', result.files);
```

### `pickDirectory()`

Pick a directory from the device. Android/iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.pickDirectory();
console.log('Selected directory:', result.path);
```

### `convertHeicToJpeg()`

Convert a HEIC image to JPEG format. iOS only.

```typescript
import { CapgoFilePicker } from '@capgo/capacitor-file-picker';

const result = await CapgoFilePicker.convertHeicToJpeg({
  path: '/path/to/image.heic',
  quality: 0.9
});
console.log('Converted file:', result.path);
```

The table above lists the 9 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-file-picker/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapgoFilePicker.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-file-picker/)
- [Documentation](/docs/plugins/file-picker/)
- [API reference](/docs/plugins/file-picker/getting-started/)

## Keep going from Using @capgo/capacitor-file-picker

If you are using **Using @capgo/capacitor-file-picker** to plan storage and file handling, connect it with [@capgo/capacitor-file-picker](/docs/plugins/file-picker/) for the implementation detail in @capgo/capacitor-file-picker, [Getting Started](/docs/plugins/file-picker/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-data-storage-sqlite](/docs/plugins/data-storage-sqlite/) for the implementation detail in @capgo/capacitor-data-storage-sqlite, [Using @capgo/capacitor-data-storage-sqlite](/plugins/capacitor-data-storage-sqlite/) for the native capability in Using @capgo/capacitor-data-storage-sqlite, and [@capgo/capacitor-file](/docs/plugins/file/) for the implementation detail in @capgo/capacitor-file.
