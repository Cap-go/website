---
locale: en
---
# Using @capgo/capacitor-file-picker Package

The `@capgo/capacitor-file-picker` package allows you to pick files, images, videos, and directories from your device. In this tutorial, we will guide you through the process of installing and using this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-file-picker` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-file-picker
npx cap sync
```

## iOS Setup

The `@capgo/capacitor-file-picker` package works out of the box on iOS, so no additional setup is required. The plugin requires iOS 15.0+.

## Android Setup

No additional setup is required for Android. The plugin requires API 24+ (Android 7.0+). Permissions are automatically requested when needed.

## API

The `@capgo/capacitor-file-picker` package provides the following API methods:

### pickFiles(options)

This method allows you to pick one or more files from the device.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function pickFiles() {
  const result = await FilePicker.pickFiles({
    types: ['application/pdf', 'image/*'],
    limit: 5
  });

  for (const file of result.files) {
    console.log('File name:', file.name);
    console.log('File path:', file.path);
    console.log('MIME type:', file.mimeType);
    console.log('Size:', file.size, 'bytes');
  }
}
```

### pickImages(options)

This method allows you to pick one or more images from the gallery. Android/iOS only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function pickImages() {
  const result = await FilePicker.pickImages({
    limit: 10,
    ordered: true // Show selection order on iOS 15+
  });

  for (const image of result.files) {
    console.log('Image:', image.name);
    console.log('Dimensions:', image.width, 'x', image.height);
    console.log('Path:', image.path);
  }
}
```

### pickVideos(options)

This method allows you to pick one or more videos from the gallery. Android/iOS only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function pickVideos() {
  const result = await FilePicker.pickVideos({
    limit: 3,
    skipTranscoding: true // Skip video transcoding on iOS
  });

  for (const video of result.files) {
    console.log('Video:', video.name);
    console.log('Duration:', video.duration, 'seconds');
    console.log('Dimensions:', video.width, 'x', video.height);
  }
}
```

### pickMedia(options)

This method allows you to pick images or videos from the gallery. Android/iOS only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function pickMedia() {
  const result = await FilePicker.pickMedia({
    limit: 0 // 0 means unlimited
  });

  for (const file of result.files) {
    console.log('Media:', file.name);
    console.log('Type:', file.mimeType);
  }
}
```

### pickDirectory()

This method allows you to pick a directory. Android/iOS only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function pickDirectory() {
  const result = await FilePicker.pickDirectory();
  console.log('Selected directory:', result.path);
}
```

### convertHeicToJpeg(options)

This method converts a HEIC image to JPEG format. iOS only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function convertImage(heicPath) {
  const result = await FilePicker.convertHeicToJpeg({
    path: heicPath,
    quality: 0.9 // 0.0 to 1.0
  });
  console.log('Converted JPEG path:', result.path);
}
```

### copyFile(options)

This method copies a file to a new location.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function copyFile() {
  await FilePicker.copyFile({
    from: '/path/to/source.jpg',
    to: '/path/to/destination.jpg',
    overwrite: true
  });
  console.log('File copied successfully');
}
```

### checkPermissions() / requestPermissions()

These methods check or request file access permissions. Android only.

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';

async function checkAndRequestPermissions() {
  const status = await FilePicker.checkPermissions();

  if (status.readExternalStorage !== 'granted') {
    const newStatus = await FilePicker.requestPermissions();
    console.log('New permission status:', newStatus);
  }
}
```

## Working with Picked Files

The picked files contain useful metadata:

```javascript
interface PickedFile {
  name: string;       // File name
  path: string;       // File path
  mimeType: string;   // MIME type
  size: number;       // Size in bytes
  data?: string;      // Base64 data (if readData was true)
  width?: number;     // Width in pixels (images/videos)
  height?: number;    // Height in pixels (images/videos)
  duration?: number;  // Duration in seconds (videos)
  modifiedAt?: number; // Last modified timestamp
}
```

## Complete Example

Here's a complete example showing various file picker use cases:

```javascript
import { FilePicker } from '@capgo/capacitor-file-picker';
import { Capacitor } from '@capacitor/core';

class FilePickerService {
  // Pick a profile image and handle HEIC conversion
  async pickProfileImage() {
    const result = await FilePicker.pickImages({
      limit: 1
    });

    if (result.files.length === 0) {
      return null;
    }

    let file = result.files[0];

    // Convert HEIC to JPEG on iOS
    if (Capacitor.getPlatform() === 'ios' &&
        file.mimeType === 'image/heic') {
      const converted = await FilePicker.convertHeicToJpeg({
        path: file.path,
        quality: 0.9
      });
      return converted.path;
    }

    return file.path;
  }

  // Pick documents with specific types
  async pickDocuments() {
    const result = await FilePicker.pickFiles({
      types: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      limit: 10
    });

    return result.files.map(file => ({
      name: file.name,
      path: file.path,
      size: file.size
    }));
  }

  // Pick and read file content as base64
  async pickAndReadFile() {
    const result = await FilePicker.pickFiles({
      limit: 1,
      readData: true
    });

    if (result.files.length === 0) {
      return null;
    }

    return {
      name: result.files[0].name,
      data: result.files[0].data // Base64 encoded
    };
  }

  // Pick video with metadata
  async pickVideoForUpload() {
    const result = await FilePicker.pickVideos({
      limit: 1,
      skipTranscoding: false
    });

    if (result.files.length === 0) {
      return null;
    }

    const video = result.files[0];
    return {
      path: video.path,
      name: video.name,
      duration: video.duration,
      width: video.width,
      height: video.height,
      size: video.size
    };
  }

  // Listen for picker dismissal (iOS only)
  async pickWithDismissListener() {
    const listener = await FilePicker.addListener(
      'pickerDismissed',
      () => {
        console.log('Picker was dismissed without selection');
      }
    );

    try {
      const result = await FilePicker.pickFiles({ limit: 1 });
      return result.files;
    } finally {
      listener.remove();
    }
  }
}

// Usage
const filePickerService = new FilePickerService();

// Pick profile image
const imagePath = await filePickerService.pickProfileImage();

// Pick documents
const documents = await filePickerService.pickDocuments();

// Pick video
const video = await filePickerService.pickVideoForUpload();
```

That's it! You have successfully learned how to use the `@capgo/capacitor-file-picker` package in your Ionic Capacitor app to pick files, images, videos, and directories from your device.
