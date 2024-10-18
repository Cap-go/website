---
locale: fr
---

Chantez le package `@capgo/capacitor-flash`

Le package `@capgo/capacitor-flash` vous permet d'allumer et d'éteindre la lampe de poche de votre appareil. Dans ce tutoriel, nous vous guiderons à travers le processus d'installation et d'utilisation de ce package dans votre application Ionic Capacitor.

## Installation

Pour installer le package `@capgo/capacitor-flash`, exécutez la commande suivante dans le répertoire racine de votre projet :

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## Configuration iOS

Le package `@capgo/capacitor-flash` fonctionne immédiatement sur iOS, donc aucune configuration supplémentaire n'est requise.

## Configuration Android

Pour Android, vous devez déclarer les autorisations nécessaires dans le fichier `AndroidManifest.xml` de votre application. Ajoutez les lignes suivantes à l'intérieur de la balise `<manifest>` :

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

Le package `@capgo/capacitor-flash` fournit les méthodes API suivantes :

### isAvailable()

Cette méthode vérifie si la lampe de poche est disponible sur l'appareil.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### switchOn(options)

Cette méthode allume la lampe de poche de l'appareil. Vous pouvez passer des options pour ajuster l'intensité de la lampe de poche.

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

Cette méthode éteint la lampe de poche de l'appareil.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

Cette méthode vérifie si la lampe de poche est actuellement allumée ou éteinte.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### toggle()

Cette méthode bascule la lampe de poche, c'est-à-dire que si elle est allumée, elle s'éteindra, et vice versa.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

C'est tout ! Vous avez réussi à apprendre comment utiliser le package `@capgo/capacitor-flash` dans votre application Ionic Capacitor pour contrôler la lampe de poche de votre appareil.