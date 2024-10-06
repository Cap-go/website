---
published: true
locale: fr
---

# Tutoriel sur les packages @capgo/native-market

Le package `@capgo/native-market` est un plugin communautaire Capacitor pour le marché natif, vous permettant d'interagir avec le Play Store et l'App Store. Ce tutoriel vous guidera dans l'installation et l'utilisation de ce package dans votre projet Capacitor

##Installation

Pour installer le package `@capgo/native-market`, ouvrez votre terminal et exécutez l'une des commandes suivantes, en fonction de votre gestionnaire de packages :

Utilisation de npm :

```bash
npm install @capgo/native-market
```

Utiliser du fil :

```bash
yarn add @capgo/native-market
```

Après l'installation, synchronisez les fichiers natifs en exécutant la commande suivante :

```bash
npx cap sync
```

Sur iOS, aucune autre action n'est requise

Sur Android, aucune autre action n'est requise

## Utilisation

Le package `@capgo/native-market` fournit plusieurs méthodes prises en charge que vous pouvez utiliser pour interagir avec le marché natif. Voici un exemple d'utilisation de chaque méthode :

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

Chaque méthode prend des paramètres d'entrée différents en fonction de l'action que vous souhaitez effectuer. Assurez-vous de vous référer à la documentation de la méthode pour plus de détails sur les paramètres requis

C'est ça! Vous avez maintenant installé et utilisé avec succès le package `@capgo/native-market` dans votre projet Capacitor. N'hésitez pas à explorer davantage ses fonctionnalités et à le personnaliser en fonction de vos besoins.

***

Félicitations, vous avez terminé le didacticiel ! Si vous avez d'autres questions ou avez besoin d'aide, n'hésitez pas à demander