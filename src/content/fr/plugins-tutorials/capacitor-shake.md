---
locale: fr
---

chanter @capgo/capacitor-shake

Le paquet `@capgo/capacitor-shake` vous permet de détecter les gestes de secousse sur un appareil Voici un tutoriel sur la façon d'utiliser ce paquet dans votre application Capacitor

## Installation

Pour installer le paquet, exécutez la commande suivante :

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Ajouter l'écouteur

Pour détecter les gestes de secousse, vous devez ajouter un écouteur pour l'événement `shake` Voici un exemple de comment le faire :

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

Dans cet exemple, nous importons le plugin `CapacitorShake` depuis `@capacitor/core` et utilisons la méthode `addListener` pour ajouter un écouteur pour l'événement `shake` Lorsque le geste de secousse est détecté, la fonction de rappel sera exécutée

## Supprimer l'écouteur

Si vous souhaitez supprimer l'écouteur d'événements `shake`, vous pouvez utiliser la méthode `removeAllListeners` :

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

Dans cet exemple, nous utilisons la méthode `removeAllListeners` pour supprimer tous les écouteurs d'événements `shake`

Voilà ! Vous avez intégré avec succès le paquet `@capgo/capacitor-shake` dans votre application Capacitor Vous pouvez maintenant détecter les gestes de secousse sur l'appareil