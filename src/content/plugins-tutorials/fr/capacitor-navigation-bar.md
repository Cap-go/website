---
locale: fr
---

chant @capgo/capacitor-navigation-bar

## Installation

Pour utiliser le paquet `@capgo/capacitor-navigation-bar`, vous devez d'abord l'installer en exécutant la commande suivante :

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## Définir la couleur de la barre de navigation

Vous pouvez définir la couleur de la barre de navigation pour Android Lollipop et supérieur en utilisant la fonction `setNavigationBarColor`. Voici un exemple de son utilisation :

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

Le paramètre `color` est une chaîne qui représente la couleur de la barre de navigation.

## Obtenir la couleur de la barre de navigation

Vous pouvez également obtenir la couleur actuelle de la barre de navigation en utilisant la fonction `getNavigationBarColor`. Voici un exemple de son utilisation :

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

La variable `color` contiendra la couleur actuelle de la barre de navigation.

Et c'est tout ! Vous savez maintenant comment utiliser le paquet `@capgo/capacitor-navigation-bar` pour définir et obtenir la couleur de la barre de navigation dans votre application Android.