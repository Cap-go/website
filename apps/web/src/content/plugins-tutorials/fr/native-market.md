---
published: true
locale: fr
---

# Tutoriel du package @capgo/native-market

Le package `@capgo/native-market` est un plugin communautaire Capacitor pour le marché natif, vous permettant d'interagir avec le Play Store et l'App Store. Ce tutoriel vous guidera à travers l'installation et l'utilisation de ce package dans votre projet Capacitor.

## Installation

Pour installer le package `@capgo/native-market`, ouvrez votre terminal et exécutez l'une des commandes suivantes, en fonction de votre gestionnaire de paquets :

Avec npm :

```bash
npm install @capgo/native-market
```

Avec yarn :

```bash
yarn add @capgo/native-market
```

Après l'installation, synchronisez les fichiers natifs en exécutant la commande suivante :

```bash
npx cap sync
```

Sur iOS, aucune action supplémentaire n'est requise.

Sur Android, aucune action supplémentaire n'est requise.

## Utilisation

Le package `@capgo/native-market` fournit plusieurs méthodes supportées que vous pouvez utiliser pour interagir avec le marché natif. Voici un exemple de comment utiliser chaque méthode :

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open store listing
NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT',
});

// Open developer page
NativeMarket.openDevPage({
  devId: '5700313618786177705',
});

// Open collection
NativeMarket.openCollection({
  name: 'featured',
});

// Open editor's choice page
NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us',
});

// Perform search
NativeMarket.search({
  terms: 'capacitor',
});
```

Chaque méthode prend différents paramètres d'entrée selon l'action que vous souhaitez effectuer. Assurez-vous de vous référer à la documentation de la méthode pour plus de détails sur les paramètres requis.

C'est tout ! Vous avez maintenant installé et utilisé avec succès le package `@capgo/native-market` dans votre projet Capacitor. N'hésitez pas à explorer plus de fonctionnalités et à le personnaliser selon vos besoins.

***

Félicitations d'avoir complété le tutoriel ! Si vous avez d'autres questions ou avez besoin d'assistance, n'hésitez pas à demander.