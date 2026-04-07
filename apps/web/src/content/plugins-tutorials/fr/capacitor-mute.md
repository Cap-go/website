---
locale: fr
---

Chantez le paquet @capgo/capacitor-mute

Le paquet `@capgo/capacitor-mute` est un plugin Capacitor qui vous permet de détecter si l'interrupteur de sourdine est activé ou désactivé sur un appareil. Il fournit une API simple pour vérifier l'état de sourdine de l'appareil.

## Installation

Vous pouvez installer le paquet `@capgo/capacitor-mute` en utilisant npm :

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## Utilisation

Pour utiliser le paquet `@capgo/capacitor-mute`, vous devez l'importer et appeler la méthode `isMuted()`.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

La méthode `isMuted()` renvoie une promesse qui se résout en une valeur booléenne indiquant si l'appareil est en sourdine ou non. Si la promesse est rejetée, un message d'erreur s'affiche.

## Exemple

Voici un exemple de la façon dont vous pouvez utiliser le paquet `@capgo/capacitor-mute` pour vérifier l'état de sourdine de l'appareil et afficher un message en fonction du résultat.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  if (result) {
    console.log('The device is currently muted');
    // Display a message or perform some actions for muted device
  } else {
    console.log('The device is not muted');
    // Display a message or perform some actions for non-muted device
  }
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

Dans cet exemple, si l'appareil est en sourdine, un message "L'appareil est actuellement en sourdine" est affiché. Si l'appareil n'est pas en sourdine, un message "L'appareil n'est pas en sourdine" est affiché.

## Problèmes possibles

Veuillez noter que sur les appareils iOS avec Xcode 14, la bibliothèque `@capgo/capacitor-mute` peut ne pas être configurée comme prévu par Apple. Ce problème est actuellement en cours de traitement par les développeurs de la bibliothèque. Pour résoudre ce problème, vous pouvez suivre les instructions fournies dans la section [problème connu](https://githubcom/CocoaPods/CocoaPods/issues/8891/) de la documentation du paquet.

## Conclusion

Le paquet `@capgo/capacitor-mute` est un plugin Capacitor utile qui vous permet de détecter l'état de sourdine d'un appareil. En suivant les étapes d'installation et d'utilisation décrites dans ce tutoriel, vous pouvez facilement intégrer ce paquet dans votre projet Capacitor et utiliser son API pour vérifier l'état de sourdine.