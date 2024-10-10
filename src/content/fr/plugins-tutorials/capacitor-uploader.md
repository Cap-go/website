---
locale: fr
---

Tutoriel capgo/capacitor-uploader

Ce didacticiel vous guidera tout au long du processus d'utilisation du package `@capgo/capacitor-uploader` pour télécharger des fichiers de manière native dans votre application Ionic Capacitor.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés :

- Nodejs
- npm
- Projet de condensateur ionique

##Installation

1 Ouvrez votre terminal ou votre invite de commande et accédez au répertoire de votre projet

2 Exécutez la commande suivante pour installer le package :

```bash
npm install @capgo/capacitor-uploader
```

3 Après l'installation, synchronisez votre projet Capacitor :

```bash
npx cap sync
```

##Configuration

###Configuration Android

Pour Android, vous devez ajouter des autorisations à votre fichier `AndroidManifestxml`. Ouvrez le fichier situé dans `android/app/src/main/AndroidManifestxml` et ajoutez les autorisations suivantes dans la balise `<manifest>` :

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

## Utilisation

Maintenant que nous avons installé et configuré le package, voyons comment l'utiliser dans votre application

### Importation du téléchargeur

Tout d’abord, importez le Uploader dans votre fichier TypeScript :

```typescript
import { Uploader } from '@capgo/capacitor-uploader';
```

### Téléchargement sur S3

Voici un exemple de la façon de télécharger un fichier sur S3 à l'aide d'une URL prédéfinie :

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

### Téléchargement sur un serveur personnalisé

Voici un exemple de la façon de télécharger un fichier sur un serveur personnalisé :

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

### Utilisation avec l'aperçu de la caméra à condensateur

Si vous utilisez le plugin Capacitor Camera Preview, vous pouvez le combiner avec Uploader pour capturer et télécharger des vidéos. Voici un exemple :

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

Vous avez maintenant appris à utiliser le package `@capgo/capacitor-uploader` pour télécharger des fichiers de manière native dans votre application Ionic Capacitor. Ce plugin offre un moyen flexible de télécharger des fichiers sur divers serveurs, y compris S3 avec des URL présignées, et peut être utilisé en combinaison avec d'autres plugins comme Capacitor Camera Preview

N'oubliez pas de gérer les erreurs de manière appropriée et de gérer les événements de téléchargement pour fournir des commentaires à vos utilisateurs sur la progression et l'état du téléchargement.

Pour des informations plus détaillées sur l'API et les options disponibles, reportez-vous au README ou à la documentation du package.