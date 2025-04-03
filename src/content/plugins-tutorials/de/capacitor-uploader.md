---
locale: de
---

capgo/capacitor-uploader Tutorial

Dieses Tutorial führt Sie durch den Prozess der Verwendung des `@capgo/capacitor-uploader` Pakets, um Dateien nativ in Ihrer Ionic Capacitor-App hochzuladen.

## Voraussetzungen

Bevor wir beginnen, stellen Sie sicher, dass Sie Folgendes installiert haben:

- Nodejs
- npm
- Ionic Capacitor Projekt

## Installation

1. Öffnen Sie Ihr Terminal oder Eingabeaufforderung und navigieren Sie zu Ihrem Projektverzeichnis.

2. Führen Sie den folgenden Befehl aus, um das Paket zu installieren:

```bash
npm install @capgo/capacitor-uploader
```

3. Nach der Installation synchronisieren Sie Ihr Capacitor-Projekt:

```bash
npx cap sync
```

## Konfiguration

### Android-Konfiguration

Für Android müssen Sie einige Berechtigungen zu Ihrer `AndroidManifestxml`-Datei hinzufügen. Öffnen Sie die Datei im Verzeichnis `android/app/src/main/AndroidManifestxml` und fügen Sie die folgenden Berechtigungen innerhalb des `<manifest>`-Tags hinzu:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Verwendung

Jetzt, da wir das Paket installiert und konfiguriert haben, schauen wir uns an, wie wir es in Ihrer App verwenden können.

### Hochladen des Uploaders

Zuerst importieren Sie den Uploader in Ihre TypeScript-Datei:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### Hochladen zu S3

Hier ist ein Beispiel, wie man eine Datei mit einer vorab signierten URL nach S3 hochlädt:

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

### Hochladen zu einem benutzerdefinierten Server

Hier ist ein Beispiel, wie man eine Datei auf einen benutzerdefinierten Server hochlädt:

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

### Verwendung mit dem Capacitor Camera Preview

Wenn Sie das Capacitor Camera Preview-Plugin verwenden, können Sie es mit dem Uploader kombinieren, um Videos aufzunehmen und hochzuladen. Hier ist ein Beispiel:

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

## Fazit

Sie haben jetzt gelernt, wie man das `@capgo/capacitor-uploader` Paket verwendet, um Dateien nativ in Ihrer Ionic Capacitor-App hochzuladen. Dieses Plugin bietet eine flexible Möglichkeit, Dateien an verschiedene Server hochzuladen, einschließlich S3 mit vorab signierten URLs, und kann in Kombination mit anderen Plugins wie dem Capacitor Camera Preview verwendet werden.

Denken Sie daran, Fehler angemessen zu behandeln und Upload-Ereignisse zu verwalten, um Ihren Benutzern Feedback über den Fortschritt und den Status des Uploads zu geben.

Für detailliertere Informationen über die API und verfügbare Optionen konsultieren Sie die README oder die Dokumentation des Pakets.