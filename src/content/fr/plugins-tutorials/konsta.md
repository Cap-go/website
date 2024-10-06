---
locale: fr
---

chanter `@capgo/konsta`

Dans ce didacticiel, nous vous expliquerons comment utiliser le package `@capgo/konsta` pour créer des composants d'interface utilisateur mobile au pixel près avec les composants iOS et Material Design pour React, Vue et Svelte. Le package `@capgo/konsta` est construit avec Tailwind CSS et propose une large gamme de composants d'interface utilisateur qui peuvent être facilement intégrés dans vos projets

Suivez les étapes ci-dessous pour commencer :

## Étape 1 : Installer les dépendances

Pour commencer à utiliser le package `@capgo/konsta`, vous devez installer toutes les dépendances requises. Ouvrez votre terminal et accédez au répertoire de votre projet. Ensuite, exécutez la commande suivante :

```shell
$ npm install @capgo/konsta
```

Cette commande installera le package `@capgo/konsta` et ses dépendances dans votre projet

## Étape 2 : Importer et utiliser les composants

Une fois les dépendances installées, vous pouvez importer et utiliser les composants du package `@capgo/konsta` dans votre projet. En fonction du framework de votre choix (React, Vue ou Svelte), suivez les étapes pertinentes ci-dessous :

### Réagir

Pour utiliser les composants `@capgo/konsta` dans un projet React, importez le composant souhaité comme indiqué ci-dessous :

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your React component
const MyComponent = () => {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
};
```

### Vue

Pour utiliser les composants `@capgo/konsta` dans un projet Vue, importez le composant souhaité comme indiqué ci-dessous :

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Vue component
export default {
  components: {
    Button,
  },
  template: `
    <div>
      <Button>Click me</Button>
    </div>
  `,
};
```

### Svelte

Pour utiliser les composants `@capgo/konsta` dans un projet Svelte, importez le composant souhaité comme indiqué ci-dessous :

```javascript
import { Button } from '@capgo/konsta';

// Use the Button component in your Svelte component
let name = 'world';
```

```html
<script>
  import { Button } from '@capgo/konsta';

  // Use the Button component in your Svelte component
  let name = 'world';
</script>

<main>
  <Button>Hello {name}!</Button>
</main>
```

## Étape 3 : Personnalisez et stylisez les composants

Le package `@capgo/konsta` fournit une large gamme de composants d'interface utilisateur qui peuvent être facilement personnalisés et stylisés pour correspondre à la conception de votre projet. Vous pouvez modifier les propriétés des composants, ajouter des classes CSS personnalisées ou appliquer des styles en ligne pour obtenir l'apparence souhaitée. Reportez-vous à la documentation disponible sur [https://konstauicom](https://konstauicom/) pour plus d'informations sur la personnalisation et le style des composants

## Étape 4 : Construire et tester

Après avoir intégré les composants `@capgo/konsta` dans votre projet, vous pouvez construire et tester votre application. Utilisez les commandes de build appropriées à votre projet pour compiler le code et générer la version de production. Reportez-vous au fichier `packagejson` dans votre projet pour connaître les informations disponibles. créer des scripts

## Conclusion

Félicitations! Vous avez appris avec succès comment utiliser le package `@capgo/konsta` pour créer des composants d'interface utilisateur mobile au pixel près dans vos projets React, Vue ou Svelte. Vous pouvez explorer la documentation et expérimenter différents composants et options de personnalisation pour améliorer l'utilisateur de votre application. interface

Pour obtenir de l'aide ou signaler tout problème, veuillez vous référer à la documentation officielle `@capgo/konsta` et à la communauté. Bon codage !