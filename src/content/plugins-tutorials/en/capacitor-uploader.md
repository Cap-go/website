# @capgo/capacitor-uploader Tutorial

This tutorial will guide you through the process of using the `@capgo/capacitor-uploader` package to upload files natively in your Ionic Capacitor app.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js
- npm
- Ionic Capacitor project

## Installation

1. Open your terminal or command prompt and navigate to your project directory.

2. Run the following command to install the package:

```bash
npm install @capgo/capacitor-uploader
```

3. After installation, sync your Capacitor project:

```bash
npx cap sync
```

## Configuration

### Android Configuration

For Android, you need to add some permissions to your `AndroidManifest.xml` file. Open the file located at `android/app/src/main/AndroidManifest.xml` and add the following permissions inside the `<manifest>` tag:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Usage

Now that we have installed and configured the package, let's look at how to use it in your app.

### Importing the Uploader

First, import the Uploader in your TypeScript file:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### Uploading to S3

Here's an example of how to upload a file to S3 using a presigned URL:

```typescript
async function uploadToS3(filePath: string, presignedUrl: string, fields: Record<string, string>) {
  try {
    const { id } = await Uploader.startUpload({
      filePath: filePath,
      serverUrl: presignedUrl,
      method: 'PUT',
      parameters: fields,
      notificationTitle: 'Uploading to S3'
    });

    console.log('Upload started with ID:', id);

    Uploader.addListener('events', (event: UploadEvent) => {
      if (event.name === 'uploading') {
        console.log(`Upload progress: ${event.payload.percent}%`);
      } else if (event.name === 'completed') {
        console.log('Upload completed successfully');
      } else if (event.name === 'failed') {
        console.error('Upload failed:', event.payload.error);
      }
    });

  } catch (error) {
    console.error('Failed to start upload:', error);
  }
}
```

### Uploading to a Custom Server

Here's an example of how to upload a file to a custom server:

```typescript
async function uploadToCustomServer(filePath: string, serverUrl: string) {
  try {
    const { id } = await Uploader.startUpload({
      filePath: filePath,
      serverUrl: serverUrl,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your-auth-token-here'
      },
      parameters: {
        'user_id': '12345',
        'file_type': 'image'
      },
      notificationTitle: 'Uploading to Custom Server',
      maxRetries: 3
    });

    console.log('Upload started with ID:', id);

    Uploader.addListener('events', (event) => {
      switch (event.name) {
        case 'uploading':
          console.log(`Upload progress: ${event.payload.percent}%`);
          break;
        case 'completed':
          console.log('Upload completed successfully');
          console.log('Server response status code:', event.payload.statusCode);
          break;
        case 'failed':
          console.error('Upload failed:', event.payload.error);
          break;
      }
    });

  } catch (error) {
    console.error('Failed to start upload:', error);
  }
}
```

### Using with Capacitor Camera Preview

If you're using the Capacitor Camera Preview plugin, you can combine it with the Uploader to capture and upload videos. Here's an example:

```typescript
import { CameraPreview } from '@capgo/camera-preview'
import { Uploader } from '@capgo/capacitor-uploader';

async function recordAndUpload() {
  try {
    await CameraPreview.startRecordVideo({ storeToFile: true });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Record for 5 seconds
    const { videoFilePath } = await CameraPreview.stopRecordVideo();
    await uploadVideo(videoFilePath);
  } catch (error) {
    console.error('Error in recordAndUpload:', error);
  }
}

async function uploadVideo(filePath: string) {
  Uploader.addListener('events', (event) => {
    switch (event.name) {
      case 'uploading':
        console.log(`Upload progress: ${event.payload.percent}%`);
        break;
      case 'completed':
        console.log('Upload completed successfully');
        break;
      case 'failed':
        console.error('Upload failed:', event.payload.error);
        break;
    }
  });

  try {
    const result = await Uploader.startUpload({
      filePath,
      serverUrl: 'YOUR_S3_PRESIGNED_URL',
      method: 'PUT',
      headers: {
        'Content-Type': 'video/mp4',
      },
      mimeType: 'video/mp4',
    });
    console.log('Video uploaded successfully:', result.id);
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}
```

## Conclusion

You've now learned how to use the `@capgo/capacitor-uploader` package to upload files natively in your Ionic Capacitor app. This plugin provides a flexible way to upload files to various servers, including S3 with presigned URLs, and can be used in combination with other plugins like the Capacitor Camera Preview.

Remember to handle errors appropriately and manage upload events to provide feedback to your users about the upload progress and status.

For more detailed information about the API and available options, refer to the package's README or documentation.
