---
locale: it
---

capgo/capacitor-uploader Tutorial

Este tutorial te guiará a través del proceso de uso del paquete `@capgo/capacitor-uploader` para subir archivos de manera nativa en tu aplicación de Ionic Capacitor.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Nodejs
- npm
- Proyecto de Ionic Capacitor

## Instalación

1 Abre tu terminal o símbolo del sistema y navega a tu directorio del proyecto.

2 Ejecuta el siguiente comando para instalar el paquete:

```bash
npm install @capgo/capacitor-uploader
```

3 Después de la instalación, sincroniza tu proyecto de Capacitor:

```bash
npx cap sync
```

## Configuración

### Configuración de Android

Para Android, necesitas agregar algunos permisos a tu archivo `AndroidManifest.xml`. Abre el archivo ubicado en `android/app/src/main/AndroidManifest.xml` y agrega los siguientes permisos dentro de la etiqueta `<manifest>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Uso

Ahora que hemos instalado y configurado el paquete, veamos cómo usarlo en tu aplicación.

### Importando el Uploader

Primero, importa el Uploader en tu archivo TypeScript:

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### Subiendo a S3

Aquí hay un ejemplo de cómo subir un archivo a S3 usando una URL prefirmada:

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

### Subiendo a un Servidor Personalizado

Aquí hay un ejemplo de cómo subir un archivo a un servidor personalizado:

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

### Usando con el Preview de Cámara de Capacitor

Si estás utilizando el plugin Capacitor Camera Preview, puedes combinarlo con el Uploader para capturar y subir videos. Aquí hay un ejemplo:

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

## Conclusión

Ahora has aprendido cómo usar el paquete `@capgo/capacitor-uploader` para subir archivos de manera nativa en tu aplicación de Ionic Capacitor. Este plugin proporciona una forma flexible de subir archivos a varios servidores, incluida S3 con URLs prefirmadas, y se puede utilizar en combinación con otros plugins como el Capacitor Camera Preview.

Recuerda manejar los errores adecuadamente y gestionar los eventos de carga para proporcionar retroalimentación a tus usuarios sobre el progreso y estado de la carga.

Para obtener información más detallada sobre la API y las opciones disponibles, consulta el README o la documentación del paquete.