---
locale: de
---

sing @capgo/capacitor-fingerprint Paket

Das `@capgo/capacitor-fingerprint` Paket ist ein Capacitor-Client für Fingerprint PRO. Es bietet eine 100% genaue Geräteidentifikation zur Betrugserkennung. In diesem Tutorial werden wir den Installationsprozess und die Nutzung der API des Pakets behandeln.

## Installation

Um das `@capgo/capacitor-fingerprint` Paket zu installieren, führen Sie den folgenden Befehl aus:

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## API Nutzung

### Laden

Um das `@capgo/capacitor-fingerprint` Plugin zu laden, verwenden Sie die Funktion `load`. Hier ist ein Beispiel, wie man es benutzt:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function loadFingerprintPlugin() {
  try {
    await CapacitorFingerprint.load({
      // options
    });
    console.log('Fingerprint plugin loaded successfully');
  } catch (error) {
    console.error('Failed to load Fingerprint plugin:', error);
  }
}

loadFingerprintPlugin();
```

### Besucher-ID abrufen

Um die Besucher-ID abzurufen, verwenden Sie die Funktion `getVisitorId`. Hier ist ein Beispiel, wie man es benutzt:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorId() {
  try {
    const result = await CapacitorFingerprint.getVisitorId();
    const visitorId = result.visitorId;
    console.log('Visitor ID:', visitorId);
  } catch (error) {
    console.error('Failed to get Visitor ID:', error);
  }
}

getVisitorId();
```

### Besucherdaten abrufen

Um die Besucherdaten abzurufen, verwenden Sie die Funktion `getVisitorData`. Hier ist ein Beispiel, wie man es nutzt:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorData() {
  try {
    const result = await CapacitorFingerprint.getVisitorData();
    const visitorData = result.visitorData;
    console.log('Visitor Data:', visitorData);
  } catch (error) {
    console.error('Failed to get Visitor Data:', error);
  }
}

getVisitorData();
```

## Fazit

In diesem Tutorial haben wir den Installationsprozess des `@capgo/capacitor-fingerprint` Pakets und die Nutzung seiner API behandelt. Sie können jetzt die Geräteidentifikation und Betrugserkennung in Ihre Capacitor-App mit dem Fingerprint PRO-Dienst integrieren. Für weitere Details verweisen Sie auf die Dokumentation des Pakets und erkunden Sie die zusätzlichen Funktionen, die es bietet.