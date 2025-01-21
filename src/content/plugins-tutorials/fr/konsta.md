---
locale: fr
---

Utiliser le package `@capgo/konsta`

Dans ce tutoriel, nous vous guiderons sur la façon d'utiliser le package `@capgo/konsta` pour créer des composants d'interface utilisateur mobile pixel-perfect avec des composants iOS et Material Design pour React, Vue et Svelte. Le package `@capgo/konsta` est construit avec Tailwind CSS et offre un large éventail de composants UI qui peuvent être facilement intégrés dans vos projets.

Suivez les étapes ci-dessous pour commencer :

## Étape 1 : Installer les dépendances

Pour commencer à utiliser le package `@capgo/konsta`, vous devez installer toutes les dépendances requises. Ouvrez votre terminal et naviguez jusqu'à votre répertoire de projet. Ensuite, exécutez la commande suivante :

```shell
$ npm install @capgo/konsta
```

Cette commande installera le package `@capgo/konsta` et ses dépendances dans votre projet.

## Étape 2 : Importer et utiliser les composants

Une fois les dépendances installées, vous pouvez importer et utiliser les composants du package `@capgo/konsta` dans votre projet. Selon le framework de votre choix (React, Vue ou Svelte), suivez les étapes pertinentes ci-dessous :

### React

Pour utiliser les composants `@capgo/konsta` dans un projet React, importez le composant souhaité comme indiqué ci-dessous :

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

Pour utiliser les composants `@capgo/konsta` dans un projet Vue, importez le composant souhaité comme indiqué ci-dessous :

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

Pour utiliser les composants `@capgo/konsta` dans un projet Svelte, importez le composant souhaité comme indiqué ci-dessous :

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

## Étape 3 : Personnaliser et styliser les composants

Le package `@capgo/konsta` propose un large éventail de composants UI qui peuvent être facilement personnalisés et stylisés pour correspondre au design de votre projet. Vous pouvez modifier les propriétés des composants, ajouter des classes CSS personnalisées ou appliquer des styles en ligne pour obtenir le look et la sensation désirés. Consultez la documentation disponible sur [https://konstauicom](https://konstauicom/) pour plus d'informations sur la personnalisation et le stylisme des composants.

## Étape 4 : Construire et tester

Après avoir intégré les composants `@capgo/konsta` dans votre projet, vous pouvez construire et tester votre application. Utilisez les commandes de construction pertinentes pour votre projet afin de compiler le code et de générer la version de production. Consultez le fichier `package.json` de votre projet pour les scripts de construction disponibles.

## Conclusion

Félicitations ! Vous avez appris avec succès à utiliser le package `@capgo/konsta` pour créer des composants d'interface utilisateur mobile pixel-perfect dans vos projets React, Vue ou Svelte. Vous pouvez explorer la documentation et expérimenter avec différents composants et options de personnalisation pour améliorer l'interface utilisateur de votre application.

Pour obtenir une assistance supplémentaire ou signaler des problèmes, veuillez vous référer à la documentation officielle du `@capgo/konsta` et à la communauté. Bon codage !