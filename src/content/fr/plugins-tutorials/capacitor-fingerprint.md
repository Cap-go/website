---
locale: fr
---

chantez @capgo/capacitor-fingerprint Package

Le package `@capgo/capacitor-fingerprint` est un client Capacitor pour Fingerprint PRO. Il fournit une identification précise à 100 % de l'appareil pour la détection des fraudes. Dans ce didacticiel, nous aborderons le processus d'installation et comment utiliser l'API du package.

##Installation

Pour installer le package `@capgo/capacitor-fingerprint`, exécutez la commande suivante :

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## Utilisation de l'API

### Charger

Pour charger le plugin `@capgo/capacitor-fingerprint`, utilisez la fonction `load`. Voici un exemple d'utilisation :

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

### Obtenir l'ID du visiteur

Pour obtenir l'identifiant du visiteur, utilisez la fonction `getVisitorId`. Voici un exemple d'utilisation :

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

### Obtenez les données des visiteurs

Pour obtenir les données des visiteurs, utilisez la fonction `getVisitorData`. Voici un exemple d'utilisation :

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

## Conclusion

Dans ce tutoriel, nous avons couvert le processus d'installation du package `@capgo/capacitor-fingerprint` et comment utiliser son API. Vous pouvez désormais intégrer l'identification des appareils et la détection des fraudes dans votre application Capacitor à l'aide du service Fingerprint PRO. Pour plus de détails, reportez-vous à la documentation du package et explorer les fonctionnalités supplémentaires qu'il fournit