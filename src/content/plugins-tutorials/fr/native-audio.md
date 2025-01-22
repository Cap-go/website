---
locale: fr
---

Chanter le paquet @capgo/native-audio

Ce tutoriel vous guidera sur la façon d'utiliser le paquet `@capgo/native-audio` pour lire des sons dans votre application Capacitor.

## Étape 1 : Installation

Pour installer le paquet, ouvrez votre terminal et exécutez la commande suivante :

```bash
npm install @capgo/native-audio
```

ou si vous préférez utiliser yarn :

```bash
yarn add @capgo/native-audio
```

## Étape 2 : Synchroniser les fichiers natifs

Après avoir installé le paquet, synchronisez les fichiers natifs avec la commande suivante :

```bash
npx cap sync
```

## Étape 3 : Configuration

Aucune configuration supplémentaire n'est requise pour ce plugin.

## Étape 4 : Utilisation

Pour utiliser le paquet `@capgo/native-audio`, vous devez importer l'objet `NativeAudio` du paquet et utiliser ses méthodes.

Voici un exemple de la façon de précharger un fichier audio et de le jouer :

```typescript
import { NativeAudio } from '@capgo/native-audio';

// Preload the audio file
NativeAudio.preload({
  assetId: 'fire',
  assetPath: 'assets/sounds/fire.mp3',
  audioChannelNum: 1,
  isUrl: false,
});

// Play the loaded audio file
NativeAudio.play({
  assetId: 'fire',
});
```

La méthode `preload` est utilisée pour charger un fichier audio en mémoire, et la méthode `play` est utilisée pour lire le fichier audio chargé.

D'autres méthodes prises en charge incluent `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration` et `getCurrentTime`. Vous pouvez vous référer à la [documentation officielle](https://githubcom/Cap-go/native-audio/blob/main/READMEmd/) pour plus de détails sur ces méthodes.

C'est tout ! Vous avez maintenant appris à utiliser le paquet `@capgo/native-audio` pour jouer des sons dans votre application Capacitor.