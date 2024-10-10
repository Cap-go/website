---
locale: fr
---

capgo/enregistreur d'écran à condensateur
Un plugin Capacitor pour enregistrer l'écran de l'appareil

##Installation
Pour installer le package, exécutez la commande suivante :
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```
Assurez-vous d'ajouter les autorisations et configurations nécessaires pour que le plugin fonctionne correctement

## Utilisation
Pour commencer à enregistrer l'écran, utilisez la méthode `start()` :
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

Pour arrêter l'enregistrement, utilisez la méthode `stop()` :
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

C'est ça! Vous pouvez désormais enregistrer l'écran de votre appareil à l'aide du plugin Capacitor Screen Recorder
## Android

Ajouter ces autorisations
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## Compatibilité
Ce plugin est compatible avec Capacitor 4 et supérieur

## Contribuer
Les contributions à ce plugin sont grandement appréciées. Si vous rencontrez des problèmes ou avez des suggestions, n'hésitez pas à soumettre une pull request ou à créer un problème sur le référentiel GitHub.

## Licence
Ce package est sous licence MIT