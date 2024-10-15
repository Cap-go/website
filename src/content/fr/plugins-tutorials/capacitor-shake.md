---
locale: fr
---

chante @capgo/capacitor-shake

Le package `@capgo/capacitor-shake` vous permet de détecter les gestes de secousse sur un appareil. Voici un tutoriel sur la façon d'utiliser ce package dans votre application Capacitor

##Installation

Pour installer le package, exécutez la commande suivante :

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Ajouter l'écouteur

Pour détecter les gestes de secousse, vous devez ajouter un écouteur pour l'événement `shake`. Voici un exemple de la façon de procéder :

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

Dans cet exemple, nous importons le plugin `CapacitorShake` depuis `@capacitor/core` et utilisons la méthode `addListener` pour ajouter un écouteur pour l'événement `shake`. Lorsque le geste de secousse est détecté, la fonction de rappel sera exécutée

## Supprimer l'écouteur

Si vous souhaitez supprimer l'écouteur d'événement `shake`, vous pouvez utiliser la méthode `removeAllListeners` :

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

Dans cet exemple, nous utilisons la méthode `removeAllListeners` pour supprimer tous les écouteurs d'événements `shake`

C'est ça! Vous avez intégré avec succès le package `@capgo/capacitor-shake` dans votre application Capacitor Vous pouvez maintenant détecter les gestes de secousse sur l'appareil