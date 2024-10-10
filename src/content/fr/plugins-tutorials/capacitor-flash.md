---
locale: fr
---

chanter @capgo/capacitor-flash

Le package `@capgo/capacitor-flash` vous permet d'allumer et d'éteindre la lampe de poche/torche de votre appareil. Dans ce tutoriel, nous vous guiderons tout au long du processus d'installation et d'utilisation de ce package dans votre application Ionic Capacitor.

##Installation

Pour installer le package `@capgo/capacitor-flash`, exécutez la commande suivante dans le répertoire racine de votre projet :

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## Configuration iOS

Le package `@capgo/capacitor-flash` fonctionne immédiatement sur iOS, aucune configuration supplémentaire n'est donc requise

## Configuration Android

Pour Android, vous devez déclarer les autorisations nécessaires dans le fichier `AndroidManifestxml` de votre application. Ajoutez les lignes suivantes à l'intérieur de la balise `<manifest>` :

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

##API

Le package `@capgo/capacitor-flash` fournit les méthodes API suivantes :

### estDisponible()

Cette méthode vérifie si la lampe de poche est disponible sur l'appareil

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### Activation (options)

Cette méthode allume la lampe de poche de l'appareil. Vous pouvez passer des options pour régler l'intensité de la lampe de poche.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOnFlashlight() {
  const options = {
    intensity: 100, // Set the intensity to 100%
  };
  await CapacitorFlash.switchOn(options);
  console.log('Flashlight switched on');
}
```

### switchOff()

Cette méthode éteint la lampe de poche de l'appareil

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### estSwitchedOn()

Cette méthode vérifie si la lampe de poche est actuellement allumée ou éteinte

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### bascule()

Cette méthode fait basculer la lampe de poche, c'est-à-dire que si elle est allumée, elle l'éteindra et vice versa.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

C'est ça! Vous avez appris avec succès comment utiliser le package `@capgo/capacitor-flash` dans votre application Ionic Capacitor pour contrôler la lampe de poche/torche de votre appareil