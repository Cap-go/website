---
locale: fr
---

Tutoriel du package capgo/camera-preview

Dans ce tutoriel, nous allons passer en revue les étapes pour utiliser le package `@capgo/camera-preview` dans votre projet Capacitor. Ce package vous permet d'interagir avec la caméra depuis votre code JavaScript et HTML.

## Installation

Pour installer le package `@capgo/camera-preview`, ouvrez votre terminal et exécutez l'une des commandes suivantes :

```bash
yarn add @capgo/camera-preview
```

ou

```bash
npm install @capgo/camera-preview
```

Une fois l'installation terminée, exécutez la commande suivante pour synchroniser votre projet Capacitor :

```bash
npx cap sync
```

### Étapes d'installation supplémentaires pour Android

Si vous utilisez Android, vous devez effectuer quelques modifications supplémentaires dans votre projet. Ouvrez le fichier `android/app/src/main/AndroidManifest.xml` et ajoutez la ligne suivante au-dessus de la balise `</application>` de fermeture pour demander la permission CAMERA :

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Pour plus d'aide, consultez la [documentation de Capacitor](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifestxml/).

### Étapes d'installation supplémentaires pour iOS

Si vous utilisez iOS, vous devez ajouter deux permissions à votre fichier `Info.plist`. Suivez la [documentation de Capacitor](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist) et ajoutez les permissions `NSCameraUsageDescription` et `NSMicrophoneUsageDescription`. La permission `NSMicrophoneUsageDescription` n'est requise que si vous allez utiliser l'audio. Si vous n'avez pas besoin d'audio, vous pouvez définir l'option `disableAudio` sur `true` pour désactiver la demande de permission du microphone.

### Étapes d'installation supplémentaires pour le Web

Si vous utilisez la plateforme web avec Ionic, ajoutez la ligne suivante à votre script d'entrée dans `app.module.ts` :

```typescript
import '@capgo/camera-preview';
```

Cela permettra à Capacitor d'enregistrer la plateforme web à partir du plugin.

## API

Le package `@capgo/camera-preview` fournit les méthodes API suivantes :

### start(options: CameraPreviewOptions)

Démarre l'instance d'aperçu de caméra.

### stop()

Arrête l'instance d'aperçu de caméra.

### capture(options: CameraPreviewPictureOptions)

Capture une image de la caméra.

### captureSample(options: CameraSampleOptions)

Capture une image d'échantillon.

### getSupportedFlashModes()

Obtient les modes de flash pris en charge.

### getHorizontalFov()

Obtient le champ de vision horizontal.

### setFlashMode(options: { flashMode: CameraPreviewFlashMode | string; })

Définit le mode de flash.

### flip()

Inverse la caméra.

### setOpacity(options: CameraOpacityOptions)

Définit l'opacité de la caméra.

### stopRecordVideo()

Arrête l'enregistrement d'une vidéo.

### startRecordVideo(options: CameraPreviewOptions)

Commence l'enregistrement d'une vidéo.

Pour plus de détails sur les paramètres et les valeurs de retour de ces méthodes, consultez la documentation du package `@capgo/camera-preview`.

## Conclusion

Dans ce tutoriel, nous avons appris comment installer et utiliser le package `@capgo/camera-preview` dans un projet Capacitor. Nous avons exploré les méthodes API disponibles et leur utilisation. Vous pouvez maintenant intégrer la fonctionnalité de caméra dans votre application en utilisant ce package.