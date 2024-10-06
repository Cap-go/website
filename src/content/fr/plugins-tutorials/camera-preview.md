---
locale: fr
---

Tutoriel sur le package capgo/camera-preview

Dans ce tutoriel, nous allons parcourir les étapes pour utiliser le package `@capgo/camera-preview` dans votre projet Capacitor. Ce package vous permet d'interagir avec la caméra à partir de votre code JavaScript et HTML.

##Installation

Pour installer le package `@capgo/camera-preview`, ouvrez votre terminal et exécutez l'une des commandes suivantes :

```bash
yarn add @capgo/camera-preview
```

ou

```bash
npm install @capgo/camera-preview
```

Une fois l'installation terminée, exécutez la commande suivante pour synchroniser votre projet Capacitor :

```bash
npx cap sync
```

### Étapes d'installation supplémentaires d'Android

Si vous utilisez Android, vous devez apporter quelques modifications supplémentaires à votre projet. Ouvrez le fichier `android/app/src/main/AndroidManifestxml` et ajoutez la ligne suivante au-dessus de la balise de fermeture `</application>` pour demander la CAMÉRA. autorisation:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

Pour plus d'aide, reportez-vous à la [documentation sur les condensateurs](https://capacitorjscom/docs/android/configuration/#configuring-androidmanifestxml/)

### Étapes d'installation iOS supplémentaires

Si vous utilisez iOS, vous devez ajouter deux autorisations à votre fichier `Infoplist`. Suivez la [documentation Capacitor](https://capacitorjscom/docs/ios/configuration/#configuring-infoplist) et ajoutez `NSCameraUsageDescription` et ` Autorisations NSMicrophoneUsageDescription` L'autorisation `NSMicrophoneUsageDescription` n'est requise que si vous utilisez l'audio. Si vous n'avez pas besoin d'audio, vous pouvez définir l'option `disableAudio` sur `true` pour désactiver la demande d'autorisation du microphone.

### Étapes d'installation Web supplémentaires

Si vous utilisez la plateforme web avec Ionic, ajoutez la ligne suivante à votre script d'entrée dans `appmodulets` :

```typescript
import '@capgo/camera-preview';
```

Cela permettra à Capacitor d'enregistrer la plateforme Web à partir du plugin

##API

Le package `@capgo/camera-preview` fournit les méthodes API suivantes :

### début (options : CameraPreviewOptions)

Démarre l'instance d'aperçu de la caméra

### arrêt()

Arrête l'instance d'aperçu de la caméra

### capture (options : CameraPreviewPictureOptions)

Capture une image de l'appareil photo

### captureSample (options : CameraSampleOptions)

Capture un exemple d’image

###getSupportedFlashModes()

Obtient les modes flash pris en charge

###getHorizontalFov()

Obtient le champ de vision horizontal

### setFlashMode(options : { flashMode : CameraPreviewFlashMode | string; })

Règle le mode flash

### retourner()

Retourne la caméra

### setOpacity(options : CameraOpacityOptions)

Définit l'opacité de la caméra

### stopRecordVideo()

Arrête d'enregistrer une vidéo

### startRecordVideo (options : CameraPreviewOptions)

Commence à enregistrer une vidéo

Pour plus de détails sur les paramètres et les valeurs de retour de ces méthodes, reportez-vous à la documentation du package `@capgo/camera-preview`

## Conclusion

Dans ce didacticiel, nous avons appris à installer et à utiliser le package `@capgo/camera-preview` dans un projet Capacitor. Nous avons exploré les méthodes API disponibles et leur utilisation. Vous pouvez désormais intégrer la fonctionnalité de caméra dans votre application à l'aide de ce package.