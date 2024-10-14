---
locale: fr
---

chantez @capgo/find-package-manager

Le package `@capgo/find-package-manager` est un outil utile pour déterminer quel gestionnaire de packages est utilisé dans un chemin donné. Cela peut être utile lorsque vous travaillez avec des projets qui utilisent différents gestionnaires de packages.

Voici un tutoriel étape par étape sur la façon d'utiliser ce package :

##Installation

Tout d'abord, assurez-vous que Nodejs et npm sont installés sur votre machine. Ensuite, ouvrez votre terminal et exécutez la commande suivante pour installer le package `@capgo/find-package-manager` :

```
npm install @capgo/find-package-manager
```

## Importer le package

Une fois le package installé, vous pouvez l'importer dans votre code en utilisant la ligne suivante :

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'
```

## Rechercher le type de gestionnaire de packages

Pour trouver le type de gestionnaire de packages dans un chemin donné, vous pouvez utiliser la fonction `findPackageManagerType`. Voici un exemple :

```typescript
console.log(findPackageManagerType())
```

La fonction `findPackageManagerType` renvoie une valeur de chaîne indiquant le type de gestionnaire de packages utilisé. Elle peut renvoyer l'une des valeurs suivantes :

- `npm` : si npm est utilisé
- `yarn` : si du fil est utilisé
- `pnpm` : si pnpm est utilisé
- `inconnu` : si le type du gestionnaire de packages ne peut pas être déterminé

## Rassembler tout cela

Voici un exemple complet d'utilisation du package `@capgo/find-package-manager` :

```typescript
import { findPackageManagerType } from '@capgo/find-package-manager'

console.log(findPackageManagerType()) // npm | yarn | pnpm | unknown
```

C'est ça! Vous pouvez maintenant utiliser le package `@capgo/find-package-manager` pour déterminer le type de gestionnaire de packages dans un chemin donné