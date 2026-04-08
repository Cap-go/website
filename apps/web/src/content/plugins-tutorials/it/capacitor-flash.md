---
locale: it
---

cantare @capgo/capacitor-flash Pacchetto

Il pacchetto `@capgo/capacitor-flash` ti consente di accendere e spegnere la torcia del tuo dispositivo In questo tutorial, ti guideremo attraverso il processo di installazione e utilizzo di questo pacchetto nella tua app Ionic Capacitor

## Installazione

Per installare il pacchetto `@capgo/capacitor-flash`, esegui il seguente comando nella directory principale del tuo progetto:

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## Impostazione iOS

Il pacchetto `@capgo/capacitor-flash` funziona subito su iOS, quindi non è richiesta alcuna configurazione aggiuntiva

## Impostazione Android

Per Android, devi dichiarare i permessi necessari nel file `AndroidManifestxml` della tua app Aggiungi le seguenti righe all'interno del tag `<manifest>`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

Il pacchetto `@capgo/capacitor-flash` fornisce i seguenti metodi API:

### isAvailable()

Questo metodo verifica se la torcia è disponibile sul dispositivo

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### switchOn(options)

Questo metodo accende la torcia del dispositivo Puoi passare opzioni per regolare l'intensità della torcia

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

Questo metodo spegne la torcia del dispositivo

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

Questo metodo verifica se la torcia è attualmente accesa o spenta

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### toggle()

Questo metodo attiva/disattiva la torcia, cioè, se è accesa, la spegnerà e viceversa

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

Questo è tutto! Hai appreso con successo come utilizzare il pacchetto `@capgo/capacitor-flash` nella tua app Ionic Capacitor per controllare la torcia del tuo dispositivo