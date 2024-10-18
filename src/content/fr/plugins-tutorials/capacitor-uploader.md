---
locale: fr
---

Tutoriel capgo/capacitor-uploader

Ce tutoriel vous guidera à travers le processus d'utilisation du paquet `@capgo/capacitor-uploader` pour télécharger des fichiers de manière native dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Nodejs
- npm
- Projet Ionic Capacitor

## Installation

1 Ouvrez votre terminal ou invite de commande et naviguez vers votre répertoire de projet.

2 Exécutez la commande suivante pour installer le paquet :

```bash
npm install @capgo/capacitor-uploader
```

3 Après l'installation, synchronisez votre projet Capacitor :

```bash
npx cap sync
```

## Configuration

### Configuration Android

Pour Android, vous devez ajouter certaines autorisations à votre fichier `AndroidManifest.xml`. Ouvrez le fichier situé à `android/app/src/main/AndroidManifest.xml` et ajoutez les autorisations suivantes à l'intérieur de la balise `<manifest>` :

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Utilisation

Maintenant que nous avons installé et configuré le paquet, voyons comment l'utiliser dans votre application.

### Importer l'Uploader

Tout d'abord, importez l'Uploader dans votre fichier TypeScript :

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### Téléchargement vers S3

Voici un exemple de la façon de télécharger un fichier vers S3 en utilisant une URL pré-signée :

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

### Téléchargement vers un Serveur Personnalisé

Voici un exemple de la façon de télécharger un fichier vers un serveur personnalisé :

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

### Utilisation avec le Preview de la Caméra Capacitor

Si vous utilisez le plugin Capacitor Camera Preview, vous pouvez le combiner avec l'Uploader pour capturer et télécharger des vidéos. Voici un exemple :

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

Vous avez maintenant appris à utiliser le paquet `@capgo/capacitor-uploader` pour télécharger des fichiers de manière native dans votre application Ionic Capacitor. Ce plugin offre un moyen flexible de télécharger des fichiers vers divers serveurs, y compris S3 avec des URL pré-signées, et peut être utilisé en combinaison avec d'autres plugins comme le Capacitor Camera Preview.

N'oubliez pas de gérer les erreurs de manière appropriée et de gérer les événements de téléchargement pour fournir des rétroactions à vos utilisateurs sur la progression et le statut du téléchargement.

Pour des informations plus détaillées sur l'API et les options disponibles, consultez le README ou la documentation du paquet.