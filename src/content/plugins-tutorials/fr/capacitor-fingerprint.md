---
locale: fr
---

Chantez le paquet @capgo/capacitor-fingerprint

Le paquet `@capgo/capacitor-fingerprint` est un client Capacitor pour Fingerprint PRO. Il fournit une identification de dispositif précise à 100 % pour la détection de fraude. Dans ce tutoriel, nous allons couvrir le processus d'installation et comment utiliser l'API du paquet.

## Installation

Pour installer le paquet `@capgo/capacitor-fingerprint`, exécutez la commande suivante :

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## Utilisation de l'API

### Charger

Pour charger le plugin `@capgo/capacitor-fingerprint`, utilisez la fonction `load`. Voici un exemple de comment l'utiliser :

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

Pour obtenir l'ID du visiteur, utilisez la fonction `getVisitorId`. Voici un exemple de comment l'utiliser :

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

### Obtenir les données du visiteur

Pour obtenir les données du visiteur, utilisez la fonction `getVisitorData`. Voici un exemple de comment l'utiliser :

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

Dans ce tutoriel, nous avons couvert le processus d'installation du paquet `@capgo/capacitor-fingerprint` et comment utiliser son API. Vous pouvez maintenant intégrer l'identification de dispositif et la détection de fraude dans votre application Capacitor en utilisant le service Fingerprint PRO. Pour plus de détails, référez-vous à la documentation du paquet et explorez les fonctionnalités supplémentaires qu'il propose.