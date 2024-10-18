---
locale: fr
---

capgo/capacitor-screen-recorder  
Un plugin Capacitor pour enregistrer l'écran de l'appareil  

## Installation  
Pour installer le paquet, exécutez la commande suivante :  
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```  
Assurez-vous d'ajouter les autorisations et configurations nécessaires pour que le plugin fonctionne correctement  

## Utilisation  
Pour commencer l'enregistrement de l'écran, utilisez la méthode `start()` :  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```  

Pour arrêter l'enregistrement, utilisez la méthode `stop()` :  
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```  

C'est tout ! Vous pouvez maintenant enregistrer l'écran de votre appareil en utilisant le plugin Capacitor Screen Recorder  
## Android  

Ajoutez ces autorisations  
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```  

## Compatibilité  
Ce plugin est compatible avec Capacitor 4 et supérieur  

## Contribuer  
Les contributions à ce plugin sont grandement appréciées. Si vous rencontrez des problèmes ou avez des suggestions, n'hésitez pas à soumettre une demande de tirage ou à créer un problème sur le dépôt GitHub  

## Licence  
Ce paquet est sous licence MIT