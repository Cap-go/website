---
locale: de
---

Sing @capgo/capacitor-flash Paket

Das `@capgo/capacitor-flash` Paket ermöglicht es Ihnen, das Taschenlampe/Licht Ihres Geräts ein- und auszuschalten. In diesem Tutorial werden wir Sie durch den Prozess der Installation und Verwendung dieses Pakets in Ihrer Ionic Capacitor-App führen.

## Installation

Um das `@capgo/capacitor-flash` Paket zu installieren, führen Sie den folgenden Befehl im Wurzelverzeichnis Ihres Projekts aus:

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## iOS Einrichtung

Das `@capgo/capacitor-flash` Paket funktioniert sofort auf iOS, sodass keine zusätzliche Einrichtung erforderlich ist.

## Android Einrichtung

Für Android müssen Sie die erforderlichen Berechtigungen in der Datei `AndroidManifest.xml` Ihrer App deklarieren. Fügen Sie die folgenden Zeilen innerhalb des `<manifest>` Tags hinzu:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

Das `@capgo/capacitor-flash` Paket bietet die folgenden API-Methoden:

### isAvailable()

Diese Methode prüft, ob die Taschenlampe auf dem Gerät verfügbar ist.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### switchOn(options)

Diese Methode schaltet die Taschenlampe des Geräts ein. Sie können Optionen übergeben, um die Intensität der Taschenlampe anzupassen.

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

Diese Methode schaltet die Taschenlampe des Geräts aus.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

Diese Methode überprüft, ob die Taschenlampe derzeit ein- oder ausgeschaltet ist.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### toggle()

Diese Methode schaltet die Taschenlampe um, d.h. wenn sie eingeschaltet ist, wird sie ausgeschaltet, und umgekehrt.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

Das ist alles! Sie haben erfolgreich gelernt, wie Sie das `@capgo/capacitor-flash` Paket in Ihrer Ionic Capacitor-App verwenden, um die Taschenlampe/Licht Ihres Geräts zu steuern.